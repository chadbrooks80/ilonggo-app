
# Ilonggo App

## Overview
The Ilonggo App is a web application designed to facilitate learning and engagement with the Ilonggo language. The backend is built using Node.js, Express, and MongoDB, while the frontend is assumed to be a React application.

## Directory Structure

```
backend/
│
├── routes/
│   ├── auth.js        # Authentication routes
│   └── ...            # Additional route handlers
│
├── test/
│   └── basic.test.js  # Backend tests using Jest and Supertest
│
├── .env               # Environment variables
├── package.json       # Backend dependencies and scripts
├── server.js          # Express app setup
└── start.js           # Starts the Express server

client/                # Frontend application directory (React)
```

## Setup and Installation

### Prerequisites
- Node.js
- npm
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/chadbrooks80/ilonggo-app.git
   cd ilonggo-app
   ```

2. Backend setup:
   ```bash
   cd backend
   npm install
   ```

3. Frontend setup (assuming React):
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Backend**:
   - Create a `.env` file in the `backend` directory with the following variables:
     ```env
     MONGO_URI=<your_mongodb_connection_string>
     TEST_USERNAME=testuser
     TEST_PASSWORD=testpassword
     ```
   - Start the backend server:
     ```bash
     cd backend
     node start.js
     ```

2. **Frontend**:
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```

### Running Tests
To run backend tests:
```bash
cd backend
npm test
```

### API Endpoints

#### Authentication
- `POST /api/auth/login`: Authenticate user and return a token.
- Other auth routes as defined in `auth.js`.

#### Health Check
- `GET /ping`: Returns `pong` to indicate the server is running.

## Coding Conventions
- **File Path Comment**: The first line of each file should be a comment indicating the file path.
  ```javascript
  // /backend/server.js
  ```
- **Module Imports**: Use `require` for importing modules.
- **Environment Variables**: Managed using `dotenv` to load `.env` configurations.
- **Express Middleware**: Utilize `cors` for cross-origin requests and `body-parser` for parsing incoming requests.
- **Error Handling**: Basic error handling for MongoDB connection errors.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License
This project is licensed under the MIT License.
