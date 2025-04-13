"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { PromptInput } from "@/components/PromptInput";
import { ImageDisplay } from "@/components/ImageDisplay";

export default function Home() {
  const DEFAULT_PROMPT = "Astronaut riding a horse on Mars";

  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);

  const [width, setWidth] = useState("512");
  const [height, setHeight] = useState("512"); 
  const [seed, setSeed] = useState(Date.now());
  const [noLogo, setNoLogo] = useState(true);
  const [isPrivate, setIsPrivate] = useState(true);
  const [enhance, setEnhance] = useState(true);

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const BASE_URL = "https://pollinations.ai/p"

      const params = new URLSearchParams({
        width: width,
        height: height,
        seed: seed,
        nologo: noLogo ? "true" : "false",
        private: isPrivate ? "true" : "false",
        enhance: enhance ? "true" : "false",
      });

      const finalUrl = `${BASE_URL}/${encodeURIComponent(prompt)}?${params}`;

      // Attempt to load the image first
      const img = new Image();
      img.onload = () => {
        setImageUrl(finalUrl);
        setLoading(false);
        toast({
          title: "Image generated successfully!",
          description: "Your AI image has been created.",
        });
      };

      img.onerror = () => {
        throw new Error("Failed to generate image");
      };

      img.src = finalUrl;
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Error generating image",
        description: "Please try again with a different prompt.",
      });
      console.error("Error generating image:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            AI Image Generator
          </h1>
          <p className="text-muted-foreground">
            Transform your ideas into stunning visuals using AI
          </p>
        </div>

        <Card className="p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4 md:space-x-4">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            width={width}
            onWidthChange={setWidth}
            height={height}
            onHeightChange={setHeight}
            seed={seed}
            onSeedChange={setSeed}
            noLogo={noLogo}
            onNoLogoChange={setNoLogo}
            isPrivate={isPrivate}
            onIsPrivateChange={setIsPrivate}
            enhance={enhance}
            onEnhanceChange={setEnhance}
            loading={loading}
            generateImage={generateImage}
          />
          <ImageDisplay imageUrl={imageUrl} prompt={prompt} />
        </Card>
      </div>
    </main>
  );
}
