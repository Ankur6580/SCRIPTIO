import { RiCloseLine, RiMailFill, RiWhatsappFill } from "react-icons/ri";

const Contact = ({ setShowContact }) => {
  return (
    <section
      id="contact"
      className="absolute right-0 bottom-0 left-0 z-30 flex flex-col bg-[#0e1419] py-6 text-amber-100"
    >
      <h2 className="mb-4 text-3xl font-bold">Contact</h2>
      <p className="text-lg">
        If you have any questions or feedback, please don't hesitate to reach
        out to me.
      </p>
      <p className="text-lg text-amber-400">I am open to freelancing opportunities.</p>

      <span className="flex animate-pulse items-center justify-center gap-8 py-4 text-2xl">
        <a
          href="mailto:ankurdas.abs@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-400"
        >
          <RiMailFill />
        </a>
        
        <a
          href="https://wa.me/+918876123967"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600"
        >
          <RiWhatsappFill />
        </a>
      </span>

      <p className="text-sm">
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

      <span
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowContact(false)}
      >
        <RiCloseLine className="text-3xl" />
      </span>
    </section>
  );
};

export default Contact;
