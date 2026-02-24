import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
}

export function FileUpload({
  onFileSelect,
  accept = 'image/*',
  maxSize = 10,
  disabled = false,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPG, PNG, etc).');
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than \${maxSize}MB.`);
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setFileName(file.name);
      onFileSelect(file);
    },
    [maxSize, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [disabled, handleFile]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const clearFile = useCallback(() => {
    setPreview(null);
    setFileName(null);
    setError(null);
    // Reset selection in parent if needed, handled by UI logic typically or can pass null
  }, []);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.label
            key="upload"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              'relative flex flex-col items-center justify-center gap-5 min-h-[280px] rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden group cursor-pointer',
              isDragging
                ? 'border-primary bg-primary/10 shadow-[0_0_40px_rgba(0,195,255,0.2)]'
                : 'border-white/10 bg-black/40 hover:border-primary/50 hover:bg-black/60',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'border-destructive/50 bg-destructive/5 hover:border-destructive'
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

            <input
              type="file"
              accept={accept}
              onChange={handleInputChange}
              disabled={disabled}
              className="hidden"
            />

            <div className={cn(
              "flex h-20 w-20 items-center justify-center rounded-3xl transition-transform duration-500 relative z-10",
              isDragging ? "bg-primary shadow-[0_0_30px_rgba(0,195,255,0.5)] scale-110" : "bg-primary/20 shadow-inner group-hover:scale-110 group-hover:bg-primary/30"
            )}>
              <Upload className={cn("h-8 w-8 transition-colors", isDragging ? "text-black" : "text-primary")} />
            </div>

            <div className="text-center relative z-10 px-6">
              <h3 className="text-xl font-bold font-['Outfit'] text-white mb-2">
                Click to browse or drag and drop
              </h3>
              <p className="text-sm font-medium text-white/50 max-w-[250px] mx-auto">
                High-resolution DICOM, JPG, or PNG preferred.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/40">
                <Sparkles className="w-3 w-3" /> Max size: {maxSize}MB
              </div>
            </div>
          </motion.label>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-black/40 border border-white/10 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[50px] pointer-events-none" />

            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md" />
              <img
                src={preview}
                alt="Scan Preview"
                className="relative h-36 w-36 object-cover rounded-2xl border border-white/10 shadow-lg z-10 hover:scale-[1.02] transition-transform"
              />
              <div className="absolute -top-3 -right-3 z-20">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.5)] hover:scale-110 transition-transform"
                  onClick={clearFile}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/20 border border-success/30 text-success text-xs font-bold mb-3">
                <Sparkles className="h-3 w-3" /> Ready for AI Analysis
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                <p className="text-lg font-bold font-['Outfit'] text-white truncate max-w-[200px] sm:max-w-[300px]">
                  {fileName}
                </p>
              </div>
              <p className="text-sm font-medium text-white/50">
                Image loaded correctly. Proceed to initialize the neural network inference.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm font-bold text-destructive mt-3 text-center bg-destructive/10 py-2 rounded-lg border border-destructive/20">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
