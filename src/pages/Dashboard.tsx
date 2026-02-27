import { motion } from "framer-motion";
import { BookOpen, FileText, Users, TrendingUp, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageWrapper from "@/components/PageWrapper";
import StatCard from "@/components/StatCard";
import SemesterCard from "@/components/SemesterCard";
import SearchBar from "@/components/SearchBar";
import { fetchSemesters } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Resources", value: "1,240", icon: FileText, trend: "+12% this month" },
  { label: "Active Students", value: "340", icon: Users, trend: "+8% this week" },
  { label: "Subjects Covered", value: "42", icon: BookOpen },
  { label: "Contributions", value: "86", icon: TrendingUp, trend: "+23 this week" },
];

const Dashboard = () => {
  const [semesters, setSemesters] = useState<Awaited<ReturnType<typeof fetchSemesters>>>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSemesters().then(setSemesters);
  }, []);

  const filtered = semesters.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageWrapper className="container mx-auto px-6 pt-24 pb-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-primary rounded-3xl p-8 text-primary-foreground mb-8"
        >
          <h1 className="font-display text-3xl font-bold">Welcome back, Alex! 👋</h1>
          <p className="mt-2 opacity-90">You have 3 exams coming up. Let's prepare!</p>
          <Link to="/exam-mode">
            <Button variant="secondary" className="mt-4 rounded-xl">
              Open Exam Mode
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>

        {/* Search + Semesters */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <h2 className="font-display text-2xl font-bold">Semesters</h2>
          <div className="w-full max-w-xs">
            <SearchBar placeholder="Search semesters..." onSearch={setSearch} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s, i) => (
            <SemesterCard key={s.id} {...s} index={i} />
          ))}
        </div>

        {/* FAB */}
        <Link to="/upload">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 gradient-primary rounded-full p-4 shadow-elevated cursor-pointer glow-primary"
          >
            <Plus className="h-6 w-6 text-primary-foreground" />
          </motion.div>
        </Link>
      </PageWrapper>
    </div>
  );
};

export default Dashboard;
