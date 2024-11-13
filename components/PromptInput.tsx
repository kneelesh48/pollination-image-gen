import { Loader2, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  width: string
  onWidthChange: (value: string) => void
  height: string
  onHeightChange: (value: string) => void
  seed: string
  onSeedChange: (value: string) => void
  noLogo: boolean
  onNoLogoChange: (value: boolean) => void
  isPrivate: boolean
  onIsPrivateChange: (value: boolean) => void
  enhance: boolean
  onEnhanceChange: (value: boolean) => void
  loading: boolean;
  generateImage: () => void;
}

export function PromptInput({
  prompt,
  onPromptChange,
  width,
  onWidthChange,
  height,
  onHeightChange,
  seed,
  onSeedChange,
  noLogo,
  onNoLogoChange,
  isPrivate,
  onIsPrivateChange,
  enhance,
  onEnhanceChange,
  loading,
  generateImage,
}: PromptInputProps) {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => e.key === "Enter" && generateImage()}
        />
        <Button onClick={generateImage} disabled={loading || !prompt.trim()}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
          <span className="ml-2 hidden sm:inline">Generate</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Width</label>
          <Input
            type="number"
            value={width}
            onChange={(e) => onWidthChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Height</label>
          <Input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Seed</label>
          <div className="flex flex-row gap-2">
            <Input
              type="number"
              value={seed}
              onChange={(e) => onSeedChange(e.target.value)}
            />
            <Button onClick={() => onSeedChange(Date.now().toString())} className="text-sm text-white px-2 py-1 rounded">
              🔁
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={noLogo}
            onCheckedChange={(checked) => onNoLogoChange(checked as boolean)}
          />
          <label className="text-sm">No Logo</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isPrivate}
            onCheckedChange={(checked) => onIsPrivateChange(checked as boolean)}
          />
          <label className="text-sm">Private</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={enhance}
            onCheckedChange={(checked) => onEnhanceChange(checked as boolean)}
          />
          <label className="text-sm">Enhance</label>
        </div>
      </div>
    </div>
  );
}
