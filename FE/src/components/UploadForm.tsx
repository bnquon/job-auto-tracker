import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

interface UploadIconProps {
  className?: string;
}

interface UploadFormProps {
  onConfirm: (file: File) => void;
}

export default function UploadForm({ onConfirm }: UploadFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null): void => {
    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter((file: File) => {
      const fileType = file.type.toLowerCase();
      return (
        fileType === "image/jpeg" ||
        fileType === "image/jpg" ||
        fileType === "image/png"
      );
    });
    setFiles(validFiles);
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
            const file = items[i].getAsFile();
            if (
              file &&
              (file.type === "image/jpeg" ||
                file.type === "image/jpg" ||
                file.type === "image/png")
            ) {
              const fileList = new DataTransfer();
              fileList.items.add(file);
              handleFileSelect(fileList.files);
              break;
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
    onConfirm(files[0]);
    clearFiles();
  };

  const clearFiles = (): void => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit bg-background">
      <div className="max-w-2xl w-full bg-card rounded-lg">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-card-foreground">
              Upload Your File
            </h1>
            <p className="text-muted-foreground">
              Drag and drop your files, click to select, or paste from
              clipboard.
            </p>
          </div>

          <div className="relative w-full">
            <div
              ref={dropZoneRef}
              className={`w-full bg-muted rounded-md border-2 border-dashed p-6 flex flex-col items-center justify-center space-y-4 cursor-pointer transition-all duration-200 ${
                isDragOver
                  ? "border-primary bg-primary/10 scale-105"
                  : "border-muted-foreground hover:border-primary hover:bg-primary/10"
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
              <p className="text-muted-foreground text-center">
                Drag and drop your files here,{" "}
                <span className="text-primary font-medium">
                  click to upload
                </span>
                , or paste from clipboard
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                multiple
                onChange={handleFileInputChange}
              />
            </div>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-md whitespace-nowrap z-10">
                Supported: JPG, PNG
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>

          {/* File preview and upload section */}
          {files.length > 0 && (
            <div className="w-full space-y-4">
              <div className="bg-muted/50 rounded-md p-4">
                <h3 className="font-medium text-card-foreground mb-2">
                  Selected Files:
                </h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground truncate flex-1">
                        {file.name}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between w-full">
            <Button
              disabled={files.length === 0}
              onClick={clearFiles}
              variant="outline"
              className="cursor-pointer"
            >
              Clear
            </Button>
            <Button
              disabled={files.length === 0}
              onClick={handleUpload}
              className="cursor-pointer"
            >
              Upload
            </Button>
          </div>
        </div>
      </div>
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
