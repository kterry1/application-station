import { ToastPosition } from "@chakra-ui/react";

type ToastStatusType =
  | "loading"
  | "error"
  | "info"
  | "warning"
  | "success"
  | undefined;

interface ToastNotificationProps {
  toast: (options: {
    title: string;
    status: ToastStatusType;
    position: ToastPosition;
    variant: string;
    duration: number;
    isClosable: boolean;
  }) => void;
  message: string;
  status: ToastStatusType;
}

export const toastNotification = ({
  toast,
  message,
  status,
}: ToastNotificationProps) => {
  return toast({
    title: message,
    status: status,
    position: "top-left",
    variant: "subtle",
    duration: 4000,
    isClosable: true,
  });
};
