import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, setIsPlaying, isPlaying }) => {
	//referencai
	const audioRef = useRef(null);

	//eventai
	const playSongHandler = () => {
		const audioPause = audioRef.current[0];
		console.log(audioPause);
		isPlaying ? audioPause.pause() : audioRef.current.play();
		setIsPlaying((prevIsPlaying) => {
			prevIsPlaying = true;
		});
	};

	return (
		<div className="player">
			<div className="time-control">
				<p>Start Time</p>
				<input type="range" name="" id="" />
				<p>End Time</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					size="2x"
					icon={faPlay}
				/>
				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
			<audio ref={audioRef} src={currentSong.audio}></audio>
		</div>
	);
};

export default Player;
