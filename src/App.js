import "../src/styles/App.scss";
import Player from "../src/components/Player";
import Song from "../src/components/Song";
import data from "../src/util";
import { useState } from "react";

function App() {
	const [song, setSong] = useState(() => data());
	const [currentSong, setCurrentSong] = useState(song[1]);
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<div className="App">
			<Song currentSong={currentSong} />
			<Player
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
		</div>
	);
}

export default App;
