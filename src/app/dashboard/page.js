/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [showContent, setShowContent] = useState({});

  const toggleVisibility = (index) => {
    setShowContent((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [guidetoken, setGuideToken] = useState("");
  useEffect(() => {
    const GuideToken = localStorage.getItem("Guidetoken");
    if (GuideToken) {
      setGuideToken(GuideToken);
    }
  }, []);

  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/api/tour/gettour",
          {
            headers: {
              Authorization: `Bearer ${guidetoken}`,
            },
          }
        );
        console.log(response.data);
        setTours(response.data.Result);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTourData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guidetoken]);

  const [tourdetail, setTourDetail] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [tourimages, settourimages] = useState([]);
  const [message, setMessage] = useState({ text: "", color: "" });
  const showMessage = (text, color) => {
    setMessage({ text, color });
    setTimeout(() => {
      setMessage({ text: "", color: "" });
    }, 2500);
  };

  function handleforminput(event) {
    setTourDetail({
      ...tourdetail,
      [event.target.name]: event.target.value,
    });
  }

  function handleImageChange(event) {
    const files = event.target.files;
    const fileArray = Array.from(files);

    if (fileArray.length > 3) {
      showMessage("You can only upload a maximum of 3 images", "red");
      settourimages([]);
    } else {
      settourimages(fileArray);
    }
  }

  function formsubmit(event) {
    event.preventDefault();
    if (!tourdetail.name || !tourdetail.price || !tourdetail.description) {
      showMessage("Please fill the complete form", "red");
      return;
    }
    if (tourimages.length === 0) {
      showMessage("Please upload at least one image", "red");
      return;
    }
    const formdata = new FormData();
    formdata.append("name", tourdetail.name);
    formdata.append("price", tourdetail.price);
    formdata.append("description", tourdetail.description);

    tourimages.forEach((image) => {
      formdata.append("images", image);
    });

    axios
      .post("http://127.0.0.1:8080/api/tour/addtour", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${guidetoken}`,
        },
      })
      .then(function (response) {
        console.log(formdata);
        console.log(response);
        setTourDetail({
          name: "",
          price: "",
          description: "",
        });
        settourimages([]);
        document.getElementById("files").value = "";
        showMessage("Tour added successfully", "green");
      })
      .catch((error) => {
        console.log(error);
        showMessage("Failed to add tour. Please try again", "red");
      });
  }

  const deleteTour = (tourid) => {
    axios
      .delete(`http://127.0.0.1:8080/api/tour/deletetour/${tourid}`, {
        headers: {
          Authorization: `Bearer ${guidetoken}`,
        },
      })
      .then((response) => {
        console.log(response);
        showMessage("Tour deleted successfully", "green");
        setTours((prevTours) => prevTours.filter((tour) => tour.id !== tourid));
      })
      .catch((error) => {
        console.error("Failed to delete tour:", error);
        showMessage("Failed to delete tour. Please try again", "red");
      });
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="flex flex-col border border-gray-400 rounded w-80 ">
        <p className="text-center" style={{ color: message.color }}>
          {message.text}
        </p>
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Add tour/trek name"
          name="name"
          type="text"
          onChange={handleforminput}
        />
        <textarea
          name="description"
          placeholder="Add tour/trek description"
          onChange={handleforminput}
          className="w-64 border border-gray-400 rounded sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh]"
        ></textarea>
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Add tour/trek price"
          name="price"
          type="text"
          onChange={handleforminput}
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
          onChange={handleImageChange}
        />
        <button
          className="rounded bg-buttonColor sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] m-[1vh] text-background shadow-2xl"
          onClick={formsubmit}
        >
          Submit
        </button>
      </div>
      <div className="flex flex-wrap w-[60vw] mx-4 max-h-[80vh] overflow-y-auto">
        {tours.map((tour, index) => (
          <div
            key={index}
            className="w-80 border border-gray-400 rounded mx-2 my-2"
          >
            <div className="flex justify-around mt-4">
              <h1>Name: {tour.name}</h1>
              <p>Price: {tour.price}</p>
            </div>
            <p className="mx-2 my-2">
              {showContent[index] ? (
                <>{tour.description}</>
              ) : (
                <>
                  {tour.description.substring(0, 100)}{" "}
                  {tour.description.length > 100 && (
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
            <button
              className="rounded bg-red-600 sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] m-[1vh] text-background shadow-2xl"
              onClick={() => deleteTour(tour._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
