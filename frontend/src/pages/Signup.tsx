import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, User, Brain } from "lucide-react";

export default function Signup() {
  const { register, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);
    } catch {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your journey with unified AI assistance"
    >
      {/* Header icon */}
      <div className="flex justify-center mb-8 relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full w-16 h-16 mx-auto" />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/50 border border-white/10 shadow-inner relative z-10 hover:border-primary/50 transition-colors duration-300">
          <Brain className="h-8 w-8 text-primary" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/80 font-medium">Full Name</Label>
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              id="name"
              type="text"
              placeholder="Dr. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-11 h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80 font-medium">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-11 h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/80 font-medium">Password</Label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-11 h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white/80 font-medium">Confirm Password</Label>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-11 h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive font-medium text-center mt-2 bg-destructive/10 py-2 rounded-lg border border-destructive/20">{error}</p>
        )}

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(0,195,255,0.3)] bg-primary hover:bg-primary/90 text-black transition-all hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Setting up workspace...
              </>
            ) : (
              "Initialize Account"
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-bold hover:text-white transition-colors ml-1"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
