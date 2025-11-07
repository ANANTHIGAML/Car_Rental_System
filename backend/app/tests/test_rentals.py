import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_car_and_rent_and_block_overlapping():
    # create a car
    car_resp = client.post('/cars/', json={
        'make': 'Test', 'model': 'X', 'year': 2025, 'daily_rate': 10.0
    })
    assert car_resp.status_code == 200
    car = car_resp.json()

    # rent the car for a period
    rent_resp = client.post(f"/cars/{car['id']}/rent", json={
        'car_id': car['id'], 'user_name': 'Alice', 'start_date': '2025-11-20T10:00:00', 'end_date': '2025-11-22T10:00:00'
    })
    assert rent_resp.status_code == 200
    rental = rent_resp.json()

    # overlapping rent should fail
    overlap = client.post(f"/cars/{car['id']}/rent", json={
        'car_id': car['id'], 'user_name': 'Bob', 'start_date': '2025-11-21T09:00:00', 'end_date': '2025-11-23T09:00:00'
    })
    assert overlap.status_code == 400

    # cancel the rental
    cancel = client.delete(f"/rentals/{rental['id']}")
    assert cancel.status_code == 200

    # after cancellation, renting same dates should succeed
    rent2 = client.post(f"/cars/{car['id']}/rent", json={
        'car_id': car['id'], 'user_name': 'Charlie', 'start_date': '2025-11-21T09:00:00', 'end_date': '2025-11-23T09:00:00'
    })
    assert rent2.status_code == 200
