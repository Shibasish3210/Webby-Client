import Editor from "../shared/Editor";

const ModalEditor = ({
	value,
	language,
	onchange,
	isExpanded,
	openModal,
	closeModal,
}) => {
	return (
		<div className="modal fixed w-screen h-screen z-40 bg-[#383656f2] grid place-content-center top-0 left-0">
			<Editor
				language={language}
				onchange={onchange}
				value={value}
				height="70"
				width="70vw"
				isExpanded={isExpanded}
				openModal={openModal}
				closeModal={closeModal}
			/>
		</div>
	);
};

export default ModalEditor;
