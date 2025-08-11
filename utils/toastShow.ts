import Toast from "react-native-toast-message";

export type ToastShowParams = {
  text?: string;
  type: "success" | "error" | "info";
};
export const toastShow = ({ text, type }: ToastShowParams) => {
  Toast.show({
    type: "defaultToast",
    text1: text,
    props: {
      type: type,
    },
  });
};
