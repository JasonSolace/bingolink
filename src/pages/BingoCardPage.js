// src/pages/BingoCardPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";

const BingoCardPage = ({ allBingoCards }) => {
	const { id } = useParams(); // Get the card ID from the URL
	const cardIndex = parseInt(id, 10) - 1; // Convert to zero-based index
	const bingoCard = allBingoCards[cardIndex]; // Retrieve the correct Bingo card

	// State to track which squares are marked
	const [markedSquares, setMarkedSquares] = useState(Array(25).fill(false));

	if (!bingoCard) {
		return (
			<Box sx={{ p: 3 }}>
				<Typography variant="h5">Bingo card not found.</Typography>
			</Box>
		);
	}

	// Handle marking a square
	const handleSquareClick = (index) => {
		const updatedMarks = [...markedSquares];
		updatedMarks[index] = !updatedMarks[index]; // Toggle the marked state
		setMarkedSquares(updatedMarks);
	};

	// Handle reset button click
	const handleReset = () => {
		setMarkedSquares(Array(25).fill(false)); // Reset all squares to unmarked
	};

	return (
		<Box sx={{ p: 3 }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: 2,
				}}
			>
				<Typography variant="h4" gutterBottom>
					Bingo Card #{id}
				</Typography>
				<Button variant="contained" color="secondary" onClick={handleReset}>
					RESET
				</Button>
			</Box>
			<Grid container spacing={1}>
				{bingoCard.map((item, index) => (
					<Grid item xs={2.4} key={index}>
						<Paper
							sx={{
								p: 2,
								textAlign: "center",
								cursor: "pointer",
								backgroundColor: markedSquares[index] ? "lightcoral" : "white",
								color: markedSquares[index] ? "white" : "black",
							}}
							onClick={() => handleSquareClick(index)}
						>
							{markedSquares[index] ? "X" : item}
						</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default BingoCardPage;
