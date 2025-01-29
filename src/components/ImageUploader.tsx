import { useDropzone } from "react-dropzone";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, Image as ImageIcon, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageUploaderProps } from "@/lib/types";

const ImageUploader: React.FC<ImageUploaderProps> = ({
  t,
  originalImage,
  processedImage,
  isLoading,
  onDrop,
  handleDownload,
  error,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const pasteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              onDrop([file]);
            }
          }
        }
      }
    };

    const pasteElement = pasteRef.current;
    if (pasteElement) {
      pasteElement.addEventListener("paste", handlePaste);
    }

    return () => {
      if (pasteElement) {
        pasteElement.removeEventListener("paste", handlePaste);
      }
    };
  }, [onDrop]);

  return (
    <Card ref={pasteRef} className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold text-center">
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-md md:text-xl font-semibold text-center">
              {t.originalImage}
            </h2>
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors h-48 md:h-[300px] flex items-center justify-center",
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted hover:border-primary"
              )}
            >
              <input {...getInputProps()} />
              {originalImage ? (
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm md:text-base text-muted-foreground">{t.dragDrop}</p>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-md md:text-xl font-semibold text-center">
              {t.processedImage}
            </h2>
            <div
              className={cn(
                "border-2 rounded-lg p-4 h-48 md:h-[300px] flex items-center justify-center overflow-hidden",
                processedImage ? "border-primary" : "border-muted"
              )}
            >
              {isLoading ? (
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              ) : processedImage ? (
                <img
                  src={processedImage}
                  alt="Processed"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm md:text-base text-muted-foreground">
                    {t.processedWillAppear}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {error && <p className="mt-4 text-destructive text-center">{error}</p>}
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={() => document.querySelector("input")?.click()}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.processing}
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {processedImage ? t.uploadNewImage : t.uploadImage}
              </>
            )}
          </Button>
          {processedImage && (
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              {t.downloadImage}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
