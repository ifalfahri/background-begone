export interface Translations {
    title: string;
    originalImage: string;
    processedImage: string;
    dragDrop: string;
    processedWillAppear: string;
    uploadImage: string;
    uploadNewImage: string;
    downloadImage: string;
    processing: string;
    error: string;
    madeWithLove: string;
    love: string;
    by: string;
    starOnGithub: string;
    about: string;
    contact: string;
    aboutContent: string;
    contactContent: string;
  }
  
  export interface ImageUploaderProps {
    t: Translations;
    originalImage: string | null;
    processedImage: string | null;
    isLoading: boolean;
    onDrop: (acceptedFiles: File[]) => void;
    handleDownload: () => void;
    error: string | null;
  }
  
  export interface HeaderProps {
    t: Translations;
    setLanguage: (language: 'en' | 'id') => void;
  }

  export interface LanguageSwitcherProps {
    setLanguage: (language: 'en' | 'id') => void;
  }
  
  export interface FooterProps {
    t: Translations;
  }
  
  export interface DialogProps {
    t: Translations;
  }