import React, { useState, useEffect } from 'react';
import SucculentList from './SucculentList';
import './App.css';
import { succulents } from './succulents';
import { TextField, Select, MenuItem, FormControl, InputLabel, Box, Button } from '@mui/material';

function App() {
  const [succulentData, setSucculentData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSucculentData(succulents);
  }, []);

  useEffect(() => {
    setCategories(generateCategories());
  }, []);

  useEffect(() => {
    filterSucculents(searchInput, selectedCategory);
  }, [searchInput, selectedCategory]);

  const generateCategories = () => {
    return Array.from(
      new Set(succulents.flatMap((succulent) => succulent.basic.category))
    );
  };

  const filterSucculents = (searchTerm, category) => {
    let filtered = succulents;

    if (searchTerm) {
      filtered = filtered.filter((succulent) =>
        succulent.pid.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((succulent) =>
        succulent.basic.category.includes(category)
      );
    }

    setSucculentData(filtered);
  };

  const createCategoryMenuItems = () => {
    return categories.map((category) => {
      return <MenuItem value={category}>{category}</MenuItem>;
    });
  };

  const handleCategorySelect = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearCategory = () => {
    setSelectedCategory('');
  };

  return (
    <div className='main-content'>
      <div className='header-bar'>
        <Box>
          <h1>Succulents</h1>
          <FormControl>
            <TextField
              label="Search By Name"
              variant="outlined"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <FormControl>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategorySelect}
                label="Category"
                labelId="category-label"
              >
                {createCategoryMenuItems()}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={clearCategory}>
              Clear
            </Button>
          </FormControl>
        </Box>
      </div>

      <SucculentList succulents={succulentData} />
    </div>
  );
}

export default App;
