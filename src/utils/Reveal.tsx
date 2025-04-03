"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface RevealProps {
  children: React.JSX.Element;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div
      ref={ref}
      style={{ position: "relative", width: "full", overflow: "visible" }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
