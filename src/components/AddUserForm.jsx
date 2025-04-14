import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/actions';
import './AddUserForm.css';

const AddUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    languages: '',
    education: '',
    specialization: '',
    twitter: '',
    instagram: '',
    imageUrl: ''
  });
  
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    // Only validate URLs if they are provided
    if (formData.twitter && !formData.twitter.includes('x.com')) {
      newErrors.twitter = 'Please enter a valid Twitter X URL';
    }
    
    if (formData.instagram && !formData.instagram.includes('instagram.com')) {
      newErrors.instagram = 'Please enter a valid Instagram URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addUser(formData));
      onClose();
    }
  };
  
  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="languages">Languages (comma-separated)</label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="education">Education</label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="specialization">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="twitter">Twitter URL</label>
          <input
            type="url"
            id="twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className={errors.twitter ? 'error' : ''}
          />
          {errors.twitter && <span className="error-message">{errors.twitter}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="instagram">Instagram URL</label>
          <input
            type="url"
            id="instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            className={errors.instagram ? 'error' : ''}
          />
          {errors.instagram && <span className="error-message">{errors.instagram}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">Profile Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-buttons">
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;