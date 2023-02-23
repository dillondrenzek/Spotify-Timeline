import React, { ReactNode, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useOnScreen } from '../hooks/use-on-screen';

interface ScreenDetectorProps {
  children?: ReactNode;
  onEnterScreen?: () => void;
  onExitScreen?: () => void;
}

export function ScreenDetector(props: ScreenDetectorProps) {
  const { children, onEnterScreen, onExitScreen } = props;
  const ref = useRef();

  const onScreen = useOnScreen(ref, '0px');

  useEffect(() => {
    const emitFn = onScreen ? onEnterScreen : onExitScreen;
    emitFn?.();
  }, [onScreen, onEnterScreen, onExitScreen]);

  return <Box ref={ref}>{children}</Box>;
}
