import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";

import { getEmojiRGB, rgbToHsl } from "../helpers/colorHelpers";

type Props = {
  emoji: string;
  style?: CSSProperties;
};

const GleanEmoji: FC<Props> = ({ emoji, style }) => {
  const [backgroundStyle, setBackgroundStyle] = useState({
    background: "transparent",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = "100px sans-serif";
    ctx.fillText(emoji, 0, 80);

    const rgb = getEmojiRGB(
      ctx.getImageData(0, 0, canvas.width, canvas.height).data,
    );
    const [h, s, l] = rgbToHsl(...rgb);

    // First color: average emoji color with 40% white (=pastel) & about -20% change in HUE color scale
    const firstColor = `hsl(${(h - 20 + 360) % 360}, ${s}%, ${Math.min(
      l + 40,
      100,
    )}%)`;
    // Second color: average with 20% white and 80% saturation
    const secondColor = `hsl(${h}, ${Math.min(s * 0.8, 100)}%, ${Math.min(
      l + 20,
      100,
    )}%)`;

    setBackgroundStyle({
      background: `radial-gradient(121.30% 121.30% at 50.43% -0.00%, ${firstColor} 0%, ${secondColor} 100%), rgba(0, 0, 0, 0.20)`,
    });
  }, [emoji]);

  return (
    <div
      className="flex h-60 w-60 items-center justify-center rounded-3xl"
      style={{ ...backgroundStyle, ...style }}
    >
      <canvas ref={canvasRef} width="100" height="100" className="hidden" />
      <span className="text-[80px] leading-none">{emoji}</span>
    </div>
  );
};

export default GleanEmoji;
