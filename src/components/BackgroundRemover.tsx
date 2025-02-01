import { removeBackground, preload, Config } from "@imgly/background-removal";
import { useState, useCallback, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploader from '@/components/ImageUploader';
import translations from '@/lib/translations';
import { getFriendlyName, formatDate } from '@/lib/utils';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const [downloadProgress, setDownloadProgress] = useState<Record<string, { current: number; total: number }>>({});
  const t = translations[language];

  useEffect(() => {
    const userLang = navigator.language || navigator.languages[0];
    setLanguage(userLang.toLowerCase().includes('id') ? 'id' : 'en');
  }, []);

  useEffect(() => {
    const config = {
      progress: (key: string, current: number, total: number) => {
        setDownloadProgress(prev => ({
          ...prev,
          [key]: { current, total }
        }));
      }
    };

    preload(config)
      .then(() => {
        console.log("Asset preloading succeeded");
        setIsPreloading(false);
      })
      .catch((err: Error) => {
        console.error("Asset preloading failed:", err);
        setError(t.error);
        setIsPreloading(false);
      });
  }, [t.error]);

  const config: Config = useMemo(() => ({
    output: {
      quality: 1.0,
    }
  }), []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setOriginalImage(URL.createObjectURL(file));
    setProcessedImage(null);
    setError(null);
    setIsLoading(true);

    removeBackground(file, config)
      .then((blob: Blob) => {
        const url = URL.createObjectURL(blob);
        setProcessedImage(url);
      })
      .catch((err: Error) => {
        setError(t.error);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [t.error, config]);

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      const now = new Date();
      link.download = `backgroundbegone-${formatDate(now)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {isPreloading ? (
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          {Object.entries(downloadProgress).map(([key, { current, total }]) => (
            <div key={key} className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground">
                {getFriendlyName(key)}: {Math.round((current / total) * 100)}%
              </div>
              <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(current / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <Header t={t} setLanguage={setLanguage} />
          <div className="flex-grow flex items-center justify-center p-4">
            <ImageUploader
              t={t}
              originalImage={originalImage}
              processedImage={processedImage}
              isLoading={isLoading}
              onDrop={onDrop}
              handleDownload={handleDownload}
              error={error}
            />
          </div>
          <Footer t={t} />
        </>
      )}
    </div>
  );
}