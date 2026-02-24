import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Upload,
  Cpu,
  FileCheck,
  Shield,
  Zap,
  Clock,
  ArrowRight,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#060a11] text-foreground relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-[#00f2fe]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 mx-auto">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(0,195,255,0.4)]">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold tracking-wide text-xl font-['Outfit'] text-white">
              BrainScan <span className="text-primary">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex hover:bg-white/10 text-white/80 hover:text-white">
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild className="shadow-[0_0_20px_rgba(0,195,255,0.3)] bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 rounded-full transition-all hover:scale-105">
              <Link to="/signup">Get Started <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8 ring-1 ring-primary/20 backdrop-blur-md shadow-[0_0_15px_rgba(0,195,255,0.15)]">
              <Sparkles className="h-4 w-4" />
              State-of-the-art Medical AI
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight font-['Outfit']">
              Supercharge your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#00f2fe] to-white relative inline-block text-glow">
                Diagnostic Confidence
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium">
              A premium, ultra-fast deep learning platform designed to analyze brain MRI scans with unparalleled accuracy. Seamlessly bridging the gap between clinical expertise and artificial intelligence.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
              <Button size="lg" asChild className="h-14 px-8 text-lg rounded-full shadow-[0_0_25px_rgba(0,195,255,0.4)] bg-primary hover:bg-primary/90 transition-all hover:scale-105 group font-bold">
                <Link to="/signup">
                  Start Analysis Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 px-8 text-lg rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md transition-all font-semibold"
              >
                <Link to="/login">Access Dashboard</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-24 relative z-10">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-glow font-['Outfit']">
              Intelligent Workflow
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three simple steps to harness the power of convolution neural networks for instant diagnostic insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Upload,
                title: "1. Secure Upload",
                desc: "Upload T1 or T2 weighted MRI scans in standard formats. AES-256 encrypted.",
                delay: 0.1
              },
              {
                icon: Cpu,
                title: "2. Deep Inference",
                desc: "Proprietary CNN architecture processes the image, extracting hierarchical features.",
                delay: 0.3
              },
              {
                icon: FileCheck,
                title: "3. Clinical Report",
                desc: "Get an instantaneous classification result with explicit confidence percentages.",
                delay: 0.5
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: step.delay, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="relative rounded-3xl bg-card/40 border border-white/5 p-8 backdrop-blur-xl group hover:border-primary/30 transition-all duration-300 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/50 border border-white/10 shadow-[0_0_15px_rgba(0,195,255,0.15)] mb-8 group-hover:shadow-[0_0_20px_rgba(0,195,255,0.4)] transition-all">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-['Outfit']">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-24 bg-black/40 relative z-10 border-y border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />

        <div className="container relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Ultra-Fast Inference",
                desc: "Optimized tensor operations deliver predictions in milliseconds, saving crucial time.",
                color: "text-[#00c6ff]",
                bg: "bg-[#00c6ff]/10"
              },
              {
                icon: Shield,
                title: "Enterprise Grade",
                desc: "Completely stateless architecture ensures privacy. HIPAA-ready by design.",
                color: "text-success",
                bg: "bg-success/10"
              },
              {
                icon: Clock,
                title: "Always Available",
                desc: "Deployed on edge-optimized infrastructure resulting in 99.99% uptime.",
                color: "text-warning",
                bg: "bg-warning/10"
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-3xl bg-secondary/30 border border-white/5 p-8 hover:border-white/10 transition-colors"
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 \${f.bg}`}>
                  <f.icon className={`h-7 w-7 \${f.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 font-['Outfit']">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 relative z-10 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel max-w-4xl mx-auto rounded-[3rem] p-12 md:p-20 relative overflow-hidden ring-1 ring-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-[#00f2fe]/10 opacity-50" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Outfit']">
                Experience the Next Era of AI
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto font-medium">
                Set up an account in 30 seconds and start running advanced classification pipelines on medical imaging.
              </p>
              <Button size="lg" asChild className="h-14 px-10 text-lg rounded-full shadow-[0_0_30px_rgba(0,195,255,0.5)] bg-white text-black hover:bg-white/90 hover:scale-105 transition-all font-bold">
                <Link to="/signup">Create Free Account</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 bg-black/60 pt-16 pb-8 relative z-10">
        <div className="container flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-xl font-['Outfit'] tracking-wide">BrainScan <span className="text-primary">AI</span></span>
          </div>

          <nav className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a className="hover:text-primary transition-colors" href="#">Platform</a>
            <a className="hover:text-primary transition-colors" href="#">Security</a>
            <a className="hover:text-primary transition-colors" href="#">API</a>
            <a className="hover:text-primary transition-colors" href="#">Legal</a>
          </nav>

          <p className="text-sm text-white/30 font-medium">
            © 2026 BrainScan AI. Powered by Neural Networks.
          </p>
        </div>
      </footer>
    </div>
  );
}
