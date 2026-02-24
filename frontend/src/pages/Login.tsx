import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, Brain } from "lucide-react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch {
      // handled globally
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your AI-assisted diagnosis"
    >
      {/* Header icon */}
      <div className="flex justify-center mb-8 relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full w-16 h-16 mx-auto" />
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black/50 border border-white/10 shadow-inner relative z-10 hover:border-primary/50 transition-colors duration-300">
          <Brain className="h-8 w-8 text-primary" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80 font-medium">Email Address</Label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder="doctor@hospital.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="pl-11 h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive font-medium mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white/80 font-medium">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="pl-11 h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all rounded-xl"
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-destructive font-medium mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(0,195,255,0.3)] bg-primary hover:bg-primary/90 text-black transition-all hover:scale-[1.02]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-white/60">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-bold hover:text-white transition-colors ml-1"
          >
            Create one now
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
