from sqlalchemy.orm import Session
from datetime import datetime
from . import models, schemas
from fastapi import HTTPException

def get_car(db: Session, car_id: int):
    return db.query(models.Car).filter(models.Car.id == car_id).first()

def get_cars(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Car).offset(skip).limit(limit).all()

def create_car(db: Session, car: schemas.CarCreate):
    db_car = models.Car(**car.model_dump())
    db.add(db_car)
    db.commit()
    db.refresh(db_car)
    return db_car

def get_rental(db: Session, rental_id: int):
    return db.query(models.Rental).filter(models.Rental.id == rental_id).first()

def check_car_availability(db: Session, car_id: int, start_date: datetime, end_date: datetime):
    # Check if car exists
    car = get_car(db, car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    
    # Check if dates are valid
    if start_date >= end_date:
        raise HTTPException(status_code=400, detail="End date must be after start date")
    
    # Check for overlapping rentals
    overlapping = db.query(models.Rental).filter(
        models.Rental.car_id == car_id,
        models.Rental.end_date > start_date,
        models.Rental.start_date < end_date
    ).first()
    
    if overlapping:
        raise HTTPException(
            status_code=400,
            detail="Car is not available for these dates"
        )
    
    return car

def create_rental(db: Session, rental: schemas.RentalCreate):
    # Validate car availability
    car = check_car_availability(db, rental.car_id, rental.start_date, rental.end_date)
    
    # Create rental
    db_rental = models.Rental(**rental.model_dump())
    db.add(db_rental)
    
    # Update car availability
    car.available = False
    
    db.commit()
    db.refresh(db_rental)
    return db_rental

def cancel_rental(db: Session, rental_id: int):
    rental = get_rental(db, rental_id)
    if not rental:
        raise HTTPException(status_code=404, detail="Rental not found")
    
    # Check if rental is in the future or ongoing
    now = datetime.utcnow()
    if rental.end_date < now:
        raise HTTPException(status_code=400, detail="Cannot cancel completed rentals")
    
    # Update car availability if rental was current or future
    car = rental.car
    if not any(r.id != rental_id and r.end_date > now for r in car.rentals):
        car.available = True
    
    # Delete the rental
    db.delete(rental)
    db.commit()
    return {"message": "Rental cancelled successfully"}
