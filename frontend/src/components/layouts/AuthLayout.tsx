import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#060a11] relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00f2fe]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="p-6 relative z-10 mx-auto w-full max-w-7xl flex justify-center sm:justify-start">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 border border-white/10 shadow-[0_0_15px_rgba(0,195,255,0.2)] group-hover:border-primary/40 transition-colors">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-2xl font-['Outfit'] text-white tracking-wide group-hover:text-primary transition-colors">
            BrainScan <span className="text-primary group-hover:text-white transition-colors">AI</span>
          </span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10 w-full animate-in fade-in zoom-in-95 duration-500">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-['Outfit'] text-glow text-white mb-3">{title}</h1>
            <p className="text-lg text-white/60 font-medium">{subtitle}</p>
          </div>

          {/* Card */}
          <div className="auth-card relative border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[2rem] pointer-events-none" />
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-8 text-center relative z-10">
        <p className="text-sm font-medium text-white/30">
          © 2026 BrainScan AI. Neural Network Powered.
        </p>
      </footer>
    </div>
  );
}
