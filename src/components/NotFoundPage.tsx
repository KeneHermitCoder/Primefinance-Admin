import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="h1" component="div" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={goBackHome}>
        Go Back Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;