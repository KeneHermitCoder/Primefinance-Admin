import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ITEM_HEIGHT = 48;

export default function DropDownSelect({
  label,
  options,
  onSelected,
}: {
  label: string;
  options: any[];
  onSelected?: (item: string, label: string) => void;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedItem, setSelectedItem] = React.useState<string>(options[0]);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <div className="flex max-w-[70px] truncate text-sm">{selectedItem}</div>
        <KeyboardArrowDownIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={(e) => {
              setSelectedItem(option);
              if (onSelected) onSelected((e.target as HTMLElement).innerText, label);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
