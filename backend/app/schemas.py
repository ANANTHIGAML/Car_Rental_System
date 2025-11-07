from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class CarBase(BaseModel):
    make: str
    model: str
    year: int
    daily_rate: float = Field(gt=0)

class CarCreate(CarBase):
    pass

class Car(CarBase):
    id: int
    available: bool

    model_config = {
        "from_attributes": True
    }

class RentalBase(BaseModel):
    car_id: int
    user_name: str
    start_date: datetime
    end_date: datetime

class RentalCreate(RentalBase):
    pass

class Rental(RentalBase):
    id: int
    rental_date: datetime
    car: Car

    model_config = {
        "from_attributes": True
    }

class CarWithRentals(Car):
    rentals: List[Rental]

    model_config = {
        "from_attributes": True
    }
