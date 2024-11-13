import Image from 'next/image'
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ImageDisplayProps {
  imageUrl: string;
  prompt: string;
}

export function ImageDisplay({ imageUrl, prompt }: ImageDisplayProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-dashed",
        "aspect-square flex items-center justify-center",
        !imageUrl && "bg-muted"
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={prompt}
          width={512}
          height={512}
          className="rounded-lg object-cover w-full h-full"
        />
      ) : (
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <ImageIcon className="h-8 w-8" />
          <p>Your generated image will appear here</p>
        </div>
      )}
    </div>
  );
}