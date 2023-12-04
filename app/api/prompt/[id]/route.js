import { connectDB } from "@utils/database";

import Prompt from "@models/prompt";

// Get prompt

export const GET = async (request, { params }) => {
	try {
		await connectDB();
		const prompt = await Prompt.findById(params.id).populate("creator");
		if (!prompt) {
			return new Response("Prompt not found.", { status: 404 });
		}
		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to get prompts.", { status: 500 });
	}
};

// update a prompt

export const PATCH = async (request, { params }) => {
	const { prompt, tag } = await request.json();
	try {
		await connectDB();
		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt) {
			return new Response("Prompt not found.", { status: 404 });
		}

		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		return new Response("Failed to update prompt.", { status: 500 });
	}
};

// delete a prompt

export const DELETE = async (request, { params }) => {
	try {
		await connectDB();

		const deletedItem = await Prompt.findByIdAndDelete(params.id);

		console.log(deletedItem, "deletedItem");

		return new Response(JSON.stringify("Prompt deleted"), { status: 200 });
	} catch (error) {
		return new Response("Failed to delete prompt.", { status: 500 });
	}
};
