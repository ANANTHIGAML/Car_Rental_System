-- Sample cars
INSERT INTO cars (make, model, year, daily_rate, available) VALUES
('Toyota', 'Camry', 2023, 50.00, 1),
('Honda', 'Civic', 2023, 45.00, 1),
('Ford', 'Mustang', 2023, 75.00, 1),
('Tesla', 'Model 3', 2023, 90.00, 1),
('BMW', '3 Series', 2023, 85.00, 1);

-- Sample rentals (commented out - uncomment to add sample rentals)
/*
INSERT INTO rentals (car_id, user_name, start_date, end_date) VALUES
(1, 'John Doe', '2025-11-10 10:00:00', '2025-11-15 10:00:00'),
(2, 'Jane Smith', '2025-11-12 14:00:00', '2025-11-14 14:00:00');
*/
