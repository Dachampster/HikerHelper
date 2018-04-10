INSERT INTO users (email, displayName, password, createdAt, updatedAt)
VALUES ("pickles@cucumber.com", "Pickles", "$2a$10$E7fd0nlbwxw/KO.fh.yZ1u/aU7E9qBqingZfVIXF5lpRutbeJgHR.", NOW(), NOW()), ("doggy@kitty.com", "Doggy", "$2a$10$E7fd0nlbwxw/KO.fh.yZ1u/aU7E9qBqingZfVIXF5lpRutbeJgHR.", NOW(), NOW()), ("noodle@chowmein.com", "Noodles", "$2a$10$E7fd0nlbwxw/KO.fh.yZ1u/aU7E9qBqingZfVIXF5lpRutbeJgHR.", NOW(), NOW());

INSERT INTO searchparams (latitude, longitude, maxDistance, minLength, UserId, createdAt, updatedAt)
VALUES (35.595058, -82.551487, 25, 3, 1, NOW(), NOW()), (39.191098, -106.817539, 20, 2, 1, NOW(), NOW()), (63.069169, -151.006984, 10, 5, 2, NOW(), NOW());

INSERT INTO activities (name, activityNum, difficulty, length, rating, SearchParamId, createdAt, updatedAt)
VALUES ("Pinacle Park Tour", 7044843, "dblack", 12.1, 5, 1, NOW(), NOW()), ("Mysterious Cabin Loop", 7044844, "blue", 9.1, 5, 1, NOW(), NOW()), ("High Line Loop", 7044845, "blueBlack", 13.7, 5, 1, NOW(), NOW());