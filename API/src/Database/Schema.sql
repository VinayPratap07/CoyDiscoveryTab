CREATE DATABASE Coy_Discovery_Tab;

USE Coy_Discovery_Tab;

CREATE TABLE users (
    user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    photoUrl VARCHAR(2048),
    bio VARCHAR(500),
    city VARCHAR(100),
    college VARCHAR(150),
    interests JSON,

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE swipes (
    swipe_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    swiperId CHAR(36) NOT NULL,
    swipedId CHAR(36) NOT NULL,
    action ENUM('LIKE', 'PASS') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_swiper
        FOREIGN KEY (swiperId) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_swiped
        FOREIGN KEY (swipedId) REFERENCES users(user_id)
        ON DELETE CASCADE,
    CONSTRAINT unique_swipe
        UNIQUE (swiperId, swipedId),
    CONSTRAINT check_no_self_swipe
        CHECK (swiperId != swipedId)
);

CREATE TABLE matches (
    match_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    userOneId CHAR(36) NOT NULL,
    userTwoId CHAR(36) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_match_user_one
        FOREIGN KEY (userOneId) REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_match_user_two
        FOREIGN KEY (userTwoId) REFERENCES users(user_id)
        ON DELETE CASCADE,

    CONSTRAINT unique_match
        UNIQUE (userOneId, userTwoId),

    CONSTRAINT check_match_order
        CHECK (userOneId < userTwoId)
);