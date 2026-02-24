import { Brain, Mail, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { motion } from "framer-motion";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const email = user?.email || "N/A";
  const name = user?.name || "Doctor";

  return (
    <DashboardLayout>
      <div className="min-h-[calc(100vh-80px)] px-4 py-8 relative">
        <div className="absolute top-[10%] right-[15%] w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 bg-[#00f2fe]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          {/* ================= HEADER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-5"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 shadow-[0_0_30px_rgba(0,195,255,0.2)] border border-primary/20 transition-all duration-300">
              <User className="h-10 w-10 text-primary" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-glow font-['Outfit']">
              Account Profile
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              View and manage your account details and security information.
            </p>
          </motion.div>

          {/* ================= PROFILE CARD ================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-[2.5rem] border border-white/5 bg-card/40 backdrop-blur-2xl p-8 md:p-12 space-y-8 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px]" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/40 border border-white/10 shadow-inner group-hover:border-primary/40 transition-colors">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-['Outfit']">
                Account Information
              </h2>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Name */}
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-black/40 border border-white/5 p-6 hover:bg-black/50 transition-colors">
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/50 mb-1">
                      Full Name
                    </p>
                    <p className="text-lg font-bold text-white font-['Outfit']">
                      {name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-black/40 border border-white/5 p-6 hover:bg-black/50 transition-colors">
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 border border-primary/30">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/50 mb-1">
                      Email Address
                    </p>
                    <p className="text-lg font-bold text-white font-['Outfit']">
                      {email}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-full border border-success/20">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span className="text-xs font-bold text-success">Verified</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 relative z-10">
              <Button variant="outline" disabled className="h-12 px-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold">
                Change Password (Soon)
              </Button>
              <Button variant="outline" disabled className="h-12 px-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold flex items-center gap-2">
                Edit Profile (Soon)
              </Button>
            </div>
          </motion.div>

          {/* ================= SECURITY NOTE ================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2"
          >
            <p className="text-sm text-white/40 max-w-2xl mx-auto">
              Your personal data is encrypted and securely stored.
              This platform is designed for AI-assisted medical analysis and
              follows strict data-privacy principles.
            </p>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
