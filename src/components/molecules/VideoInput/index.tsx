/* eslint-disable @next/next/no-img-element */
'use client';

import { useRef } from "react";
import { MdVideoLibrary } from "react-icons/md";
import { VideoPlayer } from "../../VideoPlayer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const VideoInput = ({ onChange, value, name, label, classname = '' }) => {
  const handleVideoChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-4  items-start w-fit justify-center flex-col h-fit">
      <p className="text-xs font-bold">{label}</p>
      <div
        className={cn(`flex flex-col justify-center items-center gap-4`, classname)}
      >
        <input
          type="file"
          name={name}
          accept="video/*"
          onChange={handleVideoChange}
          style={{
            width: "0",
            height: "0",
            opacity: 0,
            cursor: "pointer",
          }}
          ref={inputRef}
        />

        {value && <VideoPlayer image={""} video={value} name={"name"} />}
     
      </div>

      <Button type="button" onClick={() => inputRef.current?.click()} className="mx-auto flex items-center justify-center gap-2">
          {value ? "Mudar video" : "Carregar video"} <MdVideoLibrary />
        </Button>
    </div>
  );
};
