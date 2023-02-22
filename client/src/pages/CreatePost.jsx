import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, SetForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, SetGeneratingImg] = useState(false);

  const [loading, SetLoading] = useState(false);

  const generateImg = async () => {
    if (form.prompt) {
      try {
        SetGeneratingImg(true);
        const response = await fetch("http://localhost:4000/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();

        SetForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        SetGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = () => {};

  const handleChange = (e) => {
    SetForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    SetForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The community showcase</h1>
        <p className="mt-2 text-[#66e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through Dalle-AI and showcase to the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="firstname lastname"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a wall"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleSupriseMe={handleSupriseMe}
          />
          <div className="relative border bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z- 0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader></Loader>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center]"
          >
            {generatingImg ? "Generating ..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image, you can share it with others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? "sharing..." : "share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
