import React from "react";
import { Box, Alert, Button } from "@mui/material";

interface ErrorComponentProps {
  message?: string;
  onRetry?: () => void;
}

const TableErrorComponent: React.FC<ErrorComponentProps> = ({ message, onRetry }) => {
  return (
    <Box
      display="flex"
      gap={2}
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
      p={3}
      bgcolor="white"
      borderRadius={2}
      boxShadow={1}
      className='flex-col md:flex-row justify-center items-center'
    >
      <Alert severity="error" sx={{ textAlign: "center", width: "100%" }}>
        {message}
      </Alert>
      {onRetry && (
        <Button variant="contained" color="primary" onClick={onRetry} className="self-end md:self-center">
          Retry
        </Button>
      )}
    </Box>
  );
};

export default TableErrorComponent;