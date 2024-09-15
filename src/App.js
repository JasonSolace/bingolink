// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCardPage from "./pages/CreateCardPage";
import LandingPage from "./pages/LandingPage"; // Make sure this import is correct
import BingoCardPage from "./pages/BingoCardPage"; // If you have this component

const App = () => {
	const [allBingoCards, setAllBingoCards] = useState([]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route
					path="/create"
					element={<CreateCardPage setAllBingoCards={setAllBingoCards} />}
				/>
				<Route
					path="/bingo/:id"
					element={<BingoCardPage allBingoCards={allBingoCards} />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
