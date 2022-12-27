# Setup

Create a `.env` file containing the following variables:

```conf
PORT=9000 # Application port
TOKEN_SECRET=<Random secret> # Secret to sign jwt tokens
# MongoDB credentials
DB_HOST=localhost
DB_PORT=27017
DB_NAME=root-db
DB_USER=root
DB_PASS=root
```
Spin up the database with:

`docker compose up -d db`

Install the dependencies with `yarn` and run the project:

`yarn dev`

