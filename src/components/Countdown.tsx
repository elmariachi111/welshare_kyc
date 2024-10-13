"use client";

import React, { useState, useEffect } from "react";
import { Chip } from "@nextui-org/chip";

//todo: must be timezone agnostic!
const Countdown = ({ targetDate }: { targetDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval as keyof typeof timeLeft]) {
      timerComponents.push(
        <span key={interval}>
          {timeLeft[interval as keyof typeof timeLeft]} {interval}{" "}
        </span>
      );
    }
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Chip variant="shadow" size="lg" color="primary" className="p-4">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span>Time&apos;s up!</span>
        )}
      </Chip>
      <p className="text-slate-400">until phase 3 starts</p>
    </div>
  );
};

export default Countdown;
