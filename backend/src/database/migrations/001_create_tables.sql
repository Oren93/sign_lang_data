BEGIN TRANSACTION;

CREATE TABLE glosses (
    id SERIAL PRIMARY KEY,
    gloss TEXT NOT NULL,
    priority INTEGER,
    added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_gloss UNIQUE (gloss)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE videos (
    id SERIAL PRIMARY KEY,
    signer INTEGER REFERENCES users(id),
    url TEXT, -- Ifwe store the video online
    fps INTEGER,
    frame_start INTEGER DEFAULT 0,
    frame_end INTEGER DEFAULT -1,
    bbox TEXT, -- Example "[385,37,885,720]"
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- In case some videos represent more than 1 gloss, this table defines many-to-many
CREATE TABLE gloss_videos (
    id SERIAL,
    gloss_id INTEGER NOT NULL REFERENCES glosses(id) ON DELETE CASCADE,
    video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
    PRIMARY KEY (gloss_id, video_id)
);

-- Categories, for example "fruits"
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag TEXT UNIQUE NOT NULL
);

-- Video and category have many-to-many relationship
CREATE TABLE video_tags (
    id SERIAL,
    video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (video_id, tag_id)
);

CREATE TABLE video_ratings (
    id SERIAL PRIMARY KEY,
    video_id INTEGER REFERENCES videos(id),
    user_id INTEGER REFERENCES users(id),
    rating INTEGER,
    comment_text TEXT,
    posted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
