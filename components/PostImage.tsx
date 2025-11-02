"use client";

import Image from "next/image";
import { useState } from "react";

interface PostImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

export default function PostImage({ src, alt, fill, className, priority, width, height, sizes }: PostImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted text-muted-foreground ${fill ? "absolute inset-0" : `w-full h-full`}`}>
        <span className="text-sm">No image available</span>
      </div>
    );
  }

  return <Image src={src} alt={alt} fill={fill} width={width} height={height} className={className} priority={priority} sizes={sizes} onError={() => setError(true)} />;
}
