import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File;
}

export const ImagePreviewDialog = ({
  open,
  onOpenChange,
  file,
}: ImagePreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[Npx] w-[1080px] max-h-[800px] bg-[#1e1e1e] p-0 border-none [&>button]:text-white [&>button]:hover:text-white [&>button]:hover:bg-[#333333]"
      >
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-lg font-medium">
              {file.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full max-h-[70vh] object-contain rounded"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
