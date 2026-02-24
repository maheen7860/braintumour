import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Brain, LayoutDashboard, ScanLine, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/predict', label: 'Prediction', icon: ScanLine },
  { href: '/profile', label: 'Profile', icon: User },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060a11] text-foreground relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[30%] h-[50%] bg-[#00f2fe]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full glass border-b border-white/5 shadow-lg">
        <div className="container flex h-[4.5rem] items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all shadow-[0_0_15px_rgba(0,195,255,0.15)] group-hover:shadow-[0_0_20px_rgba(0,195,255,0.3)]">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="hidden font-bold font-['Outfit'] text-white tracking-wide sm:inline-block text-xl">
              BrainScan <span className="text-primary">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all relative group',
                    isActive
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-3 py-6 hover:bg-white/5 rounded-full transition-colors border border-transparent hover:border-white/10">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:inline-block text-sm font-semibold text-white/90">
                    {user?.name || 'Doctor'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-black/90 backdrop-blur-3xl border-white/10 p-2 rounded-2xl shadow-2xl">
                <div className="px-3 py-3 rounded-xl bg-white/5 mb-2">
                  <p className="text-sm font-bold text-white mb-0.5">{user?.name || 'Doctor'}</p>
                  <p className="text-xs text-white/50">{user?.email || 'doctor@hospital.tech'}</p>
                </div>
                <DropdownMenuSeparator className="bg-white/5" />
                <DropdownMenuItem asChild className="focus:bg-white/10 focus:text-white rounded-lg cursor-pointer py-2.5">
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:bg-destructive/20 focus:text-destructive rounded-lg py-2.5 mt-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Secure Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-white/10 text-white rounded-full h-10 w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-white/5 bg-black/80 backdrop-blur-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="container py-8 md:py-12 relative z-10">{children}</main>
    </div>
  );
}
