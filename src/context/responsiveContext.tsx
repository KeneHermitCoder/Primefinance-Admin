import React, { createContext, useState, useEffect } from "react";

export const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  function useWindowDimensions() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      setLoading(true);
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
          setLoading(false);
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
  }

  const { width } = useWindowDimensions();

  /**
   * ww - responsive function
   * @a: height or with of the component from the figma design
   * @width: window width
   * @1440: window width from the figma design
   */
  const ww = (a) => (width * a) / 1440;
  return (
    <ResponsiveContext.Provider value={{ ww, loading, setLoading }}>
      {children}
    </ResponsiveContext.Provider>
  );
};