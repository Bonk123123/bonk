CREATE TYPE listposition AS ENUM ('Director', 'Deputy Director', 'Secretary', 'Guest');

create TABLE person(
    id SERIAL PRIMARY KEY,
    surname VARCHAR(255),
    nameotch VARCHAR(255),
    position listposition,
    addres VARCHAR(255),
    phone_number VARCHAR(255)
);