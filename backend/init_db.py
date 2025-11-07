from app.database import Base, engine, SessionLocal
from app.models import Car, Rental

# Create tables using SQLAlchemy models
Base.metadata.create_all(bind=engine)

# Create a new session
db = SessionLocal()

# Sample car data
sample_cars = [
    Car(make="Toyota", model="Camry", year=2023, daily_rate=50.00, available=True),
    Car(make="Honda", model="Civic", year=2023, daily_rate=45.00, available=True),
    Car(make="Ford", model="Mustang", year=2023, daily_rate=75.00, available=True),
    Car(make="Tesla", model="Model 3", year=2023, daily_rate=90.00, available=True),
    Car(make="BMW", model="3 Series", year=2023, daily_rate=85.00, available=True)
]

# Add cars to database
try:
    for car in sample_cars:
        db.add(car)
    db.commit()
    print("Database initialized with sample cars!")
except Exception as e:
    print(f"Error initializing database: {e}")
    db.rollback()
finally:
    db.close()
