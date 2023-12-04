"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get("id");
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	const editPrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert("Prompt ID not found");

		if (!post.prompt || !post.tag) return alert("Please fill in all fields");

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const fetchPrompt = async () => {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await response.json();
			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};
		if (promptId) fetchPrompt();
	}, [promptId]);

	return (
		<>
			<Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={editPrompt} />
		</>
	);
};

export default EditPrompt;
