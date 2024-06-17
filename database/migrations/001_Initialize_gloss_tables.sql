CREATE TABLE glosses (
    id SERIAL PRIMARY KEY,
    gloss TEXT NOT NULL,
    priority INTEGER,
    added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_gloss UNIQUE (gloss)
);
