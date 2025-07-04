"use client";
import { useEffect, useState } from "react";
import ExampleChart from "./ExampleChart";

const Hero = () => {
    const [visibleLetters, setVisibleLetters] = useState(0);
    const dashboardText = "Dashboard...";

    useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleLetters((prev) => {
          if (prev < dashboardText.length) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }, 0); 

    return () => clearTimeout(timer);
  }, []);


    return (
        <div className=" flex min-h-screen px-4">
            <div className=" flex flex-col w-1/2 items-center justify-center text-center">
                <h1 className="text-7xl font-bold leading-0.2">
                    <span className=" font-mono shadow-sm">Personal</span>
                    <br />
                    Finance
                    <br />
                    {dashboardText.slice(0, visibleLetters)}
                </h1>
            </div>
            <div className=" flex items-center justify-center -z-10 text-white w-1/2">
              <ExampleChart />
            </div>
        </div>
    )
}

export default Hero