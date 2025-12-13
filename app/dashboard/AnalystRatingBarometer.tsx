"use client";

import { useRef } from "react";
import useRatings from "./useRatings";

export default function AnalystRatingBarometer({
  pointInTime,
}: {
  pointInTime: number;
}) {
  const barometerRef = useRef(null);

  useRatings(barometerRef, pointInTime);

  return <div ref={barometerRef} id="barometer" />;
}
