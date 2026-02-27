import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [showPw, setShowPw] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.status !== "success") {
        throw new Error(data.message);
      }

      alert("Login successful!");
      navigate("/dashboard");

    } catch (err) {
      alert("Invalid username or password");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
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

        {/* Role Toggle (UI only for now) */}
        <div className="flex rounded-xl bg-secondary p-1 mb-6">
          {(["student", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-all ${
                role === r
                  ? "gradient-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Username</label>
            <motion.input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl bg-secondary px-4 py-3 text-sm outline-none"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <motion.input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPw ? "text" : "password"}
                className="w-full rounded-xl bg-secondary px-4 py-3 pr-12 text-sm outline-none"
                placeholder="••••••••"
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full gradient-primary rounded-xl py-6 text-base"
          >
            Sign In
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;