import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const lettersRef = useRef([]);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const tl = useRef(null);
  const imgTl = useRef(null);
  const overlayTl = useRef(null);
  const href = item.link;

  const resetLetters = () => {
    gsap.set(lettersRef.current, { opacity: 0, y: 20 });
  };
  const navigate = useNavigate();

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
    <>
      {/* desktop view */}
      <div
        className="overflow-hidden cursor-pointer relative group md:block hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(href)}
      >
        <img
          ref={imageRef}
          src={item.image}
          alt="category 1"
          className="transition-all duration-300 ease-in-out w-full h-46 object-cover object-top"
          loading="lazy"
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

      {/* mobile view */}
      <div
        className="overflow-hidden cursor-pointer md:hidden block relative h-46"
        onClick={() => navigate(href)}
      >
        <img
          ref={imageRef}
          src={item.image}
          alt="category 1"
          className="size-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 flex justify-center items-center text-black/90">
          <h4 className="text-white text-3xl font-bold flex space-x-1">
            {item.heading}
          </h4>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
