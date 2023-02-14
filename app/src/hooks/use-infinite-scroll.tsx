import { useCallback, useEffect, useRef } from 'react';

export function useInfiniteScroll(callback?: () => void) {
  const scrollRef = useRef<HTMLElement>();
  const triggeredRef = useRef<boolean>(false);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    const ref = scrollRef.current;
    const handler = () => {
      const { scrollTop, scrollHeight } = scrollRef.current;
      const percentScroll = parseFloat(
        ((scrollTop / scrollHeight) * 100).toFixed(2)
      );

      // Trigger callback condition
      if (percentScroll > 70 && triggeredRef.current === false) {
        callback();
        triggeredRef.current = true;
      }
    };

    scrollRef.current.addEventListener('scroll', handler);

    return () => ref.removeEventListener('scroll', handler);
  }, [scrollRef, triggeredRef, callback]);

  const reset = useCallback(() => {
    triggeredRef.current = false;
  }, []);

  return {
    ref: scrollRef,
    triggered: triggeredRef.current,
    reset,
  };
}
