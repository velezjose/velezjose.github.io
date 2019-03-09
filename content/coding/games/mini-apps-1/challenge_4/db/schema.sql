CREATE DATABASE IF NOT EXISTS player_stats;

USE player_stats;

CREATE TABLE user_score (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(20),
  number_wins INT
);