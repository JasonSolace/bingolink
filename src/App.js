// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateCardPage from "./pages/CreateCardPage";
import BingoCardPage from "./pages/BingoCardPage";

const App = () => {
	const [allBingoCards, setAllBingoCards] = useState([]);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
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
