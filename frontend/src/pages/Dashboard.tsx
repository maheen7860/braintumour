import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Brain,
  TrendingUp,
  Activity,
  ScanLine,
  Trash2,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { predictionAPI } from "@/lib/api";
import { motion } from "framer-motion";

interface Prediction {
  _id: string;
  tumorType: string;
  confidence: number;
  hasTumor: boolean;
  createdAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Dashboard() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await predictionAPI.history();
        setPredictions(data);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await predictionAPI.delete(id);
      setPredictions((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const totalPredictions = predictions.length;
  const lastPrediction = predictions[0];
  const tumorDetections = predictions.filter((p) => p.hasTumor).length;

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-12 max-w-7xl mx-auto"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between bg-card/40 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
              <Sparkles className="h-3 w-3" /> Dashboard
            </div>
            <h1 className="text-4xl text-glow font-bold font-['Outfit']">Analysis Overview</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Monitor your MRI scans and AI prediction metrics.
            </p>
          </div>

          <Button asChild size="lg" className="rounded-full shadow-[0_0_15px_rgba(0,195,255,0.3)] bg-primary hover:bg-primary/90 hover:scale-105 transition-all text-black font-semibold">
            <Link to="/predict">
              <ScanLine className="h-5 w-5 mr-2" />
              New Analysis
            </Link>
          </Button>
        </motion.div>

        {/* STATS */}
        <motion.div variants={itemVariants} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Analyses"
            value={totalPredictions}
            subtitle="Lifetime scans processed"
            icon={Brain}
          />
          <StatCard
            title="Last Detection Result"
            value={lastPrediction?.tumorType || "—"}
            subtitle={
              lastPrediction
                ? new Date(lastPrediction.createdAt).toLocaleString()
                : "Awaiting data"
            }
            icon={Activity}
          />
          <StatCard
            title="Positive Detections"
            value={`${totalPredictions > 0
                ? Math.round((tumorDetections / totalPredictions) * 100)
                : 0
              }%`}
            subtitle={`${tumorDetections} identified cases`}
            icon={TrendingUp}
          />
        </motion.div>

        {/* TABLE */}
        <motion.div variants={itemVariants} className="rounded-3xl border border-white/5 bg-card/60 backdrop-blur-xl shadow-2xl p-8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-['Outfit'] text-glow">
              Recent Predictions
            </h2>
            {totalPredictions > 0 && (
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                {totalPredictions} Records
              </Badge>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-24">
              <div className="relative flex justify-center items-center">
                <div className="absolute animate-ping h-20 w-20 rounded-full bg-primary/30" />
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full shadow-[0_0_15px_hsl(var(--primary))]" />
              </div>
            </div>
          ) : predictions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-black/20 rounded-2xl border border-white/5">
              <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/20">
                <Clock className="h-10 w-10 text-primary opacity-80" />
              </div>
              <p className="text-xl font-medium mb-3">No predictions found</p>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Get started by running your first AI-assisted MRI analysis.
              </p>
              <Button asChild className="rounded-full shadow-[0_0_15px_rgba(0,195,255,0.3)]">
                <Link to="/predict">Run First Analysis</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10 mt-2">
              <Table>
                <TableHeader className="bg-black/40">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="font-semibold py-4 pl-6 text-white/70">Date</TableHead>
                    <TableHead className="font-semibold text-white/70">Classification</TableHead>
                    <TableHead className="font-semibold text-white/70">Confidence</TableHead>
                    <TableHead className="font-semibold text-white/70">Status</TableHead>
                    <TableHead className="text-right font-semibold py-4 pr-6 text-white/70">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictions.map((p) => (
                    <TableRow key={p._id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="pl-6 py-4 text-muted-foreground">
                        {new Date(p.createdAt).toLocaleDateString()}{" "}
                        <span className="text-white/30 text-xs ml-1">{new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </TableCell>

                      <TableCell className="font-medium">
                        {p.tumorType === 'No Tumor' ? (
                          <span className="text-white/80">{p.tumorType}</span>
                        ) : (
                          <span className="text-glow text-white truncate max-w-[150px] inline-block">{p.tumorType}</span>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-black/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full \${p.confidence > 90 ? 'bg-success' : p.confidence > 75 ? 'bg-primary' : 'bg-warning'}`}
                              style={{ width: `\${p.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm">{p.confidence.toFixed(1)}%</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "px-3 py-1 text-xs uppercase tracking-wider font-bold",
                            p.hasTumor
                              ? "badge-destructive"
                              : "badge-success"
                          )}
                        >
                          {p.hasTumor ? "Tumor Detected" : "Clear"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right pr-6">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(p._id)}
                          className="hover:bg-destructive/20 hover:text-destructive group rounded-full transition-all"
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}