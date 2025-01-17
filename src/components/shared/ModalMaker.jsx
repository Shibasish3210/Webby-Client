import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { closeModal } from "../../reduxToolkit/slices/modal/modalSlice";
const ModalMaker = ({
	modalTitle,
	modalDesc,
	del = true,
	isModal = true,
	children,
}) => {
	const { modalInputs, modalButtons, modalFooter } = children;
	const fontColor = del ? "text-red-400" : "text-green-400";
	const textCenter = !isModal ? "text-center w-full" : "";
	const dispatch = useDispatch();

	useEffect(() => {
		const func = (e) => {
			if (e.key === "Escape") dispatch(closeModal());
		};
		window.addEventListener("keydown", func);

		return () => {
			window.removeEventListener("keydown", func);
		};
	}, []);
	return (
		<>
			<div className="modal-top">
				<h1 className={`modal-top-font tracking-wide ${textCenter}`}>
					{modalTitle}
				</h1>
				{isModal && (
					<IoClose
						className="modal-top-font"
						onClick={() => dispatch(closeModal())}
						color="white"
					/>
				)}
			</div>
			<form className="z-50 ">
				{isModal && (
					<p
						className={`mb-6 max-w-[60%] md:max-w-[80%] sm:[] text-center m-auto  ${fontColor}`}
					>
						{modalDesc}
					</p>
				)}
				<div className="inputFields">{modalInputs}</div>
				<div className="btn-container">{modalButtons}</div>
			</form>
			{!isModal && (
				<div className={textCenter + " mb-4"}>{modalFooter}</div>
			)}
		</>
	);
};

export default ModalMaker;
