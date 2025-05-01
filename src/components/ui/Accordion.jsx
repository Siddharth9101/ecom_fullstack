import { useState } from "react";

export default function Accordion({ label, content }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="w-full max-w-md mx-auto"
      style={{ borderBottom: !isOpen ? "1px solid black" : "0" }}
    >
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-2 text-left font-medium text-gray-800 hover:bg-gray-100 transition"
        >
          <span className="font-extrabold tracking-wide">{label}</span>
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && <div className="ml-2">{content}</div>}
      </div>
    </div>
  );
}
