# FANISI TECHNICAL TEST APPLICATION

- This repo contains both the backend and the frontend components, completed using NestJS and ReactJS respectively.


## Getting Started
- Clone the project 
```bash
$ git clone https://github.com/engmackenzie/fanisi.git
```
- Navigate to the project directory
```bash
$ cd fanisi/
```

- Backend: cd into the backend directory and install dependencies.
```bash
$ cd backend/
$ npm install
```

- Fronted: cd into the backend directory and install dependencies.
```bash
$ cd frontend/
$ npm install
```

## Setting up your .env file for the backend
- Create a .env file at the root of the backend directory with the following template.
```
# ENVIRONMENT
NODE_ENV=test
PORT=2000

# PRODUCTION DATABASE CONFIGURATION
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fanisi
DB_USERNAME=postgres
DB_PASSWORD=password
DB_LOGGING=false

# TEST DATABASE CONFIGURATION
TEST_DB_HOST=localhost
TEST_DB_PORT=7001
TEST_DB_NAME=fanisi
TEST_DB_USERNAME=postgres
TEST_DB_PASSWORD=password
TEST_DB_LOGGING=true

# AUTH CONFIGURATION
BYCRYPT_SALT_ROUNDS=10
JWT_ACCESS_TOKEN_SECRET=20c298e9-63d3-46a8-9b72-7f9e193c5eda6c1f3a71-7d69-4312-a05c-cc93779d8616
JWT_ACCESS_TOKEN_EXPIRATION=24h
```

## Setting up a Database
- Run a postgres database quickly if you have docker installed using the command below. Ensure you are in the backend directory when running this command.
- Alternatively you can create a database manually and fill out the required details in the .env file.
```bash
$ docker-compose up
```

## Running the application
- To run the backend, navigate to the backend directory and use the following options:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

- To run the frontend, navigate to the frontend directory and  use the following command:
```bash
# development
$ npm start
```

## Seeding the App
- On your API testing client like Insomnia or Postman, make a POST request to this endpoint:
```{host:port}/seed```

- When seeding, make sure you set your NODE_ENV variable to any of: `dev`, `test`, or `development`.
- Seeded items include:
  - Organizations
    - One demo organization
  - Users
    - SuperAdmin user

## API Documentation 
- Documentation can be found at `<BASE_URL>/api-docs`.
- Localhost Example: `http://localhost:2000/api-docs`.

## Testing the API
- Find an Insomnia/Postman collection in the root directory for testing the API: `api-testing.json`.

## Running Tests
- To run backend test cases, navigate to the backend directory and use the following commands:
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

- To run frontend test cases, navigate to the frontend directory and use the following command:
```bash
# unit tests
$ npm run test
```

## Help & Support
- You can reach out to Stephen through [email](stevomakenzi@gmail.com).

## Author

- Author - [Stephen Waweru](https://github.com/engmackenzie)

## License

- No license is required to use this software.
