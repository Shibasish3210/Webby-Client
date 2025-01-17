import { useState } from "react";

const Counter = () => {
	const [counter, setCounter] = useState(-1);

	const createInterval = () => {
		let timerInterval;
		timerInterval = setInterval(() => {
			setCounter((prev) => prev - 1);
		}, 1000);
		setTimeout(() => {
			let timer = timerInterval;
			clearInterval(timer);
		}, 11000);
	};

	return (
		<>
			<div>Hello Counter;</div>
			{counter >= 0 && <div>{counter + " seconds"}</div>}
			<button
				onClick={() => {
					setCounter(10);
					createInterval();
				}}
			>
				Send
			</button>
		</>
	);
};

export default Counter;
