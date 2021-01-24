import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {
	faAngleLeft,
	faAngleRight,
	faPlay,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
	//audio info state (laikas)
	const [songInfo, setSongInfo] = useState({
		currentTime: null,
		duration: null,
	});

	//referencai paiimti audio komponenta
	const audioRef = useRef(null);

	//audio laikrodzio formatavimas mm:ss formatu
	const getTaime = (time) => {
		return (
			Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};

	//eventai
	//paspaudus atnaujina isPlaying state is false i true ir atvirksciai ir pagal contindition state paleidzia arba sustapdo audio
	const playSongHandler = () => {
		console.log(audioRef.current.pause());
		isPlaying ? audioRef.current.pause() : audioRef.current.play();
		setIsPlaying(!isPlaying);
	};

	//audio laiko atnaujinimas state'e | paiimi koks buvo anksciau ir atnaujina i esama. taip pat event objekto istraukiama audio esamas laikas ir audio trukme
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};

	//dragintant input atnaujina laika ir prasuka aidio
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
					max={songInfo.duration}
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
					icon={faPlay}
				/>
				<FontAwesomeIcon
					className="skip-forward"
					size="2x"
					icon={faAngleRight}
				/>
			</div>
			<audio
				onLoadedMetadata={timeUpdateHandler}
				onTimeUpdate={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			></audio>
		</div>
	);
};

export default Player;
