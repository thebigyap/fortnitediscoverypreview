"use client";

import { useRef, useState, useEffect } from "react";

const DISCOVERY_IMAGE = "/fortnite-discovery.png";

const TILE_OVERLAY = {
  left: "7.2%",
  top: "24%",
  width: "14.5%",
  height: "18%",
  borderRadius: "8px",
};

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showHighlight, setShowHighlight] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!previewUrl) return;
    setShowHighlight(true);
    const id = setTimeout(() => setShowHighlight(false), 2000);
    return () => clearTimeout(id);
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-900 p-3">
      <div className="flex flex-wrap items-center gap-3 pb-3">
        <label className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
          Choose image
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {previewUrl && (
          <button
            type="button"
            onClick={clearPreview}
            className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700"
          >
            Clear
          </button>
        )}
      </div>

      <div
        className="relative mx-auto overflow-hidden rounded-lg bg-indigo-950 shadow-xl"
        style={{
          width: "min(calc(100vw - 24px), calc((100vh - 24px - 52px) * 16 / 9))",
          aspectRatio: "16/9",
        }}
      >
        <img
          src={DISCOVERY_IMAGE}
          alt="Fortnite Discover"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {previewUrl && (
          <div
            className="absolute overflow-hidden transition-shadow duration-500 ease-out"
            style={{
              left: `calc(${TILE_OVERLAY.left} + 230px)`,
              top: `calc(${TILE_OVERLAY.top} + 437px)`,
              width: `calc(${TILE_OVERLAY.width} - 34px)`,
              height: `calc(${TILE_OVERLAY.height} - 60px)`,
              borderRadius: TILE_OVERLAY.borderRadius,
              boxShadow: showHighlight
                ? "0 0 0 4px white, 0 0 40px 15px rgba(255,255,255,0.9), 0 0 80px 25px rgba(147,197,253,0.6)"
                : "none",
            }}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
