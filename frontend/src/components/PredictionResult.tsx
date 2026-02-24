import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, Brain, Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface PredictionResultProps {
  tumorType: string;
  confidence: number;
  hasTumor: boolean;
}

export function PredictionResult({ tumorType, confidence, hasTumor }: PredictionResultProps) {
  const isHighConfidence = confidence >= 85;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-3xl p-1"
    >
      <div className={cn(
        "absolute inset-0 rounded-3xl blur-xl opacity-20",
        hasTumor ? "bg-destructive/50" : "bg-success/50"
      )} />

      <div className="relative glass border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner border',
              hasTumor ? 'bg-destructive/20 border-destructive/30 shadow-[0_0_20px_rgba(255,50,50,0.3)]' : 'bg-success/20 border-success/30 shadow-[0_0_20px_rgba(50,255,100,0.2)]'
            )}
          >
            {hasTumor ? (
              <AlertTriangle className="h-8 w-8 text-destructive drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
            ) : (
              <CheckCircle2 className="h-8 w-8 text-success drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold font-['Outfit'] text-white">Analysis Complete</h3>
            <p className="text-sm text-white/60 font-medium">
              Diagnostic inference successfully computed
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Tumor Type */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-primary/20 transition-colors" />
            <div className="flex items-center gap-4 mb-2 sm:mb-0 relative z-10">
              <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <span className="font-semibold text-white/70">Classification Result</span>
            </div>
            <span className={cn(
              "text-3xl font-bold tracking-tight text-glow relative z-10 font-['Outfit']",
              hasTumor ? "text-white" : "text-white"
            )}>
              {tumorType}
            </span>
          </div>

          {/* Confidence */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-white/50" />
                <span className="font-semibold text-white/70">Confidence Level</span>
              </div>
              <div className="flex items-center gap-3">
                {isHighConfidence && (
                  <span className="hidden sm:inline-flex px-2 py-1 text-xs rounded-md bg-success/20 text-success border border-success/30 font-bold">
                    HIGH CONFIDENCE
                  </span>
                )}
                <span className="text-2xl font-bold text-white font-['Outfit']">{confidence.toFixed(1)}%</span>
              </div>
            </div>

            <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-white/10 relative z-10 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `\${confidence}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className={cn(
                  'h-full rounded-full relative',
                  confidence >= 80 ? 'bg-success shadow-[0_0_15px_rgba(50,255,100,0.5)]' : confidence >= 60 ? 'bg-primary shadow-[0_0_15px_rgba(0,195,255,0.5)]' : 'bg-warning shadow-[0_0_15px_rgba(255,200,50,0.5)]'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center pt-4">
            <span
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-bold shadow-xl border',
                hasTumor
                  ? 'bg-destructive/20 text-destructive border-destructive/30 shadow-[0_0_20px_rgba(255,0,0,0.15)]'
                  : 'bg-success/20 text-success border-success/30 shadow-[0_0_20px_rgba(0,255,0,0.15)]'
              )}
            >
              {hasTumor ? (
                <>
                  <AlertTriangle className="h-5 w-5" />
                  Tumor Detected
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  No Tumor Detected
                </>
              )}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-white/40 bg-white/5 py-3 rounded-xl">
          <Sparkles className="h-4 w-4" />
          <p className="text-sm font-medium">
            AI-assisted analysis. Always verify clinical findings with a certified radiologist.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
