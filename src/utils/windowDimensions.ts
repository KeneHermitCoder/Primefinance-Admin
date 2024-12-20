import { useState, useEffect, useRef, } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export const useElementWidth = <T extends HTMLElement>(): [
  React.RefObject<T>,
  number,
] => {
  const elementRef = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth);
      }
    };

    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return [elementRef, width];
};

export const ScrollToTopOnLoad = ({ id }: { id?: string }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id]);

  return null;
};