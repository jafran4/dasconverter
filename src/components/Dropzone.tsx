import { useDropzone, Accept } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DropzoneProps {
  label?: string;
  className?: string;
  files?: File[];
  onRemove?: (index: number) => void;
  accept?: Accept;
  onDrop?: (acceptedFiles: File[]) => void;
  multiple?: boolean;
}

export const Dropzone = ({ label, className, files, onRemove, ...props }: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(props as any);

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-200",
          isDragActive 
            ? "border-zinc-900 bg-zinc-50 scale-[0.99]" 
            : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center">
            <Upload className="w-6 h-6 text-zinc-600" />
          </div>
          <div>
            <p className="text-lg font-medium text-zinc-900">
              {label || "Click to upload or drag and drop"}
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              {props.accept ? `Supports: ${Object.values(props.accept).flat().join(', ')}` : "Any file type"}
            </p>
          </div>
        </div>
      </div>

      {files && files.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <File className="w-5 h-5 text-zinc-400" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-zinc-900 truncate">{file.name}</p>
                  <p className="text-xs text-zinc-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              {onRemove && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                  className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
