import Link from "next/link";

const Form = ({ type, post, setPost, isSubmitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Prompt</h1>
      {type === "Create" && (
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world and let your
          imagination run wild with any AI-powered platform
        </p>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="flex flex-col w-full max-w-2xl mt-10 gap-7 glassmorphism"
      >
        <label htmlFor="prompt_textarea">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="Write your prompt here"
            required
            className="form_textarea"
            id="prompt_textarea"
          ></textarea>
        </label>

        <label htmlFor="prompt_tag">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag
          </span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="Give your prompt a tag (#webdevelopment, #product, #coding)"
            required
            className="form_input"
            id="prompt_tag"
          ></input>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-sm text-gray-500" href="/">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-1.5 text-sm text-white rounded-full bg-primary-orange disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {isSubmitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
