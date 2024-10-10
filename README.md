## Contact Manager Backend

A backend API for managing contacts, built with Node.js, Express, and MongoDB.

## Overview

The Contact Manager Backend is a RESTful API designed to handle the backend operations of a contact management application. This project allows users to perform CRUD (Create, Read, Update, Delete) operations on their contact lists. The API is built using Node.js and Express, and it leverages MongoDB for data storage.

### Key Features

- **User Authentication**: Secure user registration and login functionality using JSON Web Tokens (JWT).
- **Contact Management**: Endpoints to create, read, update, and delete contacts.
- **Data Validation**: Ensures the integrity of data with comprehensive validation and sanitization.
- **Error Handling**: Robust error handling to provide meaningful responses to API consumers.
- **Scalability**: Designed with scalability in mind to handle a large number of users and contacts.
- **Security**: Implements security best practices to protect user data.

## Project Structure

```
contact-manager-backend/
├── controllers/ # Route handlers
├── middlewares/ # Custom middleware functions
├── models/ # Mongoose models
├── routes/ # API routes
├── utils/ # Utility functions
├── .env # Environment variables
├── .gitignore # Files to ignore in git
├── package.json # npm package configuration
├── README.md # Project documentation
└── server.js # Entry point for the application
```
## Prerequisites

Before you begin, ensure you have the following installed:

| Software | Description                                                                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Node.js  | Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code on the server side. [Download Node.js](https://nodejs.org/) |
| npm      | npm is the package manager for Node.js, used to install and manage dependencies for your project. It is included with Node.js installation.                              |
| MongoDB  | MongoDB is a NoSQL database program that uses JSON-like documents with optional schemas. [Download MongoDB](https://www.mongodb.com/)                                    |

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/contact-manager-backend.git
   cd contact-manager-backend
   ```
   

## Install dependencies:

   ```bash
   npm install
   ```

## Set up environment variables:

Create a `.env` file in the root directory and add the following:

```bash
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the Application

   ```bash
  npm run dev
   ```
 

The API will be accessible at http://localhost:3000.

## API Endpoints

#### Auth

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login an existing user |

#### Contacts

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/contacts`     | Get all contacts       |
| GET    | `/api/contacts/:id` | Get a contact by ID    |
| POST   | `/api/contacts`     | Create a new contact   |
| PUT    | `/api/contacts/:id` | Update a contact by ID |
| DELETE | `/api/contacts/:id` | Delete a contact by ID |

## Example Request and Response

#### Register a New User

**Request:**

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Salim Abukar",
  "email": "salim.@gmail.com",
  "password": "password123"
}
```

**Response:**

```json
201 Created
Content-Type: application/json

{
  "message": "User registered successfully!",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  "token": "your_jwt_token"
}
```

### Create a New Contact

**Request:**

```http
POST /api/contacts
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "Abdirizak Abdullahi",
  "email": "abdi.@gmail.com",
  "phone": "123-456-7890"
}
```

**Response:**

```json
201 Created
Content-Type: application/json

{
  "message": "Contact created successfully!",
  "contact": {
    "id": "60d0fe4f5311236168a109cb",
    "name": "Abdirizak Abdullahi",
    "email": "abdi@gmail.com",
    "phone": "123-456-7890"
  }
}
```

## Contributing

We welcome contributions from the community to improve Contact Manager . If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.
