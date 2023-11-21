import { connectToDb } from "@utils/database";
import { Prompt } from "@models/prompt";

//send response with res object
//send updated prompt in response along with message

export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { newPrompt, newTag } = await request.json();

  try {
    await connectToDb();
    const existingPrompt = await Prompt.findById(params.id);

    existingPrompt.prompt = newPrompt;
    existingPrompt.tag = newTag;

    if (!existingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }
    await existingPrompt.save();

    return new Response("Prompt edited successfully", { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
