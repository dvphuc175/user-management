# User Management System

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## About

User Management System is a comprehensive backend solution built with NestJS and PostgreSQL. This application provides a user authentication and authorization system with role-based access control (RBAC). It includes features such as authentication using JWT, and user management operations with proper access controls.

### Features

- **User Authentication**
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Login endpoint

- **User Management**
  - CRUD operations for user accounts
  - Role-based access control (Admin, User)
  - User profile management

- **Security**
  - Data validation using DTOs
  - Role-based access permissions
  - Security middleware implementation

- **Database Integration**
  - PostgreSQL with TypeORM
  - Database migrations (incomplete)
  - Entity relationship management

## Getting Started

### Prerequisites

- Node.js 
- PostgreSQL
- npm or yarn

### Installation

```bash
# Clone the repository
$ git clone https://your-repository-url/user-management.git
$ cd user-management

# Install dependencies
$ npm install
```

### Configuration

Create a `.env` file in the root directory with the following variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=user_management
JWT_SECRET=your_strong_secret_key
JWT_ACCESS_EXPIRE=time period
```



### Running the Application

```bash
# Development mode
$ npm run start

# Watch mode
$ npm run start:dev

```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - Authenticate a user

### User Management Endpoints

- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get a specific user (Admin or the user themselves)
- `PATCH /api/users/:id` - Update a user (Admin or the user themselves)
- `DELETE /api/users/:id` - Delete a user (Admin only)
- `PATCH /api/users/:id/roles` - Update roles for a user (Admin only)

