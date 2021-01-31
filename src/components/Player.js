import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";
const Player = ({
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
	setCurrentSong,
	currentSong,
	songs,
	setSongs,
}) => {
	//effect
	useEffect(() => {
		const newSongs = songs.map((song) => {
			if (song.id === currentSong.id) {
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
		setSongs(newSongs);
	}, [currentSong]);

	//audio laikrodzio formatavimas mm:ss formatu
	const getTaime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	//eventai
	//paspaudus atnaujina isPlaying state is false i true ir atvirksciai ir pagal contindition state paleidzia arba sustapdo audio
	const playSongHandler = () => {
		//console.log(audioRef.current.pause());
		isPlaying ? audioRef.current.pause() : audioRef.current.play();
		setIsPlaying(!isPlaying);
	};

	//dragintant input atnaujina laika ir prasuka audio
	const dragHanlder = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};
	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		}
		if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};
	//add styles
	const trackanim = {
		transform: `translateX(${songInfo.animationProc}%)`,
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTaime(songInfo.currentTime)}</p>
				<div
					style={{
						background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
					}}
					className="track"
				>
					<input
						min={0}
						max={songInfo.duration || 0}
						type="range"
						value={songInfo.currentTime}
						onChange={dragHanlder}
					/>
					<div style={trackanim} className="animate-track"></div>
				</div>

				<p>{songInfo.duration ? getTaime(songInfo.duration) : "00:00"}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back"
					size="2x"
					icon={faAngleLeft}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
					onClick={() => skipTrackHandler("skip-forward")}
				/>
			</div>
		</div>
	);
};

export default Player;
