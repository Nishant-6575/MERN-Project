# Employee Management System (MERN Stack)

A full-stack Employee Management System built using the MERN Stack. This project provides complete employee management with advanced backend features like search, filtering, sorting, pagination, and dashboard statistics.

---

## 🚀 Features

### Employee Management
- Create Employee
- View All Employees
- View Employee by ID
- Update Employee
- Delete Employee

### Backend Features
- Server-side Validation
- Duplicate Email & Employee ID Prevention
- Search Employees
- Pagination
- Sorting
- Department Filtering
- Dashboard Statistics
- Centralized Error Handling

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router DOM
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Database
- MongoDB Atlas

### Development Tools
- MongoDB Compass
- Postman
- Git
- GitHub

---


# API Endpoints

## Create Employee

```
POST /api/employees
```

### Request

```json
{
    "employeeId": "EMP001",
    "name": "Nishant Patel",
    "email": "nishant@gmail.com",
    "department": "IT",
    "salary": 50000
}
```

---

## Get All Employees

```
GET /api/employees
```

### Supports

| Query | Description |
|--------|-------------|
| search | Search by Employee ID, Name or Email |
| page | Page Number |
| limit | Records Per Page |
| sort | Sort Field |
| department | Filter by Department |

### Example

```
GET /api/employees?search=nishant&page=1&limit=10&sort=-salary&department=IT
```

---

## Get Employee By ID

```
GET /api/employees/:id
```

---

## Update Employee

```
PUT /api/employees/:id
```

---

## Delete Employee

```
DELETE /api/employees/:id
```

---

## Dashboard Statistics

```
GET /api/employees/stats
```

### Response

```json
{
    "success": true,
    "stats": {
        "totalEmployees": 120,
        "totalDepartments": 5,
        "averageSalary": 55000,
        "highestSalary": {
            "name": "John Doe",
            "salary": 90000
        },
        "lowestSalary": {
            "name": "Jane Smith",
            "salary": 25000
        }
    }
}
```

---

# Employee Schema

```javascript
{
    employeeId: String,
    name: String,
    email: String,
    department: String,
    salary: Number
}
```

---

# Backend Features Explained

### Search

```
GET /api/employees?search=nishant
```

Searches employee by:

- Employee Name
- Employee Email
- Employee ID

---

### Pagination

```
GET /api/employees?page=2&limit=10
```

Returns employees page-wise.

---

### Sorting

Ascending

```
GET /api/employees?sort=salary
```

Descending

```
GET /api/employees?sort=-salary
```

---

### Department Filter

```
GET /api/employees?department=IT
```

---

### Combined Query

```
GET /api/employees?search=nishant&department=IT&page=1&limit=10&sort=-createdAt
```

---

# Getting Started

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Backend

```bash
cd server
npm install
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
cd client
npm run dev
```

---

# Future Improvements

- User Authentication (JWT)
- Role Based Authorization
- Employee Profile Image Upload
- Dashboard Charts
- Export Employees to Excel/PDF
- Attendance Management
- Leave Management
- Payroll Module

---

# Author

**Nishant Patel**

GitHub: https://github.com/Nishant-6575

LinkedIn: https://www.linkedin.com/in/nishant6575/

---

# License

This project is created for learning and portfolio purposes.