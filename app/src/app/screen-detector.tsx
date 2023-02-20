import React, {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box } from '@mui/material';

// Hook
function useOnScreen<T extends Element>(
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

export function ScreenDetector(props: {
  children?: ReactNode;
  onEnterScreen?: () => void;
  onExitScreen?: () => void;
}) {
  const { children, onEnterScreen, onExitScreen } = props;
  const ref = useRef();

  const onScreen = useOnScreen(ref, '0px');

  useEffect(() => {
    const emitFn = onScreen ? onEnterScreen : onExitScreen;
    emitFn?.();
  }, [onScreen, onEnterScreen, onExitScreen]);

  return <Box ref={ref}>{children}</Box>;
}
