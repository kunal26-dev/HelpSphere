CREATE DATABASE IF NOT EXISTS helpsphere;

USE helpsphere;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role ENUM('official', 'member') NOT NULL,
  department VARCHAR(100),
  designation VARCHAR(100),
  phone VARCHAR(20),
  address VARCHAR(255),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (
  name,
  email,
  password,
  role,
  department,
  designation,
  phone,
  address
) VALUES
  (
    'Ram Niwas',
    'official@helpsphere.local',
    'official123',
    'official',
    'Gram Panchayat',
    'Gram Pradhan',
    '9876500001',
    'Municipal Office'
  ),
  (
    'Asha Devi',
    'member@helpsphere.local',
    'member123',
    'member',
    NULL,
    'Town Member',
    '9876500002',
    'Shyampur'
  )
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  password = VALUES(password),
  role = VALUES(role),
  department = VALUES(department),
  designation = VALUES(designation),
  phone = VALUES(phone),
  address = VALUES(address),
  is_active = TRUE;

CREATE TABLE IF NOT EXISTS complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  type VARCHAR(100) NOT NULL,
  location VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('pending', 'resolved', 'escalated') NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS meetings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(150) NOT NULL,
  meeting_date DATE NOT NULL,
  meeting_time TIME NOT NULL,
  location VARCHAR(150) NOT NULL,
  description TEXT,
  status ENUM('requested', 'approved', 'completed', 'rejected') NOT NULL DEFAULT 'requested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
