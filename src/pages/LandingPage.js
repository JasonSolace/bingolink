// src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";

const LandingPage = () => {
	const navigate = useNavigate();

	const handleCreateClick = () => {
		navigate("/create"); // Redirect to the create page
	};

	return (
		<Box sx={{ p: 3, textAlign: "center" }}>
			<Typography variant="h3" gutterBottom>
				Welcome to BingoLink!
			</Typography>
			<Button variant="contained" color="primary" onClick={handleCreateClick}>
				Create a New Bingo Game
			</Button>
		</Box>
	);
};

export default LandingPage;
