import { useState, useRef } from 'react';
import { Dropzone } from '@/src/components/Dropzone';
import { Image as ImageIcon, ArrowLeft, Download, Loader2, Maximize, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const ImageResizer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setAspectRatio(img.width / img.height);
        setPreview(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainAspectRatio) {
      setHeight(Math.round(val / aspectRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainAspectRatio) {
      setWidth(Math.round(val * aspectRatio));
    }
  };

  const resizeImage = async () => {
    if (!preview || !canvasRef.current) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      
      const dataUrl = canvas.toDataURL(`image/${format}`, 0.9);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `resized_${file?.name.split('.')[0]}.${format}`;
      link.click();
      setIsProcessing(false);
    };
    img.src = preview;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Image Resizer</h1>
            <p className="text-zinc-500">Resize and convert images right in your browser.</p>
          </div>
        </div>

        {!preview ? (
          <Dropzone 
            accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] }}
            onDrop={handleDrop}
            multiple={false}
            label="Drop an image here to resize"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="aspect-square bg-zinc-50 rounded-3xl border border-zinc-200 overflow-hidden flex items-center justify-center p-4">
                <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain rounded-xl shadow-lg" />
              </div>
              <button 
                onClick={() => {
                  setPreview(null);
                  setFile(null);
                }}
                className="w-full py-3 text-zinc-500 hover:text-zinc-900 font-medium transition-colors"
              >
                Choose another image
              </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-900 font-bold">
                  <Maximize className="w-5 h-5" />
                  Dimensions
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Width (px)</label>
                    <input 
                      type="number" 
                      value={width}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase">Height (px)</label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-mono"
                    />
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-zinc-600 group-hover:text-zinc-900 transition-colors">Maintain aspect ratio</span>
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-900 font-bold">
                  <Settings2 className="w-5 h-5" />
                  Format
                </div>
                <div className="flex gap-2">
                  {(['png', 'jpeg', 'webp'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-bold uppercase transition-all",
                        format === f 
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={resizeImage}
                disabled={isProcessing || !width || !height}
                className="w-full py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-zinc-900/10"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Resize & Download
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
