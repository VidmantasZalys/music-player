import "../src/styles/App.scss";
import Player from "../src/components/Player";
import Song from "../src/components/Song";
import data from "../src/util";
import { useState } from "react";
import Library from "./components/Library";

function App() {
	//duomenys is data failo uzkelimas ant state
	const [songs, setSong] = useState(data());

	//dainos ekstraktinimas i state ir panaudojimas Song komponente
	const [currentSong, setCurrentSong] = useState(songs[3]);

	//state ar audio groja tikrinimui
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className="App">
			<Song currentSong={currentSong} />
			<Player
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
			<Library songs={songs} />
		</div>
	);
}

export default App;
