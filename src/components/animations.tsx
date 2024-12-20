import { IconType } from "react-icons";
import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.JSX.Element;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface RevealIconProps {
  icon: IconType;
  size?: number;
  color?: string;
}

export const RevealIcon: React.FC<RevealIconProps> = ({
  icon: Icon,
  size = 24,
  color = "#7d7d7d",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Icon size={size} color={color} />
    </motion.div>
  );
};
