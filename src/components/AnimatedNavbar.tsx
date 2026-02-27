import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Knowledge Graph", path: "/knowledge-graph" },
  { label: "Exam Mode", path: "/exam-mode" },
  { label: "Leaderboard", path: "/leaderboard" },
];

const AnimatedNavbar = () => {
  const { pathname } = useLocation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-xl">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold">StudyPath</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-block rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/upload">
            <Button size="sm" variant="outline" className="gap-1.5 rounded-xl">
              <Sparkles className="h-4 w-4" /> Upload
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="gradient-primary rounded-xl border-0 text-primary-foreground">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default AnimatedNavbar;
