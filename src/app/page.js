"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", color: "" });

  const showMessage = (text, color) => {
    setMessage({ text, color });
    setTimeout(() => {
      setMessage({ text: "", color: "" });
    }, 2500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      if (!formData.name || !formData.password) {
        showMessage("Please provide valid username & password", "red");
        return;
      }
      try {
        const response = await axios.post(
          // "https://wandermate-backend.onrender.com/api/login",
          "http://127.0.0.1:8080/api/guide/loginguide",
          {
            userName: formData.name,
            password: formData.password,
          }
        );
        console.log(response, "response");
        localStorage.setItem("Guidetoken", response.data.Token);
        showMessage("Login successful", "green");
        router.replace("/dashboard");
      } catch (error) {
        console.error("Error:", error);
        showMessage(error.response.data.message, "red");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-[90vh]">
      <div>
        <Image
          src="/Images/admin-hike.png"
          alt="admin-hike-image"
          width={300}
          height={70}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center mb-[2vh] sm:text-4xl md:text-6xl lg:text-5xl ">
          Hello guide
        </h1>
        <p style={{ color: message.color }}>{message.text}</p>
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh]  sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Username"
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh]  sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleInputChange}
        />
        <button
          onClick={handleLogin}
          className="rounded bg-buttonColor sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh] m-[1vh] text-background shadow-2xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}
