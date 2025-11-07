from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal, Base
from typing import List

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Car Rental System API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    # Allow local dev frontend ports (Vite may pick 5173, 5174, 5175 etc.)
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Welcome to the Car Rental System API!"}

@app.post("/cars/", response_model=schemas.Car)
def create_car(car: schemas.CarCreate, db: Session = Depends(get_db)):
    return crud.create_car(db, car)

@app.get("/cars/", response_model=List[schemas.Car])
def get_cars(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_cars(db, skip=skip, limit=limit)

@app.get("/cars/{car_id}", response_model=schemas.CarWithRentals)
def get_car(car_id: int, db: Session = Depends(get_db)):
    db_car = crud.get_car(db, car_id)
    if db_car is None:
        raise HTTPException(status_code=404, detail="Car not found")
    return db_car

@app.post("/cars/{car_id}/rent", response_model=schemas.Rental)
def rent_car(car_id: int, rental: schemas.RentalCreate, db: Session = Depends(get_db)):
    return crud.create_rental(db, rental)

@app.delete("/rentals/{rental_id}")
def cancel_rental(rental_id: int, db: Session = Depends(get_db)):
    return crud.cancel_rental(db, rental_id)
