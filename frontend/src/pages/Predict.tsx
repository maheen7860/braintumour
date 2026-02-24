import { useState } from "react";
import { predictionAPI } from "@/lib/api";
import { FileUpload } from "@/components/FileUpload";
import { PredictionResult } from "@/components/PredictionResult";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, UploadCloud, Activity, Sparkles, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
};

const Predict = () => {
  const [file, setFile] = useState<File | null>(null);
  const [tumorType, setTumorType] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [hasTumor, setHasTumor] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!file) return;
    setError(null);

    try {
      setLoading(true);
      const res = await predictionAPI.predict(file);
      const data = res.data ?? res;

      setTumorType(data.tumorType);
      setConfidence(data.confidence);
      setHasTumor(data.hasTumor);
    } catch (err: any) {
      console.error("❌ Prediction failed", err);
      const errorMsg = err.response?.data?.details || err.response?.data?.message || err.message || "Unknown error";
      setError(`Prediction failed: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-80px)] px-4 py-8 relative">
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-[#00f2fe]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-12 relative z-10"
        >
          {/* ================= HEADER ================= */}
          <motion.div variants={itemVariants} className="text-center space-y-5">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 shadow-[0_0_30px_rgba(0,195,255,0.2)] border border-primary/20 rotate-3 hover:rotate-0 transition-all duration-300">
              <Brain className="h-10 w-10 text-primary" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-glow font-['Outfit']">
              Brain Scan Analysis
            </h1>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Drop an MRI scan below and our robust neural network will analyze it within seconds, returning a high-confidence diagnostic report.
            </p>
          </motion.div>

          {/* ================= STEP 1 ================= */}
          <motion.div variants={itemVariants} className="rounded-[2.5rem] border border-white/5 bg-card/40 backdrop-blur-2xl p-8 md:p-12 space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px]" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 border border-white/10 shadow-inner group-hover:border-primary/40 transition-colors">
                  <UploadCloud className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-['Outfit']">
                    1. Upload Target Image
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accepts clear JPG or PNG scans.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex px-4 py-2 bg-black/30 rounded-full border border-white/5 text-xs text-white/50 font-medium items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary" /> Secure Process
              </div>
            </div>

            <div className="relative z-10">
              <FileUpload
                onFileSelect={(selectedFile) => setFile(selectedFile)}
                disabled={loading}
              />
            </div>

            {/* ================= STEP 2 ================= */}
            <AnimatePresence>
              {file && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="flex justify-center border-t border-white/10 pt-8"
                >
                  <Button
                    onClick={handlePredict}
                    disabled={loading}
                    size="lg"
                    className="h-16 px-12 text-lg rounded-full shadow-[0_0_25px_rgba(0,195,255,0.4)] bg-primary hover:bg-primary/90 hover:scale-105 transition-all text-black font-bold group w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin mr-3" />
                        Processing Convolutional Layers...
                      </>
                    ) : (
                      <>
                        <Activity className="h-6 w-6 mr-3" />
                        Initialize Inference
                        <ChevronRight className="w-5 h-5 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ================= ERROR MESSAGE ================= */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-3xl border border-destructive/50 bg-destructive/10 backdrop-blur p-6 flex flex-col items-center text-center shadow-[0_0_30px_rgba(255,0,0,0.1)]"
              >
                <p className="text-destructive font-bold text-lg">{error}</p>
                <p className="text-sm text-white/60 mt-2">
                  Verify the image format or your network connection and retry.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= STEP 3 ================= */}
          <AnimatePresence>
            {tumorType && confidence !== null && hasTumor !== null && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="pt-8"
              >
                <div className="text-center space-y-2 mb-8 inline-block mx-auto">
                  <div className="inline-flex px-4 py-1.5 rounded-full bg-success/20 border border-success/30 text-success text-sm font-semibold mb-2">
                    Analysis Complete
                  </div>
                  <h2 className="text-2xl font-bold font-['Outfit']">
                    Diagnostic Report Details
                  </h2>
                </div>

                <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-50" />
                  <div className="relative z-10 w-full">
                    <PredictionResult
                      tumorType={tumorType}
                      confidence={confidence}
                      hasTumor={hasTumor}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Predict;
