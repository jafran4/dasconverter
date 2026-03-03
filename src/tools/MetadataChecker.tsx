import { useState } from 'react';
import exifr from 'exifr/dist/lite.esm.mjs';
import { Dropzone } from '@/src/components/Dropzone';
import { Search, Info, ArrowLeft, Loader2, FileJson, MapPin, Camera, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export const MetadataChecker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsProcessing(true);
    setError(null);
    setMetadata(null);

    try {
      const data = await exifr.parse(selectedFile, {
        tiff: true,
        exif: true,
        gps: true,
        iptc: true,
        xmp: true,
        icc: true,
      });
      
      if (!data) {
        setError('No metadata found in this file.');
      } else {
        setMetadata(data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to parse metadata. The file might be corrupted or unsupported.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatValue = (val: any): string => {
    if (val === null || val === undefined) return 'N/A';
    if (val instanceof Date) return val.toLocaleString();
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
  };

  const renderMetadataSection = (title: string, icon: any, data: any) => {
    if (!data || Object.keys(data).length === 0) return null;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 text-zinc-900">
          <div className="p-2 bg-zinc-100 rounded-lg">
            {icon}
          </div>
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">{key}</p>
              <p className="text-sm text-zinc-900 font-medium break-words">{formatValue(value)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Tools
      </Link>

      <div className="bg-white border border-zinc-200 rounded-3xl p-8 md:p-12 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
            <Search className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">Metadata Checker</h1>
            <p className="text-zinc-500">Extract EXIF, GPS, and other hidden data from images.</p>
          </div>
        </div>

        <Dropzone 
          accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.tiff'] }}
          onDrop={handleDrop}
          multiple={false}
          label="Drop an image here to inspect"
          className="mb-8"
        />

        <AnimatePresence>
          {isProcessing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
              <p className="text-zinc-500">Analyzing file metadata...</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl mb-8 text-sm"
            >
              {error}
            </motion.div>
          )}

          {metadata && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <h2 className="text-xl font-bold text-zinc-900">Results</h2>
                <button 
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `metadata_${file?.name}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <FileJson className="w-4 h-4" />
                  Export JSON
                </button>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <Camera className="w-5 h-5 text-zinc-400 mb-2" />
                  <p className="text-xs text-zinc-400 uppercase font-bold">Camera</p>
                  <p className="text-sm font-semibold text-zinc-900 truncate">{metadata.Make || 'Unknown'} {metadata.Model || ''}</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <Calendar className="w-5 h-5 text-zinc-400 mb-2" />
                  <p className="text-xs text-zinc-400 uppercase font-bold">Date</p>
                  <p className="text-sm font-semibold text-zinc-900 truncate">{metadata.DateTimeOriginal ? new Date(metadata.DateTimeOriginal).toLocaleDateString() : 'Unknown'}</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <MapPin className="w-5 h-5 text-zinc-400 mb-2" />
                  <p className="text-xs text-zinc-400 uppercase font-bold">Location</p>
                  <p className="text-sm font-semibold text-zinc-900 truncate">{metadata.latitude ? `${metadata.latitude.toFixed(4)}, ${metadata.longitude.toFixed(4)}` : 'No GPS'}</p>
                </div>
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <Info className="w-5 h-5 text-zinc-400 mb-2" />
                  <p className="text-xs text-zinc-400 uppercase font-bold">Format</p>
                  <p className="text-sm font-semibold text-zinc-900 truncate">{file?.type.split('/')[1].toUpperCase() || 'Unknown'}</p>
                </div>
              </div>

              {/* Detailed Sections */}
              <div className="space-y-6">
                {renderMetadataSection('Full Metadata', <FileJson className="w-4 h-4" />, metadata)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
