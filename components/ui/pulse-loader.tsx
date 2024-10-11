import Image from "next/image";
import React from "react";

export interface PulseLoaderProps {
  width?: number;
  height?: number;
}

function PulseLoader({ width = 150, height = 150 }: PulseLoaderProps) {
  return (
    <Image alt="Chargement" src="/loader.svg" width={width} height={height} />
  );
}

export default PulseLoader;
