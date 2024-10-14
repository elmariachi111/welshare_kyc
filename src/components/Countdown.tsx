"use client";

import React, { useState, useEffect } from "react";
import { Chip } from "@nextui-org/chip";

//todo: must be timezone agnostic!
const Countdown = ({
  targetDate,
  children,
}: {
  targetDate: Date;
  children: React.ReactNode;
}) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
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

  if (!timerComponents.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <Chip variant="shadow" size="lg" color="secondary" className="p-4 px-20">
        {timerComponents}
      </Chip>
      <p className="text-slate-400">{children}</p>
    </div>
  );
};

export default Countdown;
