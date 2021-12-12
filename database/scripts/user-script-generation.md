You can generate the user's database table by running the following SQL:

```
CREATE TABLE usuarios (
    id INT NOT NULL PRIMARY KEY,
    nome varchar(255),
    email varchar(255) NOT NULL,
    id_facebook varchar(255)
);
```
