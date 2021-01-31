import "../src/styles/App.scss";
import Player from "../src/components/Player";
import Song from "../src/components/Song";
import data from "../src/util";
import { useState, useRef } from "react";
import Library from "./components/Library";

import Nav from "./components/Nav";

function App() {
	//audio info state (laikas)
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});

	//referencai paiimti audio komponenta
	const audioRef = useRef(null);

	//duomenys is data failo uzkelimas ant state
	const [songs, setSongs] = useState(data());

	//dainos ekstraktinimas i state ir panaudojimas Song komponente
	const [currentSong, setCurrentSong] = useState(songs[3]);

	//state ar audio groja tikrinimui
	const [isPlaying, setIsPlaying] = useState(false);

	//biblej atidarymo state
	const [libraryStatus, setLibraryStatus] = useState(false);

	//audio laiko atnaujinimas state'e | paiimi koks buvo anksciau ir atnaujina i esama. taip pat event objekto istraukiama audio esamas laikas ir audio trukme
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};
	return (
		<div className="App">
			<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				setCurrentSong={setCurrentSong}
				songs={songs}
			/>
			<Library
				songs={songs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
			/>
			<audio
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);
}

export default App;
