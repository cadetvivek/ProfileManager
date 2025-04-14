import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser } from './redux/actions';
import UserCard from './components/UserCard';
import AddUserForm from './components/AddUserForm';
import EditUserModal from './components/EditUserModal';
import SearchAndFilter from './components/SearchAndFilter';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  // Redux setup
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  
  // Local storage hook
  const [storedUsers, setStoredUsers] = useLocalStorage('users', []);
  
  // Local state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    languages: '',
    education: '',
    specialization: ''
  });
  
  // Extract unique filter options from users
  const extractFilterOptions = () => {
    const options = {
      languages: [],
      education: [],
      specialization: []
    };
    
    users.forEach(user => {
      // Handle languages (comma-separated)
      if (user.languages) {
        const languageArray = user.languages.split(',').map(lang => lang.trim());
        languageArray.forEach(lang => {
          if (!options.languages.includes(lang) && lang) {
            options.languages.push(lang);
          }
        });
      }
      
      // Handle education
      if (user.education && !options.education.includes(user.education)) {
        options.education.push(user.education);
      }
      
      // Handle specialization
      if (user.specialization) {
        const specializationArray = user.specialization.split(',').map(spec => spec.trim());
        specializationArray.forEach(spec => {
          if (!options.specialization.includes(spec) && spec) {
            options.specialization.push(spec);
          }
        });
      }
    });
    
    return {
      languages: options.languages.sort(),
      education: options.education.sort(),
      specialization: options.specialization.sort()
    };
  };
  
  // Load users from localStorage on initial render
  useEffect(() => {
    if (storedUsers.length > 0 && users.length === 0) {
      dispatch(setUsers(storedUsers));
    }
  }, [dispatch, storedUsers, users.length]);
  
  // Update localStorage when Redux state changes
  useEffect(() => {
    if (users.length > 0) {
      setStoredUsers(users);
    }
  }, [users, setStoredUsers]);
  
  const handleEditUser = (user) => {
    setEditingUser(user);
  };
  
  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId));
    }
  };
  
  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: value
    }));
  };
  
  // Filter and search users
  const filteredUsers = users.filter(user => {
    // Search term filtering
    const searchMatch = 
      searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.specialization && user.specialization.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filtering
    const languageMatch = 
      filters.languages === '' || 
      (user.languages && user.languages.toLowerCase().includes(filters.languages.toLowerCase()));
    
    const educationMatch = 
      filters.education === '' || 
      (user.education && user.education === filters.education);
    
    const specializationMatch = 
      filters.specialization === '' || 
      (user.specialization && user.specialization.toLowerCase().includes(filters.specialization.toLowerCase()));
    
    return searchMatch && languageMatch && educationMatch && specializationMatch;
  });
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>Advanced Profile Manager</h1>
        <button 
          className="add-user-button"
          onClick={() => setShowAddForm(true)}
        >
          Add User
        </button>
      </header>
      
      <SearchAndFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        availableFilters={extractFilterOptions()}
      />
      
      {filteredUsers.length === 0 ? (
        <div className="no-results">
          <p>No users found matching your search criteria.</p>
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      )}
      
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddUserForm onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
      
      {editingUser && (
        <EditUserModal 
          user={editingUser} 
          onClose={() => setEditingUser(null)} 
        />
      )}
    </div>
  );
}

export default App;