const LibrarySong = ({
	song,
	setCurrentSong,
	audioRef,
	isPlaying,
	songs,
	setSongs,
	id,
}) => {
	const songSelectHandler = async () => {
		//const selectedSong = songs.filter((state) => state.id === id);
		await setCurrentSong(song);

		//paiima atskirai song objekta is visu ir active nustato true arba false
		const newSongs = songs.map((song) => {
			if (song.id === id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		//console.log(song);
		//console.log(audioRef);
		//audioRef.current.play();
		setSongs(newSongs);
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${song.active ? "selected" : ""}`}
		>
			<img src={song.cover} alt={song.name} />
			<div className="song-description">
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
