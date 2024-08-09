CREATE TABLE user (
                      user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(255) NOT NULL UNIQUE,
                      password VARCHAR(255),
                      name VARCHAR(255),
                      phone_number VARCHAR(255),
                      user_type VARCHAR(255),
                      address VARCHAR(255),
                      detail_address VARCHAR(255),
                      token VARCHAR(255),
                      created_at TIMESTAMP NOT NULL,
                      edited_at TIMESTAMP NOT NULL,
                      last_login_at TIMESTAMP
);
