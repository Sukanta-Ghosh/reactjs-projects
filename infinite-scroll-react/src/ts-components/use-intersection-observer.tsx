import { useState, useEffect, MutableRefObject } from "react";

interface IntersectionObserverOptions extends IntersectionObserverInit {}

const useIntersectionObserver = (
  ref: MutableRefObject<Element | null>,
  options?: IntersectionObserverOptions
): IntersectionObserverEntry | null => {
  // state
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === "function") {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
        observer.disconnect();
      };
    }
  }, [ref, options]);

  return intersectionObserverEntry;
};

export default useIntersectionObserver;
