"use client";

import { useRef } from "react";
import useRatings from "./useRatings";

export default function AnalystRatingBarometer({ date }: { date: Date }) {
  const barometerRef = useRef(null);

  useRatings(barometerRef, date);

  return <div ref={barometerRef} id="barometer" />;
}
