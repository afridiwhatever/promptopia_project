import { connectToDb } from "@utils/database";
import { Prompt } from "@models/prompt";

export const GET = async (req, res) => {
  const { searchParams } = req.nextUrl;
  const tag = searchParams.get("tag");

  if (tag) {
    try {
      await connectToDb();

      const prompts = await Prompt.find({ tag }).populate("creator");

      if (prompts) {
        return new Response(JSON.stringify(prompts), { status: 200 });
      }
      return new Response("Prompt not found", { status: 404 });
    } catch (error) {
      return new Response("Failed to load prompts", { status: 500 });
    }
  }

  try {
    await connectToDb();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to load prompts", { status: 500 });
  }
};
