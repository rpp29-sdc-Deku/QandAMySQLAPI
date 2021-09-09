DROP DATABASE IF EXISTS QandAAPI;
CREATE DATABASE QandAAPI;

USE QandAAPI;

DROP TABLE IF EXISTS Questions;

CREATE TABLE Questions (
  id INT auto_increment PRIMARY KEY ,
  product_id INT NOT NULL,
  body VARCHAR (255),
  date_written BIGINT,
  asker_name VARCHAR (55),
  asker_email VARCHAR (55),
  reported INT,
  helpful INT
);

DROP TABLE IF EXISTS Answers;

CREATE TABLE Answers (
  id INT auto_increment PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR (255),
  date_written BIGINT,
  answerer_name VARCHAR (25),
  answerer_email VARCHAR (55),
  reported INT,
  helpful INT,

  FOREIGN KEY (question_id) REFERENCES Questions(id)
);

DROP TABLE IF EXISTS Answers_Photos;

CREATE TABLE Answers_Photos (
  id INT auto_increment PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR (255),

  FOREIGN KEY (answer_id) REFERENCES Answers(id)
);




/*  Execute this file from the command line by typing:
 *  Line above will create new tables each time this is run in the mysql terminal
 *    mysql -u root < /Users/lady/rpp29/SDCMySQL/schema.sql
 *  to create the database and the tables.*/

--  check out indexing MySql