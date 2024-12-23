import React from 'react';
import { Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchField from './searchField';


const TransactionOverview: React.FC = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <div className="w-full text-xl">Transaction Overview</div>
      
      {/* Search Field */}
      <SearchField />

      {/* Select Dropdown */}
      <FormControl style={{ minWidth: 120}}>
        <InputLabel id="demo-simple-select-label">Date</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          
        //   onChange={handleChange}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value={20}>Yesterday</MenuItem>
          <MenuItem value={30}>Week</MenuItem>
        </Select>
      </FormControl>

      {/* Select Dropdown */}
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
        //   onChange={handleChange}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value={20}>Yesterday</MenuItem>
          <MenuItem value={30}>Week</MenuItem>
        </Select>
      </FormControl>

      {/* Select Dropdown */}
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
        //   onChange={handleChange}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value={20}>Yesterday</MenuItem>
          <MenuItem value={30}>Week</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default TransactionOverview;
