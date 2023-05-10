export const toastNotification = ({ toast, message, status }) => {
  return toast({
    title: message,
    status: status,
    position: "top",
    variant: "solid",
    duration: 4000,
    isClosable: true,
  });
};
