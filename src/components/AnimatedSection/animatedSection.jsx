<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedSection = ({ children, sectionKey }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Trigger animation when the element is in view
        if (elementTop < windowHeight * 0.75) {
          controls.start("visible");
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Trigger on initial render
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, sectionKey]); // Use `sectionKey` instead of `key`

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

=======
import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const AnimatedSection = ({ children, key }) => {
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementTop = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Trigger animation when the element is in view
        if (elementTop < windowHeight * 0.75) {
          controls.start("visible");
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Trigger on initial render
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls, key]); // Add `key` to dependencies to re-trigger on data change

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

>>>>>>> 14fa9f973e246b166e06a200410a8856421bcd9e
export default AnimatedSection;