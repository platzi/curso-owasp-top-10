CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL
);

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  bio VARCHAR(500),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,  
  email VARCHAR(50) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  website VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  course_name VARCHAR(300) NOT NULL UNIQUE,
  course_description VARCHAR(500) NOT NULL,
  course_code VARCHAR(10) NOT NULL,
  author_id INT
);

CREATE TABLE user_courses (
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (course_id) REFERENCES courses (id)
);

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  description VARCHAR(500),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE user_payments (
  user_id INT NOT NULL,
  payment_id INT NOT NULL,
  PRIMARY KEY (user_id, payment_id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (payment_id) REFERENCES payments (id)
);

INSERT INTO roles (role_name) VALUES ('admin');
INSERT INTO roles (role_name) VALUES ('user');

INSERT INTO users (username, password) VALUES ('admin', 'jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg='); -- admin
INSERT INTO users (username, password) VALUES ('user1', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='); -- 1234
INSERT INTO users (username, password) VALUES ('user2', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='); -- 1234
INSERT INTO users (username, password) VALUES ('user3', 'A6xnQhbz4Vx2HuGl4lXwZ5U2I8iziLRFnhP5eNfIRvQ='); -- 1234

INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO user_roles (user_id, role_id) VALUES (2, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (3, 2);
INSERT INTO user_roles (user_id, role_id) VALUES (4, 2);

INSERT INTO profiles (user_id, bio, first_name, last_name, email, phone, website) VALUES (1, 'About me', 'Admin', 'Admin', 'admin@localbox.com', '1234567890', '');
INSERT INTO profiles (user_id, bio, first_name, last_name, email, phone, website) VALUES (2, 'About me', 'User', 'One', 'user1@localbox.com', '1234567891', '');
INSERT INTO profiles (user_id, bio, first_name, last_name, email, phone, website) VALUES (3, 'About me', 'User', 'Two', 'user2@localbox.com', '1234567892', '');
INSERT INTO profiles (user_id, bio, first_name, last_name, email, phone, website) VALUES (4, 'About me', 'User', 'Three', 'user3@localbox.com', '1234567893', '');

INSERT INTO courses (course_name, course_description, course_code, author_id) VALUES ('Python Fundamentals', 'Python Fundamentals', 'PYF-001', 1);
INSERT INTO courses (course_name, course_description, course_code, author_id) VALUES ('Java Fundamentals', 'Java Fundamentals', 'JAF-001', 2);
INSERT INTO courses (course_name, course_description, course_code, author_id) VALUES ('C Fundamentals', 'C Fundamentals', 'CF-001', 3);

INSERT INTO user_courses (user_id, course_id) VALUES (2, 1);
INSERT INTO user_courses (user_id, course_id) VALUES (2, 2);
INSERT INTO user_courses (user_id, course_id) VALUES (2, 3);
INSERT INTO user_courses (user_id, course_id) VALUES (3, 2);
INSERT INTO user_courses (user_id, course_id) VALUES (4, 3);

INSERT INTO payments (user_id, amount, description, date) VALUES (2, 10.00, 'Python Fundamentals', '2021-01-01');
INSERT INTO payments (user_id, amount, description, date) VALUES (2, 20.00, 'Java Fundamentals', '2021-01-02');

INSERT INTO user_payments (user_id, payment_id) VALUES (2, 1);
INSERT INTO user_payments (user_id, payment_id) VALUES (2, 2);

-- Get users list including user role, payment, and courses data

-- Queries for testing the database
-- SELECT * FROM roles;
-- SELECT * FROM users;
-- SELECT * FROM user_roles;
-- SELECT * FROM profiles;
-- SELECT * FROM courses;
-- SELECT * FROM user_courses;
-- SELECT * FROM payments;
-- SELECT * FROM user_payments;

-- Query for getting the user and role data
-- SELECT users.username, roles.role_name FROM users
-- JOIN user_roles ON users.id = user_roles.user_id
-- JOIN roles ON user_roles.role_id = roles.id;

-- Query for getting the user and course data
-- SELECT users.username, courses.course_name FROM users
-- JOIN user_courses ON users.id = user_courses.user_id
-- JOIN courses ON user_courses.course_id = courses.id;

-- Query for getting the user and payment data
-- SELECT users.username, payments.amount FROM users
-- JOIN user_payments ON users.id = user_payments.user_id
-- JOIN payments ON user_payments.payment_id = payments.id;

-- Query for getting the profile data
-- SELECT users.username, profiles.first_name, profiles.last_name, profiles.email, profiles.phone FROM users
-- JOIN profiles ON users.id = profiles.user_id;

-- Query for getting the user, role, course, and payment data
-- SELECT users.username, roles.role_name, courses.course_name, payments.amount FROM users
-- JOIN user_roles ON users.id = user_roles.user_id
-- JOIN roles ON user_roles.role_id = roles.id
-- JOIN user_courses ON users.id = user_courses.user_id
-- JOIN courses ON user_courses.course_id = courses.id
-- JOIN user_payments ON users.id = user_payments.user_id
-- JOIN payments ON user_payments.payment_id = payments.id
-- JOIN profiles ON users.id = profiles.user_id;

-- Query for inserting a new user
-- INSERT INTO users (username, password) VALUES ('user1', 'user1');

-- Query for inserting a new profile
-- INSERT INTO profiles (user_id, first_name, last_name, email, phone) VALUES (3, 'User', 'User', '[email protected]', '1234567890');

-- Query for inserting a new role
-- INSERT INTO roles (role_name) VALUES ('user');

-- Query for inserting a new user role
-- INSERT INTO user_roles (user_id, role_id) VALUES (3, 2);

-- Query for inserting a new course
-- INSERT INTO courses (course_name) VALUES ('Course 4');

-- Query for inserting a new user course
-- INSERT INTO user_courses (user_id, course_id) VALUES (3, 4);

-- Query for inserting a new payment
-- INSERT INTO payments (user_id, amount) VALUES (3, 300.00);

-- Query for inserting a new user payment
-- INSERT INTO user_payments (user_id, payment_id) VALUES (3, 3);

-- Query for create and relate a new payment to an existing user at the same time
-- INSERT INTO payments (user_id, amount) VALUES ((SELECT id FROM users WHERE username = 'user1'), 300.00);

-- Query for updating a user
-- UPDATE users SET username = 'user2' WHERE id = 3;

-- Query for updating a profile
-- UPDATE profiles SET first_name = 'User2' WHERE user_id = 3;

-- Query for updating a role
-- UPDATE roles SET role_name = 'admin' WHERE id = 3;

-- Query for updating a course
-- UPDATE courses SET course_name = 'Course 5' WHERE id = 4;

-- Query for updating a payment
-- UPDATE payments SET amount = 400.00 WHERE id = 3;

-- Query for deleting a user
-- DELETE FROM users WHERE id = 3;

-- Query for deleting a profile
-- DELETE FROM profiles WHERE user_id = 3;

-- Query for deleting a role
-- DELETE FROM roles WHERE id = 3;

-- Query for deleting a course
-- DELETE FROM courses WHERE id = 4;

-- Query for deleting a payment
-- DELETE FROM payments WHERE id = 3;

-- Query for deleting a user role
-- DELETE FROM user_roles WHERE user_id = 3;

-- Query for deleting a user course
-- DELETE FROM user_courses WHERE user_id = 3;

-- Query for deleting a user payment
-- DELETE FROM user_payments WHERE user_id = 3;
