"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Typewriter({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  delayBetween = 2200,
}: {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
}) {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(
          () => setDisplayText(currentText.substring(0, displayText.length - 1)),
          deletingSpeed
        );
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(
          () => setDisplayText(currentText.substring(0, displayText.length + 1)),
          typingSpeed
        );
      } else {
        timeout = setTimeout(() => setIsDeleting(true), delayBetween);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delayBetween]);

  return (
    <div className="inline-flex items-center font-[family-name:var(--font-mono)] text-lg sm:text-xl md:text-2xl font-medium text-cyber h-[1.5em]">
      <span>{displayText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.7 }}
        className="inline-block w-[2px] h-[1em] bg-cyber ml-0.5"
      />
    </div>
  );
}
