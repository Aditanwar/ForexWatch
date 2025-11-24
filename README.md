# ForexWatch

Full-stack MERN application for real-time currency monitoring and SMS alerts.

## Setup

### Prerequisites
- Node.js
- MongoDB (running locally or cloud)
- Alpha Vantage API Key
- Twilio Account (SID, Auth Token, Phone Number)

### Backend Setup
1. Navigate to `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your API keys and MongoDB URI.
4. Run the server:
   ```bash
   npm start
   ```
   (Or `node server.js`)

### Frontend Setup
1. Navigate to `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Testing
- **Test SMS**: `node server/test-sms.js <your_phone_number>`
- **Test Forex**: `node server/test-forex.js`

## Features
- Create alerts for currency pairs (e.g., EUR/USD > 1.05).
- Background job checks rates every 5 minutes.
- SMS notification via Twilio when condition is met.
