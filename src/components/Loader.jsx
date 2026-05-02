import React from "react";

function Loader({ size = 50, color = "#f03355" }) {
  return (
    <div
      className="animate-[spin_1s_steps(10)_infinite] rounded-full aspect-square"
      style={{
        width: size,
        padding: "1px",
        background: `conic-gradient(#0000 10%, ${color}) content-box`,
        WebkitMask: `
          repeating-conic-gradient(#0000 0deg,#000 1deg 20deg,#0000 21deg 36deg),
          radial-gradient(farthest-side,#0000 calc(100% - 8px - 1px),#000 calc(100% - 8px))
        `,
        WebkitMaskComposite: "destination-in",
        maskComposite: "intersect",
      }}
    />
  );
}

export default Loader;