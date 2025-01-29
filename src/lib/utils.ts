import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const assetNameMapping: Record<string, string> = {
  'fetch:/models/isnet_fp16': '🧠 Loading AI Brain',
  'fetch:/onnxruntime-web/ort-wasm-simd-threaded.wasm': '🎨 Loading Artist Skills',
  'fetch:/onnxruntime-web/ort-wasm-simd-threaded.mjs': '🔮 Loading Magic Powers',
};

export const getFriendlyName = (key: string) => {
  return assetNameMapping[key] || '📦 Loading Asset';
};

export const formatDate = (date: Date) => {
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  return `${formattedDate}-${formattedTime}`;
};