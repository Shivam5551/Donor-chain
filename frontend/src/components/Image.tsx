import { useState, useEffect } from "react";
import { imageSources } from "../imageSources";

export const Images = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % imageSources.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center bg-white justify-center h-[60dvh] w-[99dvw] overflow-hidden">
      {imageSources.map(({ src, title }, key) => (
        <div key={key} className={`absolute transition-opacity ease-in-out w-[95dvw] duration-1000 my-7 p-2 rounded-xl h-full flex items-center ${key === visibleIndex ? "opacity-100 z-10" : "opacity-0"}`}>
          <div className="absolute left-6 bg-opacity-50 text-white p-4 max-w-lg rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold">{title}</h2>
          </div>
          <img className="w-full h-full object-cover rounded-xl" src={src} alt={title} />
        </div>
      ))}
    </div>
  );
};
