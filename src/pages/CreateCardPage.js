// src/pages/CreateCardPage.js
import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	TextareaAutosize,
	Typography,
	Checkbox,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

const CreateCardPage = ({ setAllBingoCards }) => {
	const defaultText = `
  Breaking Bad
  Dexter
  Game of Thrones
  The Walking Dead
  House of Cards
  Sherlock
  Lost
  House
  Orange is the New Black
  Parks and Recreation
  Friends
  The Sopranos
  The X-Files
  The Office
  Homeland
  Scrubs
  Sons of Anarchy
  Modern Family
  The Big Bang Theory
  Mad Men
  Arrested Development
  Downton Abbey
  The Wire
  Buffy the Vampire Slayer
  `;

	const [text, setText] = useState(defaultText);
	const [includeFreeSpace, setIncludeFreeSpace] = useState(true);
	const [numLinks, setNumLinks] = useState(2);
	const [templateBingoCard, setTemplateBingoCard] = useState([]); // New state for the template card
	const [allBingoCards, setLocalBingoCards] = useState([]);
	const [generatedLinks, setGeneratedLinks] = useState([]);

	// Handle changes in the textarea
	const handleChange = (event) => {
		setText(event.target.value);
	};

	// Handle checkbox change
	const handleCheckboxChange = (event) => {
		setIncludeFreeSpace(event.target.checked);
	};

	// Handle number of links change
	const handleNumLinksChange = (event) => {
		const value = Math.max(2, Math.min(10, Number(event.target.value))); // Clamp value between 2 and 10
		setNumLinks(value);
	};

	// Update the template Bingo card whenever text or checkbox changes
	useEffect(() => {
		let items = text
			.trim()
			.split("\n")
			.map((item) => item.trim())
			.filter((item) => item.length > 0);

		// Limit to the first 24 items and create a non-randomized card
		items = items.slice(0, 24);
		if (includeFreeSpace) {
			items.splice(12, 0, "Free Space");
		}
		setTemplateBingoCard(items.slice(0, 25)); // Update the template card
	}, [text, includeFreeSpace]); // Runs whenever the text or checkbox changes

	// Randomize items for a single Bingo card
	const generateBingoCard = (items) => {
		const shuffledItems = [...items].sort(() => Math.random() - 0.5);
		if (includeFreeSpace) {
			shuffledItems.splice(12, 0, "Free Space");
		}
		return shuffledItems.slice(0, 25);
	};

	// Generate links and randomize bingo cards when the button is clicked
	const handleGenerateBingoCards = () => {
		let items = text
			.trim()
			.split("\n")
			.map((item) => item.trim())
			.filter((item) => item.length > 0);

		items = items.slice(0, 24); // Limit to the first 24 items

		const newBingoCards = [];
		for (let i = 0; i < numLinks; i++) {
			newBingoCards.push(generateBingoCard(items));
		}

		setLocalBingoCards(newBingoCards);
		setAllBingoCards(newBingoCards); // Update the parent state

		const links = Array.from(
			{ length: numLinks },
			(_, index) => `/bingo/${index + 1}`
		);
		setGeneratedLinks(links);
	};

	return (
		<Box sx={{ display: "flex", p: 3 }}>
			<Box sx={{ flex: 1, pr: 2 }}>
				<Typography variant="h4" gutterBottom>
					Create a Bingo Card
				</Typography>
				<TextareaAutosize
					minRows={10}
					style={{ width: "100%" }}
					value={text}
					onChange={handleChange}
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={includeFreeSpace}
							onChange={handleCheckboxChange}
							color="primary"
						/>
					}
					label="Include Free Space"
					sx={{ mt: 2 }}
				/>
				<TextField
					label="How many links?"
					type="number"
					value={numLinks}
					onChange={handleNumLinksChange}
					inputProps={{ min: 2, max: 10 }}
					sx={{ mt: 2, width: "100%" }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleGenerateBingoCards} // Call the link generation function on click
					sx={{ mt: 2 }}
				>
					Generate Bingo Cards
				</Button>
				{/* Display links to the generated Bingo cards */}
				<Box sx={{ mt: 2 }}>
					{generatedLinks.map((link, index) => (
						<Box key={index}>
							<Link to={link}>Bingo Card #{index + 1}</Link>
						</Box>
					))}
				</Box>
			</Box>

			{/* Right side: Static Bingo card template preview */}
			<Box sx={{ flex: 1, pl: 2 }}>
				<Typography variant="h5" gutterBottom>
					Your Bingo Card
				</Typography>
				<Grid container spacing={1}>
					{templateBingoCard.length > 0 &&
						templateBingoCard.map((item, index) => (
							<Grid item xs={2.4} key={index}>
								<Paper sx={{ p: 2, textAlign: "center" }}>{item}</Paper>
							</Grid>
						))}
				</Grid>
			</Box>
		</Box>
	);
};

export default CreateCardPage;
