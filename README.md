# 🚗 Vehicle Schedule Manager

A comprehensive web application for managing vehicle schedules, tracking expenses, and calculating profit/loss for vehicle bookings. Perfect for taxi operators, rental services, and fleet managers.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 📋 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Feature Highlights](#feature-highlights)
- [Understanding Your Dashboard](#understanding-your-dashboard)
- [Tips & Best Practices](#tips--best-practices)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Support](#support)

## ✨ Features

### 🔐 Secure Account Management

- **Create Your Account**: Quick and easy registration with email
- **Secure Login**: Protected access to your schedules
- **Password Recovery**: Reset your password anytime via email
- **Automatic Login**: Stay logged in across sessions

### 📅 Schedule Management

- **Add Vehicle Schedules**: Track bookings with complete details
- **Date Range**: Set start and end dates for each booking
- **Vehicle Information**: Store vehicle registration numbers
- **Passenger Details**: Save passenger names and contact info
- **Booking Amount**: Record the agreed fare or booking amount
- **Notes Section**: Add destinations, advance payments, special instructions
- **Smart Collision Detection**: Prevents double-booking the same vehicle
- **Auto Duration**: Automatically calculates trip duration in days

### 💰 Complete Expense Tracking

- **Add Multiple Expenses**: Track fuel, tolls, food, maintenance, etc.
- **Detailed Records**: Label each expense with description and amount
- **Easy Management**: Delete expenses you no longer need
- **Automatic Totals**: See total expenses calculated instantly
- **Expense Count**: Know exactly how many expenses you've added

### 📊 Real-Time Profit/Loss Analysis

- **Instant Calculation**: Know your profit or loss immediately
- **Visual Indicators**:
  - 💰 **Green** = Making Profit
  - 📉 **Red** = Running at Loss
- **Simple Formula**: Booking Amount minus Total Expenses
- **Live Updates**: Changes automatically when you add/edit expenses

### ✏️ Edit Booking Amounts

- **Flexible Editing**: Update booking amounts anytime
- **Easy Access**: Edit directly in the expense management screen
- **Instant Recalculation**: Profit/loss updates immediately
- **Confirmation**: Get success messages for all updates

### 🔍 Quick Search

- **Find Schedules Fast**: Search by vehicle number
- **Real-Time Results**: See results as you type
- **Clear Display**: Different messages for search results vs. empty schedules

### 📱 Works Everywhere

- **Mobile Ready**: Full functionality on smartphones
- **Tablet Optimized**: Perfect for tablets
- **Desktop Experience**: Enhanced features on larger screens
- **Any Browser**: Works on Chrome, Firefox, Safari, and Edge

## 🚀 Getting Started

### Creating Your Account

1. **Visit the Application**

   - Open the Vehicle Schedule Manager in your browser

2. **Click "Sign Up"**

   - Enter your full name
   - Provide your email address
   - Create a password (minimum 6 characters)
   - Confirm your password
   - Click "Sign Up"

3. **You're Ready!**
   - You'll be automatically logged in
   - Start adding your first schedule

### Logging In

1. Enter your registered email
2. Enter your password
3. Click "Login"

### Forgot Password?

1. Click "Forgot Password?" on the login page
2. Enter your email address
3. Check your email for reset link
4. Create a new password
5. Login with your new password

## 📖 How to Use

### Adding a New Schedule

1. **Fill in the Schedule Form:**

   - **Vehicle Number**: Enter the registration number (e.g., WB40AR1234)
   - **From Date**: Select the booking start date
   - **To Date**: Select the booking end date
   - **Passenger Details**: Add passenger names and contact info
   - **Booking Amount**: Enter the total fare in ₹
   - **Notes** (Optional): Add destination, advance payment, special instructions

2. **Click "Add Schedule"**

   - Your schedule appears immediately below

3. **What You'll See:**
   - Vehicle number prominently displayed
   - Date range and duration
   - Passenger details
   - Booking amount in green
   - Notes section
   - Initial profit/loss (booking amount with zero expenses)

### Managing Expenses

1. **Click "Manage Expenses"** on any schedule card

2. **Edit Booking Amount (if needed):**

   - See the green section at the top
   - Current booking amount is pre-filled
   - Change the amount if needed
   - Click "Update" button
   - Get confirmation message

3. **Add an Expense:**

   - Enter expense description (e.g., "Fuel", "Toll", "Food")
   - Enter the amount in ₹
   - Click "Add Expense"
   - Expense appears in the list below

4. **View Summary:**

   - See all expenses listed
   - Total expenses shown at the top
   - Each expense has a delete button (×)

5. **Check Profit/Loss:**
   - Automatically calculated and displayed
   - Green = Profit, Red = Loss
   - Updates every time you add/edit

### Searching Schedules

1. Use the search bar at the top
2. Type any part of a vehicle number
3. Results filter automatically
4. Clear the search to see all schedules

### Deleting a Schedule

1. Find the schedule card
2. Click the "Delete" button
3. Confirm the deletion
4. Schedule is removed permanently

## 🎯 Feature Highlights

### Understanding the Schedule Card

Each schedule card displays:

📍 **Top Section:**

- Vehicle number (blue, bold)
- Date range (From - To)
- Duration in days

📝 **Middle Section:**

- Passenger details (light blue background)
- Booking amount (green background) - Your income
- Notes (light blue background) - Trip details

💰 **Financial Section:**

- Total expenses (yellow background) - All costs
- Profit or Loss (green/red background) - Your earnings/deficit

🎬 **Action Buttons:**

- "Manage Expenses" - Opens expense modal
- "Delete" - Removes the schedule

### The Expense Management Modal

When you click "Manage Expenses":

1. **Vehicle Info Bar (Gray)**

   - Shows which vehicle you're managing
   - Displays the date range

2. **Edit Booking Section (Green)**

   - Update the booking amount
   - Pre-filled with current value
   - Click "Update" to save changes

3. **Add Expense Form**

   - Simple description + amount fields
   - Click "Add Expense" to save

4. **Expenses List**
   - Shows all expenses with amounts
   - Total displayed prominently
   - Delete button (×) for each expense

### Understanding Profit & Loss

**The Calculation:**

```
Profit/Loss = Booking Amount - Total Expenses

Example 1: PROFIT
- Booking Amount: ₹10,000
- Fuel: ₹3,000
- Toll: ₹500
- Food: ₹1,000
- Total Expenses: ₹4,500
- Result: ₹5,500 PROFIT ✅ (shown in green)

Example 2: LOSS
- Booking Amount: ₹8,000
- Fuel: ₹5,000
- Toll: ₹1,000
- Maintenance: ₹3,500
- Total Expenses: ₹9,500
- Result: ₹1,500 LOSS ❌ (shown in red)
```

## 💡 Tips & Best Practices

### For Better Organization

1. **Use Clear Vehicle Numbers**

   - Always use the full registration number
   - Keep format consistent (e.g., WB40AR1234)

2. **Add Passenger Details**

   - Include name and phone number
   - Helps you contact them if needed

3. **Be Detailed in Notes**

   - Add pickup and drop locations
   - Note any advance payments received
   - Record special instructions

4. **Track All Expenses**

   - Add expenses as they happen
   - Don't wait until the trip ends
   - Categories: Fuel, Toll, Parking, Food, Maintenance

5. **Regular Updates**
   - Update booking amount if fare changes
   - Review expenses before trip completion
   - Check profit/loss regularly

### Making the Most of Features

✅ **Use Search Frequently**

- Find schedules quickly
- Review past bookings
- Check specific vehicle history

✅ **Edit Booking Amounts When Needed**

- Customer paid extra? Update it
- Discount given? Adjust immediately
- Keeps your profit calculations accurate

✅ **Review Profit/Loss**

- Know which routes are profitable
- Identify high-cost trips
- Make better pricing decisions

✅ **Delete Old Schedules**

- Keep your dashboard clean
- Remove cancelled bookings
- Focus on active schedules

## ❓ Frequently Asked Questions

### General Questions

**Q: Is my data safe?**
A: Yes! Your data is securely stored in the cloud and protected by Firebase security. Only you can access your schedules.

**Q: Can I access this on my phone?**
A: Absolutely! The application works perfectly on all devices - smartphones, tablets, and computers.

**Q: Do I need to install anything?**
A: No installation needed. Just open it in your web browser and start using it.

**Q: Can I use this offline?**
A: You need an internet connection to add, edit, or view schedules as data is synced in real-time.

### Account Questions

**Q: I forgot my password. What do I do?**
A: Click "Forgot Password?" on the login page, enter your email, and you'll receive a reset link.

**Q: Can I change my email address?**
A: Currently, email addresses cannot be changed. Please contact support if you need assistance.

**Q: How do I logout?**
A: Click the "Logout" button in the top-right corner of the dashboard.

### Schedule Questions

**Q: Can I book the same vehicle for overlapping dates?**
A: No, the system prevents double-booking automatically. You'll see an error if dates overlap.

**Q: Can I edit a schedule after creating it?**
A: You can update the booking amount and manage expenses. For other changes, delete and recreate the schedule.

**Q: How many schedules can I create?**
A: There's no limit! Create as many schedules as you need.

### Expense Questions

**Q: Can I edit an expense after adding it?**
A: Currently, you can only delete and re-add expenses with the correct information.

**Q: What types of expenses can I add?**
A: Any expense related to the trip - fuel, toll, food, parking, maintenance, driver salary, etc.

**Q: Does the profit/loss update automatically?**
A: Yes! It recalculates immediately whenever you add expenses or update the booking amount.

### Technical Questions

**Q: Which browsers are supported?**
A: Chrome, Firefox, Safari, Edge, and all modern mobile browsers.

**Q: The page isn't loading. What should I do?**
A: Check your internet connection and refresh the page. Clear browser cache if the problem persists.

**Q: Can multiple people use the same account?**
A: Yes, but they'll see and can modify all schedules. Consider using separate accounts for better tracking.

## 🎨 Understanding the Color System

The application uses colors to help you quickly identify information:

- 🔵 **Blue**: Vehicle numbers and headings
- 🟢 **Green**: Booking amounts and profit
- 🟡 **Yellow**: Expense summaries
- 🔴 **Red**: Losses
- ⚪ **Gray**: Vehicle information and dates
- 💙 **Light Blue**: Passenger details and notes

## 📞 Support

### Need Help?

If you encounter any issues or have questions:

**Contact:**

- **Website**: [pmondal98.netlify.app](https://pmondal98.netlify.app/)
- **Founder**: Prabhas Mondal

### Common Issues & Solutions

**Issue**: Can't login

- **Solution**: Check email spelling, verify password, use "Forgot Password" if needed

**Issue**: Schedule not appearing

- **Solution**: Refresh the page, check internet connection

**Issue**: Profit/loss not updating

- **Solution**: Close and reopen the expense modal, refresh the page

**Issue**: Search not working

- **Solution**: Clear the search box and type again, refresh the page

---

## 🌟 Start Managing Your Vehicle Schedules Today!

Experience hassle-free schedule management, accurate expense tracking, and instant profit/loss calculations. Everything you need to run your vehicle business efficiently.

---

**Made with ❤️ by Prabhas Mondal**

© 2025 Vehicle Schedule Manager. All rights reserved.

## ✨ Features

### 🔐 Authentication System

- **User Registration**: Create account with email and password
- **Login**: Secure authentication with Firebase Auth
- **Password Reset**: Forgot password functionality with email verification
- **Session Management**: Persistent login with automatic session handling
- **User Profile**: Display user name and email

### 📅 Schedule Management

- **Add Schedule**: Create new vehicle schedules with comprehensive details
- **Date Range Selection**: Set booking start and end dates
- **Vehicle Information**: Track vehicle numbers (e.g., WB40AR1234)
- **Passenger Details**: Store passenger names and contact information
- **Booking Amount**: Set and track booking/fare amounts
- **Notes**: Add destinations, advance payments, and other information
- **Date Collision Detection**: Prevent double-booking of vehicles
- **Duration Calculation**: Automatically calculate trip duration

### 💰 Expense Tracking

- **Add Expenses**: Track multiple expenses per schedule (Fuel, Toll, Food, etc.)
- **Expense Description**: Label each expense for easy identification
- **Amount Tracking**: Record expense amounts with ₹ currency
- **Delete Expenses**: Remove individual expenses
- **Total Calculation**: Automatic sum of all expenses
- **Expense Count**: Display number of expense items

### 📊 Profit/Loss Analysis

- **Automatic Calculation**: Real-time profit/loss computation
  - Formula: `Profit/Loss = Booking Amount - Total Expenses`
- **Visual Indicators**:
  - 💰 Green display for profit
  - 📉 Red display for loss
- **Dynamic Updates**: Recalculates when expenses or booking amount changes

### ✏️ Edit Booking Amount

- **Modal Editing**: Update booking amount directly in expense management modal
- **Pre-filled Values**: Current booking amount automatically populated
- **Validation**: Ensures positive numeric values
- **Real-time Updates**: Profit/loss recalculates immediately after update
- **Success Notifications**: Confirmation messages for successful updates

### 🔍 Search & Filter

- **Vehicle Search**: Search schedules by vehicle number
- **Real-time Filtering**: Instant results as you type
- **Empty State Messages**: Different messages for search results vs. no schedules

### 📱 Responsive Design

- **Mobile Optimized**: Fully functional on smartphones
- **Tablet Support**: Adaptive layout for tablets
- **Desktop Experience**: Enhanced features for larger screens
- **Touch-Friendly**: Minimum 44px touch targets for buttons
- **Orientation Support**: Works in both portrait and landscape modes

### 🎨 Modern UI/UX

- **Gradient Backgrounds**: Beautiful purple gradient theme
- **Glassmorphism**: Modern blur effects on cards
- **Smooth Animations**: Hover effects and transitions
- **Color-Coded Cards**: Visual distinction for different data types
- **Empty States**: Engaging messages when no data is present
- **Modal Dialogs**: Clean expense management interface

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Backend as a Service)
  - Firebase Authentication
  - Cloud Firestore Database
  - Firebase Analytics
- **Styling**: Custom CSS with Responsive Grid Layout
- **Icons**: Unicode Emoji Icons
- **Hosting**: Can be deployed on any static hosting service

### Getting Started

1. **Sign Up**

   - Open the application
   - Click "Sign up"
   - Enter your full name, email, and password
   - Click "Sign Up" button

2. **Login**

   - Enter your registered email and password
   - Click "Login" button

3. **Add a Schedule**

   - Fill in the vehicle number (e.g., WB40AR1234)
   - Select "From Date" and "To Date"
   - Enter passenger details
   - Enter booking amount in ₹
   - Add notes (optional)
   - Click "Add Schedule"

4. **Manage Expenses**

   - Click "Manage Expenses" on any schedule card
   - **Edit Booking Amount**: Update the booking amount if needed
   - **Add Expenses**: Enter description and amount
   - View total expenses and profit/loss
   - Delete individual expenses if needed

5. **Search Schedules**

   - Use the search bar to filter schedules by vehicle number
   - Results update in real-time

6. **View Analytics**
   - Each card displays:
     - Vehicle number and dates
     - Passenger details
     - Booking amount (green)
     - Total expenses (yellow)
     - Profit or Loss (green/red)

## 🔧 Detailed Functionality

### Authentication Flow

```
1. User Registration
   └─→ Validate password match
   └─→ Create Firebase user
   └─→ Update user profile with name
   └─→ Save user data to Firestore
   └─→ Track analytics event
   └─→ Auto-login and redirect to dashboard

2. User Login
   └─→ Validate credentials with Firebase
   └─→ Track analytics event
   └─→ Redirect to dashboard
   └─→ Load user's schedules

3. Password Reset
   └─→ Send reset email via Firebase
   └─→ Display success message
   └─→ Redirect to login after 3 seconds
```

### Schedule Creation Workflow

```
1. Form Validation
   └─→ Check all required fields
   └─→ Validate date range (from ≤ to)
   └─→ Check for date collisions

2. Data Storage
   └─→ Store in Firestore:
       - userId
       - vehicleNumber
       - fromDate, toDate
       - passengerDetails
       - bookingAmount
       - notes
       - expenses (empty array)
       - createdAt timestamp

3. UI Update
   └─→ Clear form
   └─→ Reload schedules
   └─→ Display new card
```

### Expense Management

```
1. Open Modal
   └─→ Fetch schedule by ID
   └─→ Display vehicle info
   └─→ Pre-fill booking amount
   └─→ List existing expenses

2. Add Expense
   └─→ Validate description and amount
   └─→ Add to expenses array
   └─→ Update Firestore
   └─→ Recalculate totals
   └─→ Track analytics event

3. Update Booking Amount
   └─→ Validate new amount
   └─→ Update in Firestore
   └─→ Reload schedules
   └─→ Recalculate profit/loss
   └─→ Show success message

4. Delete Expense
   └─→ Remove from expenses array
   └─→ Update Firestore
   └─→ Refresh display
```

### Profit/Loss Calculation

```javascript
Formula: Profit/Loss = Booking Amount - Total Expenses

Example:
- Booking Amount: ₹10,000
- Expenses:
  • Fuel: ₹3,000
  • Toll: ₹500
  • Food: ₹1,000
- Total Expenses: ₹4,500
- Result: ₹5,500 Profit (displayed in green)
```

## 🎯 Key Features Breakdown

### 1. **Booking Amount Management**

- Set during schedule creation
- Edit anytime in expense modal
- Green highlighted section in modal
- Validation for positive numbers
- Real-time profit/loss update

### 2. **Expense Tracking**

- Multiple expenses per schedule
- Description + Amount format
- Individual delete buttons
- Automatic total calculation
- Shows count of items

### 3. **Profit/Loss Display**

- Color-coded (green/red)
- Shows absolute value
- Icon indicators (💰/📉)
- Updates automatically
- Displayed on every card

### 4. **Search Functionality**

- Real-time filtering
- Case-insensitive search
- Vehicle number matching
- Empty state messages
- Clear visual feedback

### 5. **Responsive Design**

- Mobile: Stacked layout
- Tablet: 2-column grid
- Desktop: 3+ column grid
- Touch-friendly buttons
- Optimized forms

## 🔒 Security Features

- Firebase Authentication
- Secure password storage
- Session management
- User data isolation
- HTTPS encryption (when deployed)

## 📊 Analytics Events Tracked

- `sign_up`: User registration
- `login`: User login
- `schedule_created`: New schedule added
- `expense_added`: New expense added
- `booking_amount_updated`: Booking amount edited

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Made with ❤️ by Prabhas Mondal**

© 2025 Vehicle Schedule Manager. All rights reserved.
