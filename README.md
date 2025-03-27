# Product Profit Calculator Backend

## Project Summary

The **Product Profit Calculator Backend** is a Node.js and Express.js-based backend service that calculates the profit margin of a product based on its cost and selling price. This API allows users to input product pricing details and receive calculated profit metrics in response.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL / MongoDB (Specify which one is used)
- **Environment Variables**: dotenv
- **API Documentation**: Postman (Collection provided)
- **Deployment**: Docker / PM2

---

## Docker Local Setup Instructions

### Prerequisites:

- Docker (Ensure Docker is installed and running)
- Git

### Installation Steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/reyesginop04/profit-calculator-be.git
   cd profit-calculator-be
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```ini
    PORT=5000
    DB_URI=mongodb://root:password@profit_calculator_mongodb:27017/profitdb?authSource=admin
    JWT_SECRET=supersecretkey
   ```

3. **Build and run the containers:**

   ```sh
   docker-compose up --build -d
   ```

4. **Test the API using Postman or cURL.**

---

## Ubuntu Live Setup Instructions

### Prerequisites:

- Ubuntu 20.04+ (or any recent version)
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (Ensure database service is running)
- Git
- PM2 (for running the server in the background)

### Installation Steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/reyesginop04/profit-calculator-be.git
   cd profit-calculator-be
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Install PM2 globally (if not installed):**

   ```sh
   npm install -g pm2
   ```

4. **Configure environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```ini
    PORT=5000
    DB_URI=mongodb://root:password@localhost:27017/profitdb?authSource=admin
    JWT_SECRET=supersecretkey
   ```

5. **Start the server with PM2:**

   ```sh
   pm2 start npm --name "profit-calculator" -- run dev
   ```

6. **Ensure the server restarts on system reboot:**

   ```sh
   pm2 startup
   pm2 save
   ```

7. **Test the API using Postman or cURL.**

---

## Example .env Configuration

```ini
PORT=5000
DB_URI=mongodb://root:password@localhost:27017/profitdb?authSource=admin
JWT_SECRET=supersecretkey
```

---

## API Documentation

Ensure the Postman collection file exists in the `docs` folder. If not, place it there or update the link below to the correct path:
[Download Postman Collection](./docs/postman-collection.json)
