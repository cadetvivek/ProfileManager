import React from 'react';
import './SearchAndFilter.css';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFilterChange,
  availableFilters 
}) => {
  const { languages, education, specialization } = availableFilters;

  const handleFilterChange = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, description..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filters-container">
        <div className="filter-group">
          <label>Languages:</label>
          <select 
            value={filters.languages || ''} 
            onChange={(e) => handleFilterChange('languages', e.target.value)}
            className="filter-select"
          >
            <option value="">All Languages</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>{language}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Education:</label>
          <select 
            value={filters.education || ''} 
            onChange={(e) => handleFilterChange('education', e.target.value)}
            className="filter-select"
          >
            <option value="">All Education</option>
            {education.map((edu, index) => (
              <option key={index} value={edu}>{edu}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Specialization:</label>
          <select 
            value={filters.specialization || ''} 
            onChange={(e) => handleFilterChange('specialization', e.target.value)}
            className="filter-select"
          >
            <option value="">All Specializations</option>
            {specialization.map((spec, index) => (
              <option key={index} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        
        {(filters.languages || filters.education || filters.specialization) && (
          <button 
            onClick={() => {
              onFilterChange('languages', '');
              onFilterChange('education', '');
              onFilterChange('specialization', '');
            }}
            className="clear-filters-button"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;