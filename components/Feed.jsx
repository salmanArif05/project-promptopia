"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((prompt) => {
				return <PromptCard key={prompt.id} prompt={prompt} handleTagClick={handleTagClick} />;
			})}
		</div>
	);
};

const Feed = () => {
	const [searchText, setSearchText] = useState("");
	const [prompts, setPrompts] = useState([]);
	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		const fetchPrompts = async () => {
			try {
				const response = await fetch("/api/prompt", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					const data = await response.json();
					setPrompts(data);
					console.log(data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchPrompts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input type="text" placeholder="Search for prompt tag or username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
			</form>
			<PromptCardList data={prompts} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
