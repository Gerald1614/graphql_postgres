CREATE TABLE IF NOT EXISTS
    creditcards(
      cardid VARCHAR(40) PRIMARY KEY,
      cardnumber VARCHAR(128),
      userid VARCHAR(40) REFERENCES users(id) ON DELETE CASCADE
    )