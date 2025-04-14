🚀 Advanced Profile Manager
A powerful and dynamic ReactJS web application to manage and maintain user profiles with ease. This project uses Redux for state management and a custom useLocalStorage hook for data persistence, offering seamless features like adding, viewing, editing, searching, and filtering profiles.

🔗 Live Demo
Click here to try the live app

📌 Features
✅ Add New Profiles
Users can add detailed profiles, including name, email, description, languages, education, specialization, and social media links.

✅ View All Profiles
All profiles are displayed in a clean card-style layout with profile images and social media buttons.

✅ Edit & Delete Profiles
Edit user details using a pre-filled form or delete profiles instantly.

✅ Real-time Search
Search through profiles using keywords from name, email, description, or specialization.

✅ Advanced Filtering
Filter profiles based on languages, education, or specialization using drop-down selectors.

✅ Persistent Data
All data is saved to localStorage via a custom React hook to retain changes across sessions.

✅ Modular & Clean Codebase
Built with reusable components and organized Redux state.

🧠 Tech Stack
React (JSX)

Redux (State Management)

Custom Hook for localStorage

Plain CSS for styling

Vite for fast dev environment

📁 Project Structure
css
Copy
Edit
src/
├── components/
│   ├── AddUserForm.jsx
│   ├── EditUserModal.jsx
│   ├── SearchAndFilter.jsx
│   └── UserCard.jsx
├── redux/
│   ├── actions.js
│   ├── reducer.js
│   └── store.js
├── hooks/
│   └── useLocalStorage.js
├── App.jsx
└── index.js
🛠️ Getting Started
bash
Copy
Edit
# Clone the repository
git clone https://github.com/cadetvivek/ProfileManager.git

# Navigate into the project directory
cd ProfileManager

# Install dependencies
npm install

# Start the dev server
npm run dev
