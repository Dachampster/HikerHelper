INSERT INTO users (email, displayName, password)
VALUES ("test1@test.com", "Test1", "password1"), ("test2@test.com", "Test2", "password2"), ("test3@test.com", "Test3", "password3");

INSERT INTO searchparams (latitude, longitude, maxDistance, minLength, UserId)
VALUES (35.595058, -82.551487, 25, 3, 1), (39.191098, -106.817539, 20, 2, 1), (63.069169, -151.006984, 10, 5, 2);

INSERT INTO activities (name, activityNum, difficulty, length, rating, SearchParamId)
VALUES ("Pinacle Park Tour", 7044843, "Extremely Difficult", 12.1, 5, 1), ("Mysterious Cabin Loop", 7044844, "Intermediate", 9.1, 5, 1), ("High Line Loop", 7044845, "Intermediate/Difficult", 13.7, 5, 1);