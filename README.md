# 📋 TaskMaster – Expo Task Manager App

**TaskMaster** is a mobile task management application built with **React Native (Expo)**. It enables users to add, view, and organize tasks using a clean, scrollable calendar interface, with time grouping and status indicators for better productivity and clarity.

---

## 🚀 Features

- ✅ Add and view tasks by selected date  
- 🕒 Tasks grouped by start time  
- 📅 Scrollable calendar with dynamic date highlighting  
- 🏷️ Status tags to indicate task progress  
- 🔄 Seamless navigation using Expo Router  

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

Then scan the QR code using **Expo Go** on your mobile device.

---

## 🧑‍💻 Project Structure

```
task_manager/
├── app/                    # Screens and routes (expo-router)
│   ├── (tabs)/             # Tab navigation views
│   ├── welcome.tsx         # Welcome screen
│   └── _layout.tsx         # Root layout
├── assets/                 # Images, fonts, and icons
├── context/                # Global TaskContext provider
├── constants/              # Icon and image constants
├── app.json                # App configuration file
├── eas.json                # EAS build profiles
├── tailwind.config.js      # NativeWind/Tailwind CSS config
└── README.md               # This file
```

---

## 📱 App Flow Overview

### 🔹 Welcome Screen  
- Branding splash with a "Get Started" call-to-action.

### 🔹 Calendar View  
- Horizontal, scrollable calendar  
- Highlights the selected date  
- Displays tasks filtered by date  

### 🔹 Task View  
- Tasks are grouped by their `fromTime` (e.g., "09:00 AM")  
- Each task displays:
  - Description  
  - Time range  
  - Status tag  

### 🔹 Add Task  
- Navigate to a dedicated screen to:
  - Input description  
  - Select start/end time  
  - Choose status tag  

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **Expo Router**
- **NativeWind / Tailwind CSS**

---

## 📚 Third-Party Libraries

- `dayjs` – Lightweight date/time parsing and formatting  
- `react-native-modal-datetime-picker` – Modal UI for picking dates and times  
- `@react-native-community/datetimepicker` – Native picker for iOS and Android  
- `NativeWind` – Tailwind utility classes for React Native  

---

## 📄 License

This project is intended for educational and demo purposes.  
Feel free to fork, contribute, or build upon it!

---

## 🤝 Contact

Built by **Emmanuel Oviosa**  
📧 [oviosae13@gmail.com](mailto:oviosae13@gmail.com)  
📍 McKinney, TX  
