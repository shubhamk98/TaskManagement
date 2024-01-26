
# Streamline

Efficiently manage your tasks with Streamline, a task management application built using the MERN stack and AWS services.

## Technologies

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, AWS DynamoDB, AWS API Gateway, AWS Lambda

## Local Setup

1. **Clone the repository:**


2. **Navigate to the project directory:**


3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create `.env` files:**
   - **Backend (`backend/.env`):**
     ```
     PORT=3001
     MONGO_DB_URL=mongodb://your-mongodb-url
     JWT_SECRET=your-jwt-secret
     FRONTEND_URL=http://localhost:3000
     ```
   - **Frontend (`frontend/.env`):**
     ```
     VITE_API_BASE_URL=http://localhost:3001
     VITE_AWS_API_URL=https://your-aws-api-gateway-url
     ```

5. **Start the development servers:**
   ```bash
   npm run dev
   ```


## Additional Notes

- Ensure MongoDB is running with the provided connection URL.
- Replace placeholder AWS URLs with your actual service endpoints.

## Happy Task Management! 
```


