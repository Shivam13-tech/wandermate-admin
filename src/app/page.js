"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
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
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh]  sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Email"
          name="email"
          type="text"
        />
        <input
          className="rounded sm:w-[70vw] md:w-[45vw] lg:w-[15vw] sm:h-[5vh] md:h-[5vh] lg:h-[4vh]  sm:m-[0.9vh] lg:m-[0.8vh] lg:m-[0.5vh] sm:p-[1.8vw] lg:p-[0.7vw] lg:p-[0.5vw] bg-inputBoxColor outline-none focus:shadow-outline-blue focus:border-blue-500 focus:ring focus:ring-blue-400"
          placeholder="Password"
          name="password"
          type="password"
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
