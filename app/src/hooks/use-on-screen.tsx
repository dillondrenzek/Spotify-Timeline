import { MutableRefObject, useEffect, useState } from 'react';

/**
 * Hook that returns whether or not the given `ref` is on the screen
 */
export function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = '0px'
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        // threshold: 1.0,
      }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      observer.unobserve(currentRef);
    };
  }, [rootMargin, ref]); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
