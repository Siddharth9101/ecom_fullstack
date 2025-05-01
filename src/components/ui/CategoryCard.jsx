import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const CategoryCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const lettersRef = useRef([]);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const tl = useRef(null);
  const imgTl = useRef(null);
  const overlayTl = useRef(null);

  const resetLetters = () => {
    gsap.set(lettersRef.current, { opacity: 0, y: 20 });
  };

  useEffect(() => {
    resetLetters();
  }, []);

  useEffect(() => {
    if (isHovered) {
      tl.current = gsap.timeline();
      tl.current.to(lettersRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.out",
      });
      imgTl.current = gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.1,
        ease: "power3.out",
      });

      overlayTl.current = gsap.to(overlayRef.current, {
        opacity: 0.2,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      if (tl.current) tl.current.kill();
      gsap.to(lettersRef.current, {
        opacity: 0,
        y: 20,
        stagger: { each: 0.03, from: "end" },
        duration: 0.3,
        ease: "power3.in",
      });

      if (imgTl.current) imgTl.current.kill();
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.1,
        ease: "power3.in",
      });

      if (overlayTl.current) overlayTl.current.kill();
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isHovered]);

  return (
    <div
      className="overflow-hidden cursor-pointer relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        ref={imageRef}
        src={item.image}
        alt="category 1"
        className="hover:scale-110 transition-all duration-300 ease-in-out w-full"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 pointer-events-none"
      />
      <div className="absolute inset-0 flex justify-center items-center text-black/90">
        <h4 className="text-white text-3xl font-bold flex space-x-1">
          {item.heading.split("").map((letter, idx) => (
            <span
              key={idx}
              ref={(e) => (lettersRef.current[idx] = e)}
              style={{ opacity: 0, display: "inline-block" }}
            >
              {letter}
            </span>
          ))}
        </h4>
      </div>
    </div>
  );
};

export default CategoryCard;
