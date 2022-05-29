
DROP DATABASE IF EXISTS projet;
CREATE DATABASE projet;
\c projet

CREATE TABLE Produit(
    name character varying(50) NOT NULL,
    price integer,
    size character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    path_img character varying(50) NOT NULL,
    description character varying(255) NOT NULL
);