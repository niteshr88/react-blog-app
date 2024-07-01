import { useEffect, useRef, useState } from "react";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "red"];
const delay = 2500;

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, delay);

    return () => {
      resetTimeout();
    };
  }, [index]);

  const handleDotClick = (idx) => {
    setIndex(idx);
  };

  return (
    <div className="slideshow">
      <div className="slideshowSlider">
        {[...colors, ...colors].map((backgroundColor, idx) => (
          <div className="slide" key={idx} style={{ backgroundColor }}></div>
        ))}
      </div>

      <div className="slideshowDots">
        {colors.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => handleDotClick(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}
