"use client";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showContent, setShowContent] = useState({});

  const toggleVisibility = (index) => {
    setShowContent((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const trekkingExpeditions = [
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
    "Embark on a journey through the untamed beauty of the Himalayas with our exhilarating trekking expedition. This unforgettable adventure begins at the base of towering peaks, where you will find yourself surrounded by lush forests, cascading waterfalls, and breathtaking vistas at every turn.",
  ];

  const images = ["/Images/1.png", "/Images/2.png", "/Images/3.png"];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="flex items-center justify-center mt-12">
      <div className="flex flex-col border border-gray-400 rounded w-80 ">
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Add tour/trek name"
          name="tour"
          type="text"
        />
        <textarea
          name="description"
          placeholder="Add tour/trek description"
          className="w-64 border border-gray-400 rounded sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh]"
        ></textarea>
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Add tour/trek price"
          name="tourprice"
          type="text"
        />
        <label
          htmlFor="files"
          className="sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh]"
        >
          Add tour/trek images to upload:
        </label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          className="sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh]"
        />
        <button className="rounded bg-buttonColor sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] m-[1vh] text-background shadow-2xl">
          Submit
        </button>
      </div>
      <div className="flex flex-wrap w-[60vw] mx-4 max-h-[80vh] overflow-y-auto">
        {trekkingExpeditions.map((content, index) => (
          <div
            key={index}
            className="w-80 border border-gray-400 rounded mx-2 my-2"
          >
            <div className="flex items-center justify-center">
              <button onClick={prevSlide} className="text-white rounded-l">
                <Image
                  width={250}
                  height={70}
                  src="/Images/left-arrow.png"
                  alt="left-arrow"
                />
              </button>
              <div className="overflow-hidden flex-shrink-0">
                {images.map((image, index) => (
                  <Image
                    width={250}
                    height={70}
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`w-full ${
                      index === currentIndex ? "" : "hidden"
                    } rounded my-2`}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="text-white  rounded-r">
                <Image
                  width={250}
                  height={70}
                  src="/Images/right-arrow.png"
                  alt="right-arrow"
                />
              </button>
            </div>
            <div className="flex justify-around">
              <h1>Trek title</h1>
              <p>120$</p>
            </div>
            <p className="mx-2 my-2">
              {showContent[index] ? (
                <>{content}</>
              ) : (
                <>
                  {content.substring(0, 100)}{" "}
                  {content.length > 100 && (
                    <>
                      {" "}
                      <span
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => toggleVisibility(index)}
                      >
                        Read More
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
            <button className="rounded bg-red-600 sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] m-[1vh] text-background shadow-2xl">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
