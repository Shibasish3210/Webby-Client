import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { MdOutlineAutoDelete } from "react-icons/md";

const FileInput = ({ imageValueRef }) => {
	const [imageUrl, setImageUrl] = useState(""); // State for image URL
	const inputRef = useRef(null); // Ref for the file input

	const handleImageUpload = () => {
		inputRef.current.click(); // Trigger the hidden input
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		imageValueRef.current = file;
		if (file) {
			// Update state only when file exists
			const image = URL.createObjectURL(file);
			setImageUrl(image);
		}
	};

	const handleImageDeletion = (e) => {
		e.stopPropagation();
		setImageUrl(""); // Clear the image URL
		if (inputRef.current) {
			// Reset the file input
			inputRef.current.value = "";
		}
		imageValueRef.current && (imageValueRef.current = "");
	};

	return (
		<div>
			<div
				className="h-[200px] Input skew-x-0 flex items-center"
				onClick={handleImageUpload}
			>
				{/* Hidden file input */}
				<input
					type="file"
					ref={inputRef}
					onChange={handleImageChange}
					className="hidden"
				/>
				{/* Upload UI */}
				<div className={`flex ${imageUrl ? "hidden" : "block"}`}>
					<p className="text-sm">Drop your image here or</p>
					<p className="text-sm pl-1 underline underline-offset-4">
						Browse
					</p>
				</div>
				{/* Image Preview */}
				<div
					className={`flex gap-4 items-center ${
						imageUrl ? "block" : "hidden"
					}`}
				>
					<img
						className="uploaded_image"
						src={imageUrl}
						alt="uploaded avatar"
					/>
					<Button
						value={
							<MdOutlineAutoDelete className="text-sm md:text-xl" />
						}
						func={handleImageDeletion}
					/>
				</div>
			</div>
		</div>
	);
};

export default FileInput;
