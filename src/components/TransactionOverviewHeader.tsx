import React, { useState } from 'react';
import { Stack, Button, Menu, MenuItem } from '@mui/material';
import SearchField from './searchField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface TransactionOverviewProps {
  header: string; // Prop to accept the header text
}

const TransactionOverview: React.FC<TransactionOverviewProps> = ({ header }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [dropdownLabel, setDropdownLabel] = useState<{ [key: string]: string }>({
    Date: 'Select Date',
    Type: 'Select Type',
    Status: 'Select Status',
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, menuType: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(menuType);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMenu('');
  };

  const handleMenuItemClick = (menuType: string, option: string) => {
    setDropdownLabel({ ...dropdownLabel, [menuType]: option });
    handleMenuClose();
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      <div className="w-full text-xl bold">{header}</div> {/* Dynamic header */}

      {/* Search Field */}
      <SearchField />

      {/* Dropdowns */}
      {['Date', 'Type', 'Status'].map((menuType) => (
        <div key={menuType}>
          <Button
            onClick={(event) => handleMenuOpen(event, menuType)}
            variant="text"
            size="small"
            endIcon={<ArrowDropDownIcon />}
            style={{ textTransform: 'none', color: 'gray' }} // Set button text color to gray
          >
            {dropdownLabel[menuType]}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={selectedMenu === menuType}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {menuType === 'Date' && (
              <>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Today')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Today
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Yesterday')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Yesterday
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Week')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Week
                </MenuItem>
              </>
            )}
            {menuType === 'Type' && (
              <>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Airtime')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Airtime
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Subscription')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Subscription
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Electricity')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Electricity
                </MenuItem>
              </>
            )}
            {menuType === 'Status' && (
              <>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Sent')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Sent
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Failed')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Failed
                </MenuItem>
                <MenuItem
                  onClick={() => handleMenuItemClick(menuType, 'Status 3')}
                  sx={{ color: 'gray' }} // Set menu item text color to gray
                >
                  Status 3
                </MenuItem>
              </>
            )}
          </Menu>
        </div>
      ))}
    </Stack>
  );
};

export default TransactionOverview;
