import { useEffect, useState } from "react";

const SearchBar = ({ feedProjectsData, setFilteredData }) => {
	const [searchedTerm, setSearchedTerm] = useState("");

	useEffect(() => {
		const filtered = feedProjectsData.filter((project) =>
			project.name?.toLowerCase().includes(searchedTerm.toLowerCase()),
		);
		setFilteredData(filtered);
	}, [searchedTerm, feedProjectsData]);
	return (
		<div className="w-1/4 ml-4">
			<input
				className="Input w-full"
				placeholder={"🔍 Enter the key word to search for"}
				onChange={(e) => setSearchedTerm(e.target.value)}
			/>
		</div>
	);
};

export default SearchBar;
