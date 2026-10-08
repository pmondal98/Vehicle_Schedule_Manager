document.getElementById("currentYear").textContent = new Date().getFullYear();

// ========================================
// FIREBASE CONFIGURATION
// ========================================
const firebaseConfig = {
  apiKey: "AIzaSyBZGvPm7DsRgMJLta0_K7ivEmPfthTgqQ4",
  authDomain: "vehicle-schedule-manager-38df6.firebaseapp.com",
  projectId: "vehicle-schedule-manager-38df6",
  storageBucket: "vehicle-schedule-manager-38df6.firebasestorage.app",
  messagingSenderId: "391815087352",
  appId: "1:391815087352:web:60b5c2acdd231d68bae70d",
  measurementId: "G-V9CMVNM5CL",
};

// Initialize Firebase (using compat version from CDN)
let auth, db, analytics, schedulesDb;
let isFirebaseConfigured = false;

try {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();
  schedulesDb = db.collection("schedules");
  analytics = firebase.analytics();
  isFirebaseConfigured = true;
  console.log("✅ Database initialized successfully");
} catch (error) {
  console.error("❌ Database initialization error:", error);
}

// ========================================
// GLOBAL VARIABLES
// ========================================
let currentUser = null;
let schedules = [];
let currentScheduleId = null; // For expense modal
let currentTabFilter = "active"; // Track which tab is active

// ========================================
// PAGE NAVIGATION
// ========================================
function showLogin() {
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("forgotPasswordPage").classList.add("hidden");
  document.getElementById("mainApp").classList.add("hidden");
}

function showSignup() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.remove("hidden");
  document.getElementById("forgotPasswordPage").classList.add("hidden");
  document.getElementById("mainApp").classList.add("hidden");
}

function showForgotPassword() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("forgotPasswordPage").classList.remove("hidden");
  document.getElementById("mainApp").classList.add("hidden");
}

function showMainApp() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("forgotPasswordPage").classList.add("hidden");
  document.getElementById("mainApp").classList.remove("hidden");
  if (currentUser) {
    document.getElementById("userName").textContent = currentUser.name;
    loadSchedules();
  }
}

// ========================================
// FIREBASE AUTH STATE OBSERVER
// ========================================
if (isFirebaseConfigured) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      currentUser = {
        uid: user.uid,
        name: user.displayName || user.email,
        email: user.email,
      };
      showMainApp();
    } else {
      currentUser = null;
      showLogin();
    }
  });
}

// ========================================
// AUTHENTICATION HANDLERS
// ========================================
document
  .getElementById("signupForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!isFirebaseConfigured) {
      showError("signupError", "⚠️ Database is not configured!");
      return;
    }

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPassword = document
      .getElementById("signupConfirmPassword")
      .value.trim();

    if (password !== confirmPassword) {
      showError("signupError", "❌ Passwords do not match!");
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Update profile first, then save to Firestore
      await userCredential.user.updateProfile({ displayName: name });

      // Reload user to get the updated profile
      await userCredential.user.reload();

      await db.collection("users").doc(userCredential.user.uid).set({
        name: name,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Manually update currentUser to show name immediately
      currentUser = {
        uid: userCredential.user.uid,
        name: name,
        email: email,
      };

      // Track signup event
      if (analytics) {
        analytics.logEvent("sign_up", {
          method: "email",
        });
      }

      showSuccess("signupSuccess", "✅ Account created successfully!");
      this.reset();

      // Navigate to main app immediately with correct name
      showMainApp();
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        showError(
          "signupError",
          "❌ This email is already registered. Please login instead."
        );
      } else if (error.code === "auth/weak-password") {
        showError(
          "signupError",
          "❌ Password is too weak. Use at least 6 characters."
        );
      } else if (error.code === "auth/invalid-email") {
        showError("signupError", "❌ Invalid email address.");
      } else {
        showError(
          "signupError",
          `❌ ${error.message.replace(/Firebase: |Firebase /g, "")}`
        );
      }
    }
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!isFirebaseConfigured) {
      showError("loginError", "⚠️ Database is not configured!");
      return;
    }

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      await auth.signInWithEmailAndPassword(email, password);

      // Track login event
      if (analytics) {
        analytics.logEvent("login", {
          method: "email",
        });
      }

      // Auth state change will handle navigation
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") {
        showError(
          "loginError",
          "❌ No account found with this email. Please sign up."
        );
      } else if (error.code === "auth/wrong-password") {
        showError(
          "loginError",
          "❌ Incorrect password. Try again or reset your password."
        );
      } else if (error.code === "auth/invalid-email") {
        showError("loginError", "❌ Invalid email address.");
      } else if (error.code === "auth/too-many-requests") {
        showError(
          "loginError",
          "❌ Too many failed attempts. Please try again later or reset your password."
        );
      } else {
        showError(
          "loginError",
          `❌ ${error.message.replace(/Firebase: |Firebase /g, "")}`
        );
      }
    }
  });

document
  .getElementById("logoutBtn")
  .addEventListener("click", async function () {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out");
    }
  });

// ========================================
// NAVIGATION LINKS
// ========================================
document.getElementById("showSignup").addEventListener("click", function (e) {
  e.preventDefault();
  showSignup();
});

document.getElementById("showLogin").addEventListener("click", function (e) {
  e.preventDefault();
  showLogin();
});

document
  .getElementById("showForgotPassword")
  .addEventListener("click", function (e) {
    e.preventDefault();
    showForgotPassword();
  });

document.getElementById("backToLogin").addEventListener("click", function (e) {
  e.preventDefault();
  showLogin();
});

// ========================================
// FORGOT PASSWORD HANDLER
// ========================================
document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!isFirebaseConfigured) {
      showError("forgotPasswordError", "⚠️ Database is not configured!");
      return;
    }

    const email = document.getElementById("forgotPasswordEmail").value.trim();

    try {
      await auth.sendPasswordResetEmail(email);
      showSuccess(
        "forgotPasswordSuccess",
        "✅ Password reset email sent! Check your inbox."
      );
      this.reset();

      // Redirect to login after 3 seconds
      setTimeout(() => {
        showLogin();
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
      if (error.code === "auth/user-not-found") {
        showError(
          "forgotPasswordError",
          "❌ No account found with this email."
        );
      } else if (error.code === "auth/invalid-email") {
        showError("forgotPasswordError", "❌ Invalid email address.");
      } else {
        showError(
          "forgotPasswordError",
          `❌ ${error.message.replace(/Firebase: |Firebase /g, "")}`
        );
      }
    }
  });

// ========================================
// SCHEDULE MANAGEMENT
// ========================================
async function loadSchedules() {
  if (!currentUser) return;

  try {
    // Fetch schedules without ordering (to avoid index requirement temporarily)
    const snapshot = await db
      .collection("schedules")
      .where("userId", "==", currentUser.uid)
      .get();

    schedules = [];
    snapshot.forEach((doc) => {
      schedules.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort manually in JavaScript instead
    schedules.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));

    renderSchedules();
  } catch (error) {
    console.error("Error loading schedules:", error);
  }
}

async function checkDateCollision(
  vehicleNumber,
  fromDate,
  toDate,
  excludeId = null
) {
  if (!currentUser) return false;

  try {
    const snapshot = await db
      .collection("schedules")
      .where("userId", "==", currentUser.uid)
      .get();

    const newFrom = new Date(fromDate);
    const newTo = new Date(toDate);

    for (let doc of snapshot.docs) {
      if (excludeId && doc.id === excludeId) continue;

      const data = doc.data();
      if (data.vehicleNumber.toLowerCase() !== vehicleNumber.toLowerCase())
        continue;

      const existingFrom = new Date(data.fromDate);
      const existingTo = new Date(data.toDate);

      if (newFrom <= existingTo && newTo >= existingFrom) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.error("Error checking collision:", error);
    return false;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function calculateDuration(fromDate, toDate) {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const diffTime = Math.abs(to - from);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays === 1 ? "1 day" : `${diffDays} days`;
}

async function deleteSchedule(scheduleId) {
  if (confirm("Are you sure you want to delete this schedule?")) {
    try {
      await db.collection("schedules").doc(scheduleId).delete();
      await loadSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete schedule");
    }
  }
}

document
  .getElementById("scheduleForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const vehicleNumber = document
      .getElementById("vehicleNumber")
      .value.trim()
      .toUpperCase();
    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const passengerDetails = document
      .getElementById("passengerDetails")
      .value.trim();
    const bookingAmount = document.getElementById("bookingAmount").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (new Date(fromDate) > new Date(toDate)) {
      showError("errorMessage", "❌ From Date cannot be later than To Date!");
      return;
    }

    const hasCollision = await checkDateCollision(
      vehicleNumber,
      fromDate,
      toDate
    );
    if (hasCollision) {
      showError(
        "errorMessage",
        `❌ Schedule conflict! Vehicle ${vehicleNumber} already has a schedule during this time period.`
      );
      return;
    }

    try {
      await db.collection("schedules").add({
        userId: currentUser.uid,
        vehicleNumber: vehicleNumber,
        fromDate: fromDate,
        toDate: toDate,
        passengerDetails: passengerDetails,
        bookingAmount: parseFloat(bookingAmount),
        notes: notes,
        expenses: [], // Initialize empty expenses array
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Track schedule creation event
      if (analytics) {
        analytics.logEvent("schedule_created", {
          vehicle_number: vehicleNumber,
          duration_days: calculateDuration(fromDate, toDate),
        });
      }

      this.reset();
      await loadSchedules();
    } catch (error) {
      console.error("Error adding schedule:", error);
      showError("errorMessage", "❌ Failed to add schedule");
    }
  });

// ========================================
// EXPENSE MANAGEMENT
// ========================================
function openExpenseModal(scheduleId) {
  currentScheduleId = scheduleId;
  const schedule = schedules.find((s) => s.id === scheduleId);

  if (!schedule) return;

  // Display vehicle info
  document.getElementById("expenseVehicleInfo").innerHTML = `
    <strong>Vehicle:</strong> ${schedule.vehicleNumber}<br>
    <strong>Date Range:</strong> ${formatDate(
      schedule.fromDate
    )} - ${formatDate(schedule.toDate)}
  `;

  // Set booking amount in edit field
  const bookingAmount = parseFloat(schedule.bookingAmount) || 0;
  document.getElementById("editBookingAmount").value = bookingAmount;

  // Display existing expenses
  renderExpensesList(schedule.expenses || []);

  // Show modal
  document.getElementById("expenseModal").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeExpenseModal() {
  document.getElementById("expenseModal").classList.add("hidden");
  document.getElementById("expenseForm").reset();
  currentScheduleId = null;
  document.body.style.overflow = ""; // Restore scrolling
}

function renderExpensesList(expenses) {
  const container = document.getElementById("expensesList");

  if (!expenses || expenses.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #999; padding: 20px;">No expenses added yet</p>';
    return;
  }

  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  container.innerHTML = `
    <div class="expenses-header">
      <h3>Expenses List</h3>
      <div class="total-expense">Total: ₹${total.toFixed(2)}</div>
    </div>
    <div class="expense-items">
      ${expenses
        .map(
          (expense, index) => `
        <div class="expense-item">
          <div class="expense-details">
            <span class="expense-description">${expense.description}</span>
            <span class="expense-amount">₹${parseFloat(expense.amount).toFixed(
              2
            )}</span>
          </div>
          <button class="delete-expense-btn" onclick="deleteExpense(${index})">×</button>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

async function deleteExpense(index) {
  if (!currentScheduleId) return;

  const schedule = schedules.find((s) => s.id === currentScheduleId);
  if (!schedule) return;

  const expenses = schedule.expenses || [];
  expenses.splice(index, 1);

  try {
    await db.collection("schedules").doc(currentScheduleId).update({
      expenses: expenses,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    await loadSchedules();
    renderExpensesList(expenses);
  } catch (error) {
    console.error("Error deleting expense:", error);
    alert("Failed to delete expense");
  }
}

// Expense Form Handler
document
  .getElementById("expenseForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!currentScheduleId) return;

    const description = document
      .getElementById("expenseDescription")
      .value.trim();
    const amount = document.getElementById("expenseAmount").value.trim();

    const schedule = schedules.find((s) => s.id === currentScheduleId);
    if (!schedule) return;

    const expenses = schedule.expenses || [];
    expenses.push({
      description: description,
      amount: parseFloat(amount),
      addedAt: new Date().toISOString(),
    });

    try {
      await db.collection("schedules").doc(currentScheduleId).update({
        expenses: expenses,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Track expense event
      if (analytics) {
        analytics.logEvent("expense_added", {
          vehicle_number: schedule.vehicleNumber,
          amount: amount,
        });
      }

      this.reset();
      await loadSchedules();
      renderExpensesList(expenses);
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Failed to add expense");
    }
  });

// Close modal when clicking outside
document.getElementById("expenseModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeExpenseModal();
  }
});

// Update Total Fare Function
async function updateBookingAmount() {
  if (!currentScheduleId) return;

  const newBookingAmount = document
    .getElementById("editBookingAmount")
    .value.trim();

  if (!newBookingAmount || parseFloat(newBookingAmount) < 0) {
    alert("Please enter a valid booking amount");
    return;
  }

  const schedule = schedules.find((s) => s.id === currentScheduleId);
  if (!schedule) return;

  try {
    await db
      .collection("schedules")
      .doc(currentScheduleId)
      .update({
        bookingAmount: parseFloat(newBookingAmount),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

    // Track booking update event
    if (analytics) {
      analytics.logEvent("booking_amount_updated", {
        vehicle_number: schedule.vehicleNumber,
        new_amount: newBookingAmount,
      });
    }

    //alert("✅ Booking amount updated successfully!");
    await loadSchedules();

    // Update the expenses list to show new profit/loss
    renderExpensesList(schedule.expenses || []);
  } catch (error) {
    console.error("Error updating booking amount:", error);
    alert("Failed to update booking amount");
  }
}

function calculateTotalExpenses(expenses) {
  if (!expenses || expenses.length === 0) return 0;
  return expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
}

function calculateProfitLoss(bookingAmount, expenses) {
  const totalExpenses = calculateTotalExpenses(expenses);
  const profitLoss = bookingAmount - totalExpenses;
  return {
    profitLoss: profitLoss,
    isProfit: profitLoss >= 0,
  };
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function showError(elementId, message) {
  const errorDiv = document.getElementById(elementId);
  errorDiv.textContent = message;
  errorDiv.classList.add("show");
  setTimeout(() => {
    errorDiv.classList.remove("show");
  }, 5000);
}

function showSuccess(elementId, message) {
  const successDiv = document.getElementById(elementId);
  successDiv.textContent = message;
  successDiv.classList.add("show");
  setTimeout(() => {
    successDiv.classList.remove("show");
  }, 3000);
}

// ========================================
// DATE INPUT SETUP
// ========================================
const today = new Date().toISOString().split("T")[0];
document.getElementById("fromDate").setAttribute("min", today);
document.getElementById("toDate").setAttribute("min", today);

document.getElementById("fromDate").addEventListener("change", function () {
  document.getElementById("toDate").setAttribute("min", this.value);
});

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

const searchInput = document.getElementById("searchVehicleNumber");

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.trim().toLowerCase();
  const filteredSchedules = getFilteredSchedules().filter((schedule) =>
    schedule.vehicleNumber.toLowerCase().includes(searchValue)
  );

  renderSchedules(filteredSchedules);
});

function isScheduleArchived(schedule) {
  const toDate = new Date(schedule.toDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  toDate.setHours(0, 0, 0, 0);
  return toDate < today;
}

function getFilteredSchedules() {
  if (currentTabFilter === "active") {
    return schedules.filter((schedule) => !isScheduleArchived(schedule));
  } else {
    return schedules.filter((schedule) => isScheduleArchived(schedule));
  }
}

function renderSchedules(filteredSchedules = null) {
  const container = document.getElementById("schedulesContainer");
  const baseSchedules = getFilteredSchedules();
  const schedulesToRender =
    filteredSchedules !== null ? filteredSchedules : baseSchedules;

  if (schedulesToRender.length === 0) {
    // Check if this is a search result or just empty schedules
    const searchInput = document.getElementById("searchVehicleNumber");
    const isActiveSearch = searchInput && searchInput.value.trim().length > 0;
    const isSearchResult = filteredSchedules !== null && isActiveSearch;

    const icon = isSearchResult
      ? "🔍"
      : currentTabFilter === "archived"
      ? "📅"
      : "📋";
    const message = isSearchResult
      ? "No schedules found matching your search!"
      : currentTabFilter === "archived"
      ? "No completed schedules yet!"
      : "No schedules yet. Add your first vehicle schedule above!";
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <div class="empty-state-message">${message}</div>
      </div>`;
    return;
  }

  container.innerHTML =
    '<div class="schedules-grid">' +
    schedulesToRender
      .map((schedule) => {
        const totalExpenses = calculateTotalExpenses(schedule.expenses || []);
        const bookingAmount = parseFloat(schedule.bookingAmount) || 0;
        const { profitLoss, isProfit } = calculateProfitLoss(
          bookingAmount,
          schedule.expenses || []
        );
        const isArchived = isScheduleArchived(schedule);
        const archiveClass = isArchived ? "archived" : "";

        return `
                    <div class="schedule-card ${archiveClass}">
                        ${
                          isArchived
                            ? '<div class="archived-badge">✓ Completed</div>'
                            : ""
                        }
                        <div class="vehicle-number">${
                          schedule.vehicleNumber
                        }</div>
                        <div class="date-range-display">
                            <div class="schedule-date">📅 From: ${formatDate(
                              schedule.fromDate
                            )}</div>
                            <div class="schedule-date">📅 To: ${formatDate(
                              schedule.toDate
                            )}</div>
                            <div class="schedule-date" style="margin-top: 5px; font-weight: 600;">Duration: ${calculateDuration(
                              schedule.fromDate,
                              schedule.toDate
                            )}</div>
                        </div>
                        <div class="passenger-details"><strong>Passenger Details: </strong>${
                          schedule.passengerDetails || "No details found"
                        }</div>
                        <div class="booking-amount-display">
                            <strong>Total Fare:</strong> ₹${bookingAmount.toFixed(
                              2
                            )}
                        </div>
                        <div class="schedule-notes-section">
                            <div class="schedule-notes-display" id="notes-display-${
                              schedule.id
                            }">${
          schedule.notes || "No notes added"
        }<button class="notes-edit-icon" onclick="toggleNotesEdit('${
          schedule.id
        }')">✎</button></div>
                            <textarea class="notes-textarea hidden" id="notes-textarea-${
                              schedule.id
                            }" placeholder="Add notes...">${
          schedule.notes || ""
        }</textarea>
                            <div class="notes-actions hidden" id="notes-actions-${
                              schedule.id
                            }">
                                <button class="btn-save-notes" onclick="saveNotes('${
                                  schedule.id
                                }')">Save</button>
                                <button class="btn-cancel-notes" onclick="cancelNotesEdit('${
                                  schedule.id
                                }')">Cancel</button>
                            </div>
                        </div>
                        <div class="expense-summary">
                            <strong>Total Expenses:</strong> ₹${totalExpenses.toFixed(
                              2
                            )}
                            ${
                              schedule.expenses && schedule.expenses.length > 0
                                ? `<span class="expense-count">(${
                                    schedule.expenses.length
                                  } item${
                                    schedule.expenses.length > 1 ? "s" : ""
                                  })</span>`
                                : ""
                            }
                        </div>
                        <div class="profit-loss-display ${
                          isProfit ? "profit" : "loss"
                        }">
                            <strong>${
                              isProfit ? "💰 Profit:" : "📉 Loss:"
                            }</strong> ₹${Math.abs(profitLoss).toFixed(2)}
                        </div>
                        <div class="action-buttons">
                            <button class="edit-btn" onclick="openExpenseModal('${
                              schedule.id
                            }')">Manage Expenses</button>
                            <button class="delete-btn" onclick="deleteSchedule('${
                              schedule.id
                            }')">Delete</button>
                        </div>
                    </div>
                `;
      })
      .join("") +
    "</div>";
}

// ========================================
// NOTES MANAGEMENT - INLINE EDITING
// ========================================
function toggleNotesEdit(scheduleId) {
  const display = document.getElementById(`notes-display-${scheduleId}`);
  const textarea = document.getElementById(`notes-textarea-${scheduleId}`);
  const actions = document.getElementById(`notes-actions-${scheduleId}`);
  const icon = document.querySelector(
    `[onclick="toggleNotesEdit('${scheduleId}')"]`
  );

  display.classList.toggle("hidden");
  textarea.classList.toggle("hidden");
  actions.classList.toggle("hidden");
  if (icon) icon.classList.toggle("hidden");

  if (!textarea.classList.contains("hidden")) {
    textarea.focus();
  }
}

function cancelNotesEdit(scheduleId) {
  const display = document.getElementById(`notes-display-${scheduleId}`);
  const textarea = document.getElementById(`notes-textarea-${scheduleId}`);
  const actions = document.getElementById(`notes-actions-${scheduleId}`);
  const icon = document.querySelector(
    `[onclick="toggleNotesEdit('${scheduleId}')"]`
  );

  display.classList.remove("hidden");
  textarea.classList.add("hidden");
  actions.classList.add("hidden");
  if (icon) icon.classList.remove("hidden");
}

async function saveNotes(scheduleId) {
  const textarea = document.getElementById(`notes-textarea-${scheduleId}`);
  const notes = textarea.value.trim();
  const schedule = schedules.find((s) => s.id === scheduleId);

  if (!schedule) return;

  try {
    await db.collection("schedules").doc(scheduleId).update({
      notes: notes,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // Track notes update event
    if (analytics) {
      analytics.logEvent("notes_updated", {
        vehicle_number: schedule.vehicleNumber,
      });
    }

    showSuccess("errorMessage", "✅ Notes updated successfully!");
    await loadSchedules();
  } catch (error) {
    console.error("Error updating notes:", error);
    showError("errorMessage", "❌ Failed to update notes");
  }
}

// ========================================
// TAB SWITCHING
// ========================================
document
  .getElementById("activeSchedulesTab")
  .addEventListener("click", function () {
    currentTabFilter = "active";
    document.getElementById("activeSchedulesTab").classList.add("active");
    document.getElementById("archivedSchedulesTab").classList.remove("active");
    document.getElementById("searchVehicleNumber").value = "";
    renderSchedules();
  });

document
  .getElementById("archivedSchedulesTab")
  .addEventListener("click", function () {
    currentTabFilter = "archived";
    document.getElementById("archivedSchedulesTab").classList.add("active");
    document.getElementById("activeSchedulesTab").classList.remove("active");
    document.getElementById("searchVehicleNumber").value = "";
    renderSchedules();
  });
