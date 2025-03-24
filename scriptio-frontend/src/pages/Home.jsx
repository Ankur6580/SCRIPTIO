import React, { useEffect, useState } from "react";
import { IoArrowUpCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { scroller } from "react-scroll";

import Footer from "../components/Footer";
import PromptInputOutput from "../components/PromptInputOutput";

const Home = ({ user }) => {
  const [showButton, setShowButton] = useState(false);

  const handleScrollTo = (sectionId) => (e) => {
    e.preventDefault();
    scroller.scrollTo(sectionId, {
      smooth: true,
      duration: 500,
      offset: -70,
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setShowButton(scrollPosition > pageHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={`mx-auto max-w-[650px] ${user ? "" : "pt-30"}`}>
      <div className="text-center">
        <h1 className="text-3xl">
          Generate Engaging YouTube Scripts Instantly with AI!
        </h1>
        <p className="opacity-80">
          Turn your ideas into professional video scripts effortlessly with AI.
        </p>
      </div>
      <br />
      <div className="flex justify-center gap-2 text-center" id="cta">
        <Link
          className="btn btn-primary hover:scale-101 hover:shadow-md"
          to="#"
          onClick={handleScrollTo("generate")}
        >
          Generate Script
        </Link>

        {!user && (
          <Link
            className="btn btn-secondary hover:scale-101 hover:shadow-md"
            to={"/register"}
          >
            Sign Up to Save Scripts
          </Link>
        )}
      </div>
      <br />
      {/* how it works */}
      <section id="how-it-works" className="my-4 rounded p-4">
        <h3 className="mb-2 text-2xl underline">How It Works</h3>
        <ol className="list-inside list-decimal">
          <li>
            Enter your video topic or idea&nbsp;–&nbsp;
            <span className="italic opacity-70">
              for example: "The Great Gatsby".
            </span>
          </li>
          <li>
            Click on <strong>"Generate Script"</strong> button and watch the
            magic happen!
          </li>
          <li>
            Download the generated script as a PDF file or sign up to save it.
          </li>
        </ol>
      </section>
      <br />
      {/* features */}
      <section id="features" className="flex flex-col gap-2 p-4">
        <h3 className="mb-2 text-2xl underline">Features</h3>
        <ul className="list-disc pl-4">
          <li>Generate professional video scripts with AI</li>
          <li>Save and access your scripts later</li>
          <li>Download scripts as PDF files</li>
          <li>Fast & User&minus;Friendly</li>
        </ul>
      </section>
      <br />
      {/* generate */}
      <section id="generate" className="mb-8">
        <h3 className="text-center text-2xl font-bold">Get Started</h3>
        <PromptInputOutput user={user} />
      </section>

      <br />

      {showButton && (
        <IoArrowUpCircle
          className="fixed right-4 bottom-4 z-30 animate-bounce cursor-pointer text-3xl text-white mix-blend-difference"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}
      <Footer />
    </main>
  );
};

export default Home;
