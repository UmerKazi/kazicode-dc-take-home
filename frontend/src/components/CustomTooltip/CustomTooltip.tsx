import { motion } from "framer-motion";
import React, { useState, ReactNode } from "react";

interface CustomTooltipProps {
  children: ReactNode;
  content: ReactNode;
  direction?: "top" | "right" | "bottom" | "left";
  delay?: number;
}

export default function CustomTooltip({
  children,
  content,
  direction = "top",
  delay = 400,
}: CustomTooltipProps) {
  let timeout: ReturnType<typeof setTimeout>;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearTimeout(timeout);
    setActive(false);
  };

  return (
    <motion.div
      className="relative inline-block"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
      {active && (
        <div
          className={`absolute z-10 p-2 px-3 text-white bg-[#222222] text-sm rounded
            ${
              direction === "top"
                ? "bottom-full left-1/2 transform -translate-x-1/2 mb-3"
                : ""
            }
            ${
              direction === "right"
                ? "left-full top-1/2 transform -translate-y-1/2 ml-3"
                : ""
            }
            ${
              direction === "bottom"
                ? "top-full left-1/2 transform -translate-x-1/2 mt-3"
                : ""
            }
            ${
              direction === "left"
                ? "right-full top-1/2 transform -translate-y-1/2 mr-3"
                : ""
            }`}
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-solid border-transparent
              ${
                direction === "top"
                  ? "border-t-black border-t-[6px] left-1/2 transform -translate-x-1/2 top-full"
                  : ""
              }
              ${
                direction === "right"
                  ? "border-r-black border-r-[6px] top-1/2 transform -translate-y-1/2 left-full"
                  : ""
              }
              ${
                direction === "bottom"
                  ? "border-b-black border-b-[6px] left-1/2 transform -translate-x-1/2 bottom-full"
                  : ""
              }
              ${
                direction === "left"
                  ? "border-l-black border-l-[6px] top-1/2 transform -translate-y-1/2 right-full"
                  : ""
              }`}
          />
        </div>
      )}
    </motion.div>
  );
}
