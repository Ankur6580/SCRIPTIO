import React from "react";

import Contact from "./Contact";

const Footer = () => {
  const [showContact, setShowContact] = React.useState(false);

  return (
    <footer className="absolute right-0 bottom-0 left-0 bg-[#0e1419] p-4 text-center text-cyan-200">
      <p className={`${showContact && "hidden"}`}>
        Developed by{" "}
        <span
          className="cursor-pointer font-bold underline"
          onClick={() => setShowContact(true)}
        >
          Ankur Das
        </span>
      </p>

      {showContact && <Contact setShowContact={setShowContact} />}
    </footer>
  );
};

export default Footer;
