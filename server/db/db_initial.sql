-- Create wallets table
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    wallet_address CHAR(42) NOT NULL UNIQUE
);
