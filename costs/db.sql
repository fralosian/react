-- Criação do banco de dados (se necessário)
CREATE DATABASE IF NOT EXISTS my_database;
USE my_database;

-- Criação da tabela categories
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Criação da tabela projects
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    budget DECIMAL(10, 2) NOT NULL,
    categoryId INT,
    cost DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
);

-- Criação da tabela services
CREATE TABLE services (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    description TEXT,
    projectId INT,
    FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
);

-- Criação da tabela messages
CREATE TABLE messages (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('unread', 'read') NOT NULL,
    date DATETIME NOT NULL
);

-- Inserção de dados iniciais na tabela categories
INSERT INTO categories (name) VALUES
('Infra'),
('Desenvolvimento'),
('Design'),
('Planejamento');

-- Inserção de dados iniciais na tabela projects
INSERT INTO projects (name, budget, categoryId, cost) VALUES
('Primeiro teste', 1233, 2, 123);

-- Inserção de dados iniciais na tabela services
INSERT INTO services (id, name, cost, description, projectId) VALUES
('932d4a8b-df2f-4d9b-8934-b69128758d89', 'Teste 1', 123, 'teste', 1);

-- Inserção de dados iniciais na tabela messages
INSERT INTO messages (id, name, email, message, status, date) VALUES
('7771', 'Teste 1', 'testeteste@gmail.com', 'teste', 'unread', '2024-09-01 03:12:15');
