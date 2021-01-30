import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
	faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
	isPlaying,
	setIsPlaying,
	audioRef,
	setSongInfo,
	songInfo,
}) => {
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

	return (
		<div className="player">
			<div className="time-control">
				<p>{getTaime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration || 0}
					type="range"
					value={songInfo.currentTime}
					onChange={dragHanlder}
				/>
				<p>{getTaime(songInfo.duration)}</p>
			</div>
			<div className="play-control">
				<FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
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
				/>
			</div>
		</div>
	);
};

export default Player;
