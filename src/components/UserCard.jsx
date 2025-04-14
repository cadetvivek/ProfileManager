import React from 'react';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
  const { name, email, description, languages, education, specialization, twitter, instagram, imageUrl } = user;
  
  // Default placeholder image if imageUrl is not provided
  const defaultImage = "https://via.placeholder.com/150";
  
  return (
    <div className="user-card">
      <img 
        src={imageUrl || defaultImage} 
        alt={`${name}'s profile`} 
        className="user-image"
        onError={(e) => {e.target.src = defaultImage}}
      />
      <div className="user-info">
        <h3>{name}</h3>
        <p className="user-email">{email}</p>
        <p className="user-description">{description}</p>
        
        <div className="user-details">
          {languages && (
            <div className="detail-item">
              <strong>Languages:</strong> {languages}
            </div>
          )}
          
          {education && (
            <div className="detail-item">
              <strong>Education:</strong> {education}
            </div>
          )}
          
          {specialization && (
            <div className="detail-item">
              <strong>Specialization:</strong> {specialization}
            </div>
          )}
        </div>
        
        <div className="user-social">
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-link">
              Twitter
            </a>
          )}
          
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="social-link">
              Instagram
            </a>
          )}
        </div>
        
        <div className="user-actions">
          <button onClick={() => onEdit(user)} className="edit-button">
            Edit
          </button>
          <button onClick={() => onDelete(user.id)} className="delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;