import { toast } from "@/core/utils";

const copyText = (text: string, toastMessage: string) => {
  navigator.clipboard.writeText(text);
  toast.success(toastMessage);
};

export default copyText;
