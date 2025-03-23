import DOMPurify from "dompurify";
import { marked } from "marked";
import { forwardRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const MDRenderer = forwardRef(({ scriptData }, contentRef) => {
  const [showContent, setShowContent] = useState(false);
  let sanitizedHTML;

  if (scriptData) {
    sanitizedHTML = DOMPurify.sanitize(marked.parse(scriptData.content));
  } else {
    return <div className="text-textPrimary">Something went wrong</div>;
  }

  return (
    <>
      <div className="relative z-2 mt-4 flex overflow-hidden rounded-tl-md rounded-tr-md">
        <h2 className="w-full p-2 font-bold">{scriptData.title}</h2>
        <button
          className="btn-sq text-2xl"
          onClick={() => setShowContent((prev) => !prev)}
        >
          {showContent ? <IoEyeOff /> : <IoEye />}
        </button>
      </div>
      <div
        id="scriptContent"
        ref={contentRef}
        className={`cursor-text rounded-tl-md rounded-tr-md p-5 transition-all duration-600 ease-in-out ${
          showContent
            ? "max-h-[10000px] overflow-visible opacity-100"
            : "mt-[-30px] max-h-0 overflow-hidden opacity-0"
        }`}
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      ></div>
    </>
  );
});

export default MDRenderer;
