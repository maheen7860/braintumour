import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  Mail,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);
    // 🔮 Simulated API call (replace later)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  /* ================= SUCCESS STATE ================= */
  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="Secure password reset instructions have been sent"
      >
        <div className="space-y-8 text-center">
          <div className="flex justify-center">
            <div className="flex h-18 w-18 items-center justify-center rounded-full bg-success/10 shadow-inner">
              <CheckCircle2 className="h-9 w-9 text-success" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              If an account exists for
            </p>
            <p className="font-medium text-foreground break-all">
              {email}
            </p>
            <p className="text-xs text-muted-foreground">
              You’ll receive a password reset link shortly.
            </p>
          </div>

          <div className="rounded-xl border border-success/20 bg-success/5 p-4 flex items-center gap-3 text-left">
            <ShieldCheck className="h-5 w-5 text-success flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              For security reasons, password reset links expire automatically.
              If you don’t see the email, check your spam folder.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
            >
              Try another email
            </Button>

            <Button asChild className="w-full">
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  /* ================= FORM STATE ================= */
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your registered email to reset your password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending secure link...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </form>
    </AuthLayout>
  );
}