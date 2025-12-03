# Expense Tracker System

A full-stack expense tracking application built with React, Redux Toolkit, Node.js, Express, and MongoDB.

## Features

- 💰 Track income and expenses
- 📊 Visual analytics with charts (Line & Pie charts)
- 🎯 Category-based filtering
- 🔍 Search transactions
- 📱 Responsive design with Material-UI
- ⚡ Real-time updates with RTK Query
- 🎨 Smooth page transitions

## Tech Stack

### Frontend
- React 19 + TypeScript
- Redux Toolkit & RTK Query
- Material-UI (MUI)
- Recharts for data visualization
- Tailwind CSS
- Vite

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS enabled
- ES Modules

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/girishklebca/ExpensesTrackerSystem.git
cd ExpensesTrackerSystem
```

2. **Setup Backend**
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend folder:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

3. **Setup Frontend**
```bash
cd ../Frontend
npm install
```

### Running the Application

1. **Start the Backend Server**
```bash
cd Backend
npm run server
```
Backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
```bash
cd Frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## Project Structure

```
ExpensesTrackerSystem/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── transactionController.js  # Business logic
│   ├── models/
│   │   └── transactionModel.js   # Mongoose schema
│   ├── routes/
│   │   └── transactionRoutes.js  # API routes
│   ├── app.js                    # Express server
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard.tsx     # Analytics dashboard
    │   │   ├── Transactions.tsx  # Transaction management
    │   │   ├── Home.tsx          # Landing page
    │   │   └── Navbar.tsx        # Navigation bar
    │   ├── store/
    │   │   ├── api/
    │   │   │   └── transactionsApi.ts  # RTK Query API
    │   │   ├── transactionsSlice.ts
    │   │   ├── store.ts          # Redux store
    │   │   └── hooks.ts
    │   ├── App.tsx               # Main app component
    │   ├── main.tsx              # App entry point
    │   └── index.css             # Global styles
    └── package.json
```

## API Endpoints

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/summary` - Get financial summary
- `POST /api/transactions` - Create new transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Features Overview

### Dashboard
- Monthly income & expense tracking
- Savings rate calculation
- Line chart for spending trends
- Pie chart for category breakdown
- Recent transactions list

### Transactions Page
- Add new income/expense
- Category selection (8 categories)
- Search functionality
- Delete transactions
- Form validation with notifications

### Categories
- Income
- Food & Dining
- Transportation
- Entertainment
- Shopping
- Health
- Bills & Utilities
- Other

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

**Girish**
- GitHub: [@girishklebca](https://github.com/girishklebca)

## Acknowledgments

- Material-UI for the component library
- Recharts for beautiful charts
- Redux Toolkit for state management
