import { removeBackground, preload } from "@imgly/background-removal"
import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import { Loader2, Upload, Image as ImageIcon, Globe, Download, Github, Heart } from "lucide-react"
import { cn } from "./lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"

type Language = 'en' | 'id'

type ProgressMap = {
  [key: string]: {
    current: number;
    total: number;
  };
};

const assetNameMapping: Record<string, string> = {
  'fetch:/models/isnet_fp16': '🧠 Loading AI Brain',
  'fetch:/onnxruntime-web/ort-wasm-simd-threaded.wasm': '🎨 Loading Artist Skills',
  'fetch:/onnxruntime-web/ort-wasm-simd-threaded.mjs': '🔮 Loading Magic Powers',
};

const getFriendlyName = (key: string) => {
  return assetNameMapping[key] || '📦 Loading Asset';
};

const translations = {
  en: {
    title: '100% Free Background Remover',
    originalImage: 'Original Image',
    processedImage: 'Processed Image',
    dragDrop: 'Drag & drop an image here, or click to select one',
    processedWillAppear: 'Processed image will appear here',
    uploadImage: 'Upload Image',
    uploadNewImage: 'Upload New Image',
    downloadImage: 'Download Image',
    processing: 'Processing',
    error: 'An error occurred while processing the image.',
    madeWithLove: 'Made with',
    love: 'love',
    by: 'by',
    starOnGithub: 'Star on GitHub',
    about: 'About',
    contact: 'Contact',
    aboutContent: 'Background Begone is a simple tool to remove backgrounds from images using AI. PS : That cute logo is also made by me.',
    contactContent: 'For any inquiries, please contact me at ifalfahri16@gmail.com',
  },
  id: {
    title: 'Penghapus Latar Belakang 100% Gratis',
    originalImage: 'Gambar Asli',
    processedImage: 'Gambar Diproses',
    dragDrop: 'Seret & lepas gambar di sini, atau klik untuk memilih',
    processedWillAppear: 'Gambar yang diproses akan muncul di sini',
    uploadImage: 'Unggah Gambar',
    uploadNewImage: 'Unggah Gambar Baru',
    downloadImage: 'Unduh Gambar',
    processing: 'Memproses',
    error: 'Terjadi kesalahan saat memproses gambar.',
    madeWithLove: 'Dibuat dengan',
    love: 'cinta',
    by: 'oleh',
    starOnGithub: 'Kasih Star di GitHub',
    about: 'Tentang',
    contact: 'Kontak',
    aboutContent: 'Background Begone adalah alat sederhana untuk menghapus latar belakang dari gambar menggunakan AI. Btw logonya saya juga yang buat loh.',
    contactContent: 'Untuk pertanyaan, silakan hubungi saya di ifalfahri16@gmail.com',
  },
}

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isPreloading, setIsPreloading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language>('en')
  const [downloadProgress, setDownloadProgress] = useState<ProgressMap>({});
  const t = translations[language]

  

  useEffect(() => {
    const userLang = navigator.language || navigator.languages[0]
    setLanguage(userLang.toLowerCase().includes('id') ? 'id' : 'en')
  }, [])

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setOriginalImage(URL.createObjectURL(file))
    setProcessedImage(null)
    setError(null)
    setIsLoading(true)
  
    removeBackground(file)
      .then((blob: Blob) => {
        const url = URL.createObjectURL(blob)
        setProcessedImage(url)
      })
      .catch((err: Error) => {
        setError(t.error)
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [t.error])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} })

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a')
      link.href = processedImage
      const now = new Date()
      const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`
      const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      link.download = `backgroundbegone-${formattedDate}-${formattedTime}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {isPreloading ? (
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
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
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Background Begone</h1>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">{t.about}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.about}</DialogTitle>
                <div className="flex flex-col items-center space-y-4">
                  <img src="/placeholder.svg?height=100&width=100" alt="Background Begone Logo" className="w-24 h-24" />
                  <DialogDescription>{t.aboutContent}</DialogDescription>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">{t.contact}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.contact}</DialogTitle>
                <DialogDescription>
                  {t.contactContent}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('id')}>
                Bahasa Indonesia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">{t.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">{t.originalImage}</h2>
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors h-[300px] flex items-center justify-center",
                    isDragActive ? "border-primary bg-primary/10" : "border-muted hover:border-primary"
                  )}
                >
                  <input {...getInputProps()} />
                  {originalImage ? (
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">{t.dragDrop}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-center">{t.processedImage}</h2>
                <div className={cn(
                  "border-2 rounded-lg p-4 h-[300px] flex items-center justify-center overflow-hidden",
                  processedImage ? "border-primary" : "border-muted"
                )}>
                  {isLoading ? (
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  ) : processedImage ? (
                    <img src={processedImage} alt="Processed" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">{t.processedWillAppear}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {error && (
              <p className="mt-4 text-destructive text-center">{error}</p>
            )}
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={() => document.querySelector('input')?.click()}
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
      </div>
      <footer className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="flex items-center">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            {t.madeWithLove}{' '}
            <span className="group mx-1">
              <span className="transition-colors group-hover:text-red-500">{t.love}</span>
            </span>
            {t.by}{' '}
            <a
              href="https://github.com/ifalfahri"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-semibold hover:underline"
            >
              ifalfahri
            </a>
          </p>
          <div className="flex items-center mt-4 sm:mt-0">
            <a
              href="https://github.com/ifalfahri/background-begone"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:underline"
            >
              <Github className="h-4 w-4 mr-2" />
              {t.starOnGithub}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )}
    </div>
  )
}