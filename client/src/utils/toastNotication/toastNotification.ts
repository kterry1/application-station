interface ToastNotificationProps {
  toast: (options: {
    title: string;
    status: string;
    position: string;
    variant: string;
    duration: number;
    isClosable: boolean;
  }) => void;
  message: string;
  status: string;
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
