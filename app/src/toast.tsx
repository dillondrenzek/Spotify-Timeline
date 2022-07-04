import React, { useCallback, useState } from 'react';
import {
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
  SnackbarProps,
  Alert,
  AlertProps,
  Card,
} from '@mui/material';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export function useToast() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<React.ReactNode>('');

  const handleClose = useCallback((reason: SnackbarCloseReason) => {
    setIsOpen(false);
  }, []);

  const showToast = useCallback((message: React.ReactNode) => {
    setMessage(message);
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    message,
    handleClose,
    showToast,
  };
}

export function useErrorToast(): {
  showErrorToast: (message: React.ReactNode) => void;
  toastProps: ToastProps;
} {
  const { handleClose, isOpen, message, showToast } = useToast();

  const showErrorToast = useCallback(
    (message: React.ReactNode) => {
      showToast(message);
    },
    [showToast]
  );

  return {
    toastProps: {
      message,
      onClose: handleClose,
      open: isOpen,
      severity: 'error',
    },
    showErrorToast,
  };
}

interface ToastProps {
  open: SnackbarProps['open'];
  message: React.ReactNode;
  severity: AlertProps['severity'];
  onClose: (reason: SnackbarCloseReason) => void;
}

export function Toast({ onClose, open, message, severity }: ToastProps) {
  const handleClose = useCallback(
    (
      event: Event | React.SyntheticEvent<any, Event>,
      reason: SnackbarCloseReason
    ) => {
      onClose?.(reason);
    },
    [onClose]
  );

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      TransitionComponent={SlideTransition}
    >
      <Card elevation={10}>
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Card>
    </Snackbar>
  );
}
