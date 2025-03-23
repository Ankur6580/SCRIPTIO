import { RiCloseLine, RiMailFill, RiWhatsappFill } from "react-icons/ri";

const Contact = ({ setShowContact }) => {
  return (
    <section
      id="contact"
      className="relative z-30 flex flex-col items-center justify-center bg-[#0e1419] p-6 text-amber-100"
    >
      <h2 className="mb-4 text-3xl font-bold">Contact</h2>
      <p className="text-lg">
        If you have any questions or feedback, please don't hesitate to reach
        out to me.
      </p>
      <p className="text-lg">
        You can find me on{" "}
        <a
          href="https://github.com/Ankur6580"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-200 underline"
        >
          GitHub
        </a>
      </p>

      <span className="flex animate-pulse items-center justify-center gap-4 text-2xl">
        <a
          href="mailto:ankurdas.abs@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiMailFill />
        </a>
        or
        <a href="https://wa.me/+918876123967" target="_blank" rel="noopener noreferrer">
          <RiWhatsappFill />
        </a>
      </span>

      <span
        className="absolute top-0 right-2 cursor-pointer"
        onClick={() => setShowContact(false)}
      >
        <RiCloseLine className="text-3xl" />
      </span>
    </section>
  );
};

export default Contact;
