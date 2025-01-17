import React, { useState } from "react";

const useModalState = (isModalOpen = false) => {
	const [isOpen, setIsOpen] = useState(isModalOpen);

	const openModal = () => {
		console.log("open");
		setIsOpen(true);
	};

	const closeModal = () => {
		console.log("close");
		setIsOpen(false);
	};

	return { isOpen, openModal, closeModal };
};

export default useModalState;
