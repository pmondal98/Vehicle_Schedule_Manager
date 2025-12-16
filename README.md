# 🚗 Vehicle Schedule Manager

A comprehensive web application for managing vehicle schedules, tracking expenses, and calculating profit/loss for vehicle bookings. Perfect for taxi operators, rental services, and fleet managers.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Features

### 🔐 Authentication & Security

- User registration and secure login with Firebase Auth
- Password recovery via email reset link
- Persistent sessions across browser sessions
- User data isolation and encryption

### 📅 Schedule Management

- Create vehicle schedules with dates, vehicle numbers, and passenger details
- Track booking amounts/fares
- Add and edit notes directly in schedule cards with pencil icon (✎)
- Smart collision detection prevents double-booking
- Automatic trip duration calculation
- **Active & Completed Schedules** tabs: Automatically archives schedules when the "To Date" has passed

### 💰 Expense Tracking & Analysis

- Add multiple expenses per schedule (fuel, tolls, food, maintenance)
- Delete individual expenses as needed
- Automatic total expense calculation
- **Real-time profit/loss calculation**: `Booking Amount - Total Expenses`
- Visual indicators: 💰 Green for profit, 📉 Red for loss
- Edit booking amounts anytime with instant recalculation

### 📝 Inline Notes Editing

- Click the pencil icon (✎) next to notes to edit inline
- No modal popups - edit directly in schedule card
- Save or cancel changes with action buttons
- Notes displayed with smooth animations

### 🗂️ Schedule Organization

- **Active Schedules Tab**: Shows all ongoing and upcoming schedules
- **Completed Schedules Tab**: Automatically shows past schedules (after "To Date")
- Easy switching between tabs without re-entering filters
- Archive badge shows "✓ Completed" on archived schedules

### 🔍 Additional Features

- Quick search by vehicle number with real-time filtering
- Works across both active and completed schedule views
- Fully responsive design (mobile, tablet, desktop)
- Touch-friendly interface
- Modern UI with glassmorphism effects
- Timestamped data: `createdAt` and `updatedAt` fields track schedule history

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Authentication, Cloud Firestore, Analytics)
- **Styling**: Custom CSS with responsive grid layout

## 🚀 Getting Started

### Create Account

1. Click **"Sign Up"**
2. Enter name, email, and password (minimum 6 characters)
3. Click **"Sign Up"** - you'll be auto-logged in

### Login

1. Enter your email and password
2. Click **"Login"**

### Forgot Password?

1. Click **"Forgot Password?"** on login page
2. Enter email and check for reset link
3. Create new password and login

## 📖 How to Use

### Viewing Schedules

- **Active Schedules**: Click "Active Schedules" tab to see all ongoing/upcoming schedules
- **Completed Schedules**: Click "Completed Schedules" tab to view past schedules (automatically moved when "To Date" passes)

### Adding a Schedule

**Fill in the form:**

- **Vehicle Number**: Registration number (e.g., WB40AR1234)
- **From/To Date**: Booking period
- **Passenger Details**: Name and contact info
- **Booking Amount**: Total fare in ₹
- **Notes**: Destination, advance payment, special instructions

**Click "Add Schedule"** - Your schedule appears with initial profit/loss

### Editing Notes Inline

1. **Click the pencil icon (✎)** next to notes in any schedule card
2. **Edit text** in the textarea that appears
3. **Save or Cancel**:
   - Click **"Save"** to update and persist changes
   - Click **"Cancel"** to discard changes
4. Notes display returns with updated content

### Managing Expenses

1. **Click "Manage Expenses"** on any schedule card

2. **Edit Booking Amount (if needed):**

   - Update amount in green section
   - Click **"Update"**
   - Get confirmation message

3. **Add Expenses:**

   - Enter description (e.g., "Fuel", "Toll")
   - Enter amount in ₹
   - Click **"Add Expense"**
   - View updated total and profit/loss

4. **Delete Expenses:**
   - Click × button next to any expense

### Search & Delete

- **Search**: Type vehicle number in search bar - results filter instantly across current tab
- **Delete**: Click "Delete" button on schedule card to remove permanently

## 📊 Profit/Loss Calculation

### Formula

```
Profit/Loss = Booking Amount - Total Expenses
```

### Example 1: PROFIT ✅

```
Booking Amount: ₹10,000
Expenses:
  • Fuel: ₹3,000
  • Toll: ₹500
  • Food: ₹1,000
Total Expenses: ₹4,500
Result: ₹5,500 PROFIT (Green 💰)
```

### Example 2: LOSS ❌

```
Booking Amount: ₹8,000
Expenses:
  • Fuel: ₹5,000
  • Maintenance: ₹2,800
  • Toll: ₹1,000
Total Expenses: ₹8,800
Result: ₹800 LOSS (Red 📉)
```

**Updates automatically** when you add/delete expenses or update booking amounts.

## 💡 Best Practices

### Organization Tips

- Use full registration numbers consistently (e.g., WB40AR1234)
- Add complete passenger details with phone numbers
- Record all expenses immediately as they occur
- Add detailed notes (pickup/drop locations, advance payments)
- Update booking amounts if fares change

### Maximize Features

- ✅ Use search to quickly find schedules and review history
- ✅ Edit booking amounts when customers pay extra or discounts apply
- ✅ Review profit/loss to identify profitable routes
- ✅ Delete old/cancelled schedules to keep dashboard clean

## ❓ FAQ

**Q: Is my data safe?**  
A: Yes! Securely stored in Firebase with enterprise-grade security. Only you can access your data.

**Q: Can I use this on mobile?**  
A: Absolutely! Fully responsive and works on all devices.

**Q: Do I need to install anything?**  
A: No installation needed - just open in your web browser.

**Q: Can I use offline?**  
A: Internet connection required for real-time cloud sync and backup.

**Q: Can I book the same vehicle for overlapping dates?**  
A: No, collision detection prevents double-booking automatically.

**Q: How do I edit notes?**  
A: Click the pencil icon (✎) next to notes in any schedule card to edit inline. No modal popups needed!

**Q: Where do old schedules go?**  
A: They automatically move to the "Completed Schedules" tab once their "To Date" has passed. They're not deleted, just archived for reference.

**Q: Can I search completed schedules?**  
A: Yes! The search works across both Active and Completed schedule tabs.

**Q: Can I see when a schedule was created or last updated?**  
A: Yes, all schedules have `createdAt` (creation time) and `updatedAt` (last modification time) timestamps in Firestore.

**Q: Can I edit expenses?**  
A: Delete and re-add with correct information. Direct editing coming in future updates.

**Q: What expenses can I track?**  
A: Any trip-related: Fuel, Toll, Food, Parking, Maintenance, Driver Salary, Repairs, etc.

**Q: Forgot password - what do I do?**  
A: Click "Forgot Password?" on login page and check email for reset link.

## 🎨 Color System

- 🔵 **Blue**: Vehicle numbers and headers
- 🟢 **Green**: Booking amounts and profit
- 🟡 **Yellow**: Expense summaries
- 🔴 **Red**: Loss indicators
- 💙 **Light Blue**: Passenger details and notes

## 📞 Support

**Contact**: [pmondal98.netlify.app](https://pmondal98.netlify.app/)  
**Developer**: Prabhas Mondal

### Common Issues

- **Can't login**: Check email spelling, verify password, use "Forgot Password"
- **Schedule not appearing**: Refresh page, check internet connection
- **Profit/loss not updating**: Close/reopen expense modal, refresh page
- **Search not working**: Clear search box and try again, or refresh page

---

**Made with ❤️ by Prabhas Mondal**  
© 2025 Vehicle Schedule Manager. All rights reserved.
