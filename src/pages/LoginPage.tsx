import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-strong rounded-3xl p-8"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold">StudyPath</span>
        </div>

        {/* Role Toggle */}
        <div className="flex rounded-xl bg-secondary p-1 mb-6">
          {(["student", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all ${
                role === r ? "gradient-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <motion.input
              whileFocus={{ boxShadow: "var(--glow-primary)" }}
              className="w-full rounded-xl bg-secondary px-4 py-3 text-sm outline-none transition-shadow"
              placeholder="you@university.edu"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <motion.input
                whileFocus={{ boxShadow: "var(--glow-primary)" }}
                type={showPw ? "text" : "password"}
                className="w-full rounded-xl bg-secondary px-4 py-3 pr-12 text-sm outline-none transition-shadow"
                placeholder="••••••••"
              />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button className="w-full gradient-primary rounded-xl border-0 text-primary-foreground py-6 text-base glow-primary">
            Sign In
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <span className="text-primary font-medium cursor-pointer">Sign up</span>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
