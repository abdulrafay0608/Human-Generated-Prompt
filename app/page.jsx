import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex flex-center flex-col mt-12">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center mx-2">
          Human-Generated Prompts
        </span>
      </h1>
      <p className="desc text-center">
        "Welcome to Human-Generated Prompts – where industry interaction meets
        innovation! Experience tailored prompts, hassle-free Google sign-in, and
        contribute your unique thoughts effortlessly. Join a global community of
        professionals shaping the future. Elevate your networking journey with
        us. Explore the future at Human-Generated Prompts".
      </p>
      {<Feed />}
    </section>
  );
};

export default Home;
