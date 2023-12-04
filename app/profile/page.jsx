"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	const handleEdit = (prompt) => {
		router.push(`/update-prompt?id=${prompt?._id}`);
	};

	const handleDelete = async (prompt) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
		if (hasConfirmed) {
			try {
				const response = await fetch(`/api/prompt/${prompt?._id.toString()}`, {
					method: "DELETE",
				});

				const data = await response.json();

				const filteredPosts = posts?.filter((post) => post._id !== prompt?._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			console.log(data);
			setPosts(data);
		};
		if (session?.user.id) fetchPrompts();
	}, []);

	return (
		<>
			<Profile name="My" desc="Welcome to your personalized profile page" data={posts} handleEdit={handleEdit} handleDelete={handleDelete} />
		</>
	);
};

export default MyProfile;
