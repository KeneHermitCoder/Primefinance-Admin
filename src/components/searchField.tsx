import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchField: React.FC = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          backgroundColor: '#fff', // Gray background
          borderRadius: '25px',      // Rounded borders
          height: '30px',
          marginRight: '20px'
        },
      }}
    />
  );
};

export default SearchField;
