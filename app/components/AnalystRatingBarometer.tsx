"use client";

import { useRef } from "react";
import useRatings from "../hooks/useRatings";

export default function AnalystRatingBarometer() {
  const barometerRef = useRef(null);

  useRatings(barometerRef);

  return <div ref={barometerRef} id="barometer" />;
}
