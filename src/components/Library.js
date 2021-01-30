import LibrarySong from "./LibrarySong";

const Library = ({
	songs,
	setCurrentSong,
	audioRef,
	isPlaying,
	setSongs,
	libraryStatus,
}) => {
	//songs.map((songa) => console.log(songa));
	//console.log(audioRef);
	return (
		<div className={`library ${libraryStatus ? "active-library" : ""}`}>
			<h2>Library</h2>
			<div className="library-songs">
				{songs.map((song) => (
					<LibrarySong
						setCurrentSong={setCurrentSong}
						song={song}
						key={song.id}
						audioRef={audioRef}
						isPlaying={isPlaying}
						songs={songs}
						setSongs={setSongs}
						id={song.id}
					/>
				))}
			</div>
		</div>
	);
};

export default Library;
