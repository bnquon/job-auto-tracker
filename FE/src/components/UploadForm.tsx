import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Eye } from "lucide-react";
import { ImagePreviewDialog } from "./dialogs/ImagePreviewDialog";

interface UploadIconProps {
  className?: string;
}

interface UploadFormProps {
  onConfirm: (file: File) => void;
}

export default function UploadForm({ onConfirm }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null): void => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    const selectedFile = selectedFiles[0];
    const fileType = selectedFile.type.toLowerCase();

    if (
      fileType === "image/jpeg" ||
      fileType === "image/jpg" ||
      fileType === "image/png"
    ) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    handleFileSelect(e.target.files);
  };

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent): void => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const pastedFile = items[i].getAsFile();
            if (
              pastedFile &&
              (pastedFile.type === "image/jpeg" ||
                pastedFile.type === "image/jpg" ||
                pastedFile.type === "image/png")
            ) {
              setFile(pastedFile);
              toast.success("File pasted");
              break;
            } else {
              toast.error("Invalid file type");
            }
          }
        }
      }
    };

    const handleWindowPaste = (e: ClipboardEvent) => handlePaste(e);
    window.addEventListener("paste", handleWindowPaste);
    return () => window.removeEventListener("paste", handleWindowPaste);
  }, []);

  const handleUpload = (): void => {
    if (file) {
      onConfirm(file);
      clearFile();
    }
  };

  const clearFile = (): void => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit">
      <div className="max-w-2xl w-full rounded-lg">
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-2xl text-[#00d4ff] font-bold">
            Upload Your File
          </h1>

          <div className="relative w-full h-[200px]">
            {file ? (
              <div className="w-full h-full bg-[#2a2a2a]/30 rounded-md border-2 border-[#00d4ff] p-6 flex flex-col items-center justify-center space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-white font-medium text-lg">{file.name}</p>
                  <p className="text-gray-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB / 5.00 MB
                  </p>
                  <Button
                    variant="default"
                    className="cursor-pointer border-2 border-[#00d4ff] bg-transparent hover:bg-gray-700"
                    onClick={() => setIsImagePreviewOpen(true)}
                    size="sm"
                  >
                    <Eye /> View Image
                  </Button>
                </div>
              </div>
            ) : (
              <div
                ref={dropZoneRef}
                className={`w-full h-full bg-[#2a2a2a]/30 rounded-md border-2 border-dashed border-[#444] p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer transition-all duration-200 ${
                  isDragOver
                    ? "border-[#00d4ff] bg-[#00d4ff]/5 scale-105"
                    : "hover:border-[#00d4ff] hover:bg-[#00d4ff]/5"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <UploadIcon
                  className={`h-12 w-12 transition-colors ${
                    isDragOver ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <p className="text-white text-center">
                  Drag and drop your file here, click to upload, or paste from
                  clipboard
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onChange={handleFileInputChange}
                />
              </div>
            )}

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm px-3 py-1 rounded-md whitespace-nowrap z-10">
                Supported: JPG, PNG
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>

          <div className="flex justify-between w-full">
            <Button
              disabled={!file}
              onClick={clearFile}
              variant="outline"
              className="cursor-pointer bg-[#555555] hover:bg-[#444444] hover:text-white text-white border-none"
            >
              Clear
            </Button>
            <Button
              disabled={!file}
              onClick={handleUpload}
              className="cursor-pointer bg-[#00d4ff] hover:bg-[#00b2e0]"
            >
              Upload
            </Button>
          </div>
        </div>
      </div>

      {/* Image Preview Dialog */}
      {isImagePreviewOpen && file && (
        <ImagePreviewDialog
          open={isImagePreviewOpen}
          onOpenChange={setIsImagePreviewOpen}
          file={file}
        />
      )}
    </div>
  );
}

function UploadIcon({ className, ...props }: UploadIconProps) {
  return (
    <svg
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
