INSERT INTO users(id, birthdate, description, full_name, password, role, username)
VALUES
    (-1, '1992-12-12', '', 'Ted Tod', '$2a$10$arEsCEapqLiMznmtaez7rOyUT.mRcNIZg4r5kYQ2Yerqicf5cIVfe', 'MENTOR', 'tedtod@test.com'),
    (-2, '1993-02-14', '', 'Freddy Jameson', '$2a$10$arEsCEapqLiMznmtaez7rOyUT.mRcNIZg4r5kYQ2Yerqicf5cIVfe', 'STUDENT', 'fjameson@test.com'),
    (-3, '1993-02-14', '', 'Emma Williams', '$2a$10$arEsCEapqLiMznmtaez7rOyUT.mRcNIZg4r5kYQ2Yerqicf5cIVfe', 'STUDENT', 'ewilliams@test.com'),
    (-4, '1993-02-14', '', 'Michael Brown', '$2a$10$arEsCEapqLiMznmtaez7rOyUT.mRcNIZg4r5kYQ2Yerqicf5cIVfe', 'STUDENT', 'mbrown@test.com'),
    (-5, '1993-02-14', '', 'Olivia Jones', '$2a$10$arEsCEapqLiMznmtaez7rOyUT.mRcNIZg4r5kYQ2Yerqicf5cIVfe', 'STUDENT', 'ojones@test.com');

--  All the passwords are "test123"
--  Move this file to /src/main/resources if you want to use it to initialize your database

INSERT INTO study(id, name)
VALUES
    (-3, 'UBB Litere'),
    (-2, 'Liceu Bio-Chimie'),
    (-1, 'UBB Mate-Info');

INSERT INTO interest_area(id, name)
VALUES
    (-3, 'Informatica'),
    (-2, 'Matematica'),
    (-1, 'Chimie');

INSERT INTO appointments(id, date, location_details, mentor_id, student_id)
VALUES
    (-1, '2023-01-15 19:00:00.000000', 'zoom meet', -1, -2),
    (-2, '2023-01-15 19:00:00.000000', 'zoom meet', -1, -3),
    (-3, '2023-01-15 19:00:00.000000', 'zoom meet', -1, -4);