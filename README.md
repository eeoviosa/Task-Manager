# 📋 TaskMaster – Expo Task Manager App

TaskMaster is a mobile task management app built with **React Native (Expo)**. It allows users to add, view, and organize tasks using a clean calendar interface, time grouping, and status indicators.

---

## 🚀 Features

- ✅ Add and view tasks by date
- 🕒 Tasks grouped by start time
- 📅 Scrollable calendar with dynamic date selection
- 🏷️ Status tags for each task
- 🔄 Smooth navigation using Expo Router

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/eeoviosa/task_manager.git
cd task_manager
```

### 2. Install Dependencies
Make sure you have [Node.js](https://nodejs.org) and [Expo CLI](https://docs.expo.dev/get-started/installation/) installed:
```bash
npm install
```

### 3. Start the App
```bash
npx expo start
```

Scan the QR code using **Expo Go** on your mobile device.

---

## 🧑‍💻 Project Structure

```
task_manager/
├── app/                    # Screens and routes (expo-router)
│   ├── (tabs)/             # Tab navigation views
│   ├── welcome.tsx         # Welcome screen
│   └── _layout.tsx         # Root layout
├── assets/                 # Images, fonts, and icons
├── context/                # TaskContext for global state
├── constants/              # Icon and image exports
├── app.json                # App configuration
├── eas.json                # EAS build profiles
├── tailwind.config.js      # Nativewind/Tailwind setup
└── README.md               # You're here!
```

---

## 📱 How It Works

### 1. Welcome Screen
- Splash-style welcome screen with logo and "Get Started" button.

### 2. Calendar View
- Horizontal scrollable calendar with active date highlighting.
- Tasks are filtered by selected date.

### 3. Task View
- Tasks are grouped by their `fromTime` (e.g., `09:00 AM`)
- Each group displays:
  - Task description
  - Time range
  - Status tag (e.g., “In Progress”)

### 4. Add Task
- Navigate to **Add Task** screen to input description, time, and status.

---

## ⚙️ Development Tools

- **React Native**
- **Expo Router**
- **NativeWind / Tailwind CSS**
- **Day.js** for date/time formatting
- **EAS Build** for testing APK

---

## 🛠 Build APK (Optional)

If you want to build the app for testing:

```bash
eas build --platform android --profile preview
```

This will generate a downloadable `.apk` file for Android.

> Requires Expo account + Git installed

---

## 📄 License

This project is for educational use. Feel free to fork or build on top of it!

---

## 🤝 Contact

Built by **Emmanuel Oviosa**  
📧 oviosae13@gmail.com  
📍 McKinney, TX
