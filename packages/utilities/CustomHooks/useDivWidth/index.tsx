import * as React from 'react';
import { useRef, useEffect, useState } from 'react';

type ElementRefrence = React.RefObject<HTMLDivElement> | null;

export const useDivWidth = (): [ElementRefrence, number] => {
  const ref: ElementRefrence = useRef(null);
  const [width, changeWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      const entry = entries[0];

      if (width !== entry.contentRect.width)
        changeWidth(entry.contentRect.width);
    });

    if(element) {
      resizeObserver.observe(element);
      return () => resizeObserver.unobserve(element);
    }


  }, [width]);

  return [ref, width];
};