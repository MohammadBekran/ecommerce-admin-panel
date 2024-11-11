import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface IAlertModalProps {
  title: string;
  description: string;
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal = ({
  open,
  title,
  description,
  loading,
  onClose,
  onConfirm,
}: IAlertModalProps) => {
  return (
    <Modal
      open={open}
      title={title}
      description={description}
      onClose={onClose}
    >
      <div className="flex justify-end gap-2">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
