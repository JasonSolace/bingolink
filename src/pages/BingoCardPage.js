// src/pages/BingoCardPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";

const BingoCardPage = ({ allBingoCards }) => {
	const { id } = useParams(); // Get the card ID from the URL
	const cardIndex = parseInt(id, 10) - 1; // Convert to zero-based index
	const bingoCard = allBingoCards[cardIndex]; // Retrieve the correct Bingo card

	if (!bingoCard) {
		return (
			<Box sx={{ p: 3 }}>
				<Typography variant="h5">Bingo card not found.</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				Bingo Card #{id}
			</Typography>
			<Grid container spacing={1}>
				{bingoCard.map((item, index) => (
					<Grid item xs={2.4} key={index}>
						<Paper sx={{ p: 2, textAlign: "center" }}>{item}</Paper>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default BingoCardPage;
