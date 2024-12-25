import React from 'react';
import { Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchField from './searchField';

interface TransactionOverviewProps {
  header: string; // Prop to accept the header text
}

const TransactionOverview: React.FC<TransactionOverviewProps> = ({ header }) => {
  const [value] = React.useState('');

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <div className="w-full text-xl bold">{header}</div> {/* Dynamic header */}
      
      {/* Search Field */}
      <SearchField />

      {/* Select Dropdowns */}
      <FormControl style={{ minWidth: 100 }} size="small" variant="outlined">
        <InputLabel id="select-date-label">Date</InputLabel>
        <Select
          labelId="select-date-label"
          id="select-date"
          value={value}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="yesterday">Yesterday</MenuItem>
          <MenuItem value="week">Week</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{ minWidth: 100 }} size="small" variant="outlined">
        <InputLabel id="select-type-label">Type</InputLabel>
        <Select
          labelId="select-type-label"
          id="select-type"
          value={value}
        >
          <MenuItem value="type1">Type 1</MenuItem>
          <MenuItem value="type2">Type 2</MenuItem>
          <MenuItem value="type3">Type 3</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={{ minWidth: 100 }} size="small" variant="outlined">
        <InputLabel id="select-status-label">Status</InputLabel>
        <Select
          labelId="select-status-label"
          id="select-status"
          value={value}
        >
          <MenuItem value="status1">Status 1</MenuItem>
          <MenuItem value="status2">Status 2</MenuItem>
          <MenuItem value="status3">Status 3</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default TransactionOverview;
