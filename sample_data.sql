-- Sample Data for School Management System
-- Run this AFTER running the database_schema_clean.sql file
-- This file contains sample data to help you get started

-- Insert sample classes
INSERT INTO classes (name, level, section, capacity, academic_year) VALUES
('Primary 1A', 'primary', 'A', 30, '2024/2025'),
('Primary 1B', 'primary', 'B', 30, '2024/2025'),
('Primary 2A', 'primary', 'A', 30, '2024/2025'),
('JSS 1A', 'junior', 'A', 35, '2024/2025'),
('JSS 1B', 'junior', 'B', 35, '2024/2025'),
('SSS 1A', 'senior', 'A', 40, '2024/2025'),
('SSS 1B', 'senior', 'B', 40, '2024/2025');

-- Insert sample subjects (with unique codes for each level)
INSERT INTO subjects (name, code, level, description) VALUES
-- Primary Level Subjects
('Mathematics', 'MATH-PRI', 'primary', 'Basic Mathematics'),
('English Language', 'ENG-PRI', 'primary', 'English Language and Literature'),
('Science', 'SCI-PRI', 'primary', 'Basic Science'),
('Social Studies', 'SOC-PRI', 'primary', 'Social Studies'),

-- Junior Secondary Level Subjects
('Mathematics', 'MATH-JSS', 'junior', 'Junior Secondary Mathematics'),
('English Language', 'ENG-JSS', 'junior', 'Junior Secondary English'),
('Basic Science', 'BSC-JSS', 'junior', 'Basic Science'),
('Social Studies', 'SOC-JSS', 'junior', 'Social Studies'),

-- Senior Secondary Level Subjects
('Mathematics', 'MATH-SSS', 'senior', 'Senior Secondary Mathematics'),
('English Language', 'ENG-SSS', 'senior', 'Senior Secondary English'),
('Physics', 'PHY-SSS', 'senior', 'Physics'),
('Chemistry', 'CHEM-SSS', 'senior', 'Chemistry'),
('Biology', 'BIO-SSS', 'senior', 'Biology'),
('Economics', 'ECO-SSS', 'senior', 'Economics'),
('Government', 'GOV-SSS', 'senior', 'Government');

-- Insert sample fee structure
INSERT INTO fee_structure (name, level, academic_year, amount, description) VALUES
('Primary School Fees', 'primary', '2024/2025', 50000.00, 'Termly fees for primary school students'),
('Junior Secondary Fees', 'junior', '2024/2025', 75000.00, 'Termly fees for junior secondary students'),
('Senior Secondary Fees', 'senior', '2024/2025', 100000.00, 'Termly fees for senior secondary students');

-- Insert sample announcements
INSERT INTO announcements (title, content, target_audience, priority, is_active, published_at) VALUES
('Welcome to New Academic Year', 'Welcome all students and staff to the 2024/2025 academic year. Classes resume on Monday, September 2nd, 2024.', 'all', 'normal', true, NOW()),
('Parent-Teacher Meeting', 'Parent-Teacher meeting is scheduled for Saturday, September 14th, 2024 at 10:00 AM. All parents are encouraged to attend.', 'parents', 'high', true, NOW()),
('Sports Day Announcement', 'Annual Sports Day will be held on Friday, October 25th, 2024. Students should come prepared for various sporting activities.', 'students', 'normal', true, NOW());
