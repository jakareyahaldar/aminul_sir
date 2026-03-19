import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ImageSlider = () => {
  const slides = useSelector((state) => state.slider);

  const [current, setCurrent] = useState(0);

  const data = slides?.sliders || [];
  const isLoading = slides?.isLoading;
  const error = slides?.error;

  // Auto slide
  useEffect(() => {
    if (!data.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  // Reset index when data changes
  useEffect(() => {
    setCurrent(0);
  }, [data]);

  // 🔄 Loading
  if (isLoading) {
    return (
      <div className="w-full h-56 md:h-80 flex items-center justify-center bg-gray-200 rounded-xl animate-pulse">
        <p className="text-gray-500">Loading slider...</p>
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="w-full h-56 md:h-80 flex flex-col items-center justify-center bg-red-100 rounded-xl">
        <p className="text-red-600 font-semibold">
          {error || "Failed to load slider"}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-1 bg-red-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // 📭 Empty
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-56 md:h-80 flex items-center justify-center bg-gray-200 rounded-xl">
        <p className="text-gray-600 text-lg">No Slides Available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-56 md:h-80 overflow-hidden">
      
      {/* Slides */}
      {data.map((slide, index) => (
        <div
          key={slide._id || index}
          className={`absolute w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.text || "slide"}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="absolute bottom-10 text-white md:text-3xl font-bold text-center px-4">
              {slide.text || "No Text"}
            </h2>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;