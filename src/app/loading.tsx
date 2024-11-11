import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="size-full fixed top-0 left-0 flex justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
