import { motion } from "framer-motion";
import { ArrowRight, Brain, BookOpen, Trophy, Zap, Sparkles, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedNavbar from "@/components/AnimatedNavbar";

const floatingIcons = [
  { icon: BookOpen, x: "10%", y: "20%", delay: 0 },
  { icon: Brain, x: "80%", y: "15%", delay: 1 },
  { icon: GraduationCap, x: "15%", y: "70%", delay: 2 },
  { icon: Trophy, x: "85%", y: "65%", delay: 0.5 },
  { icon: Sparkles, x: "50%", y: "80%", delay: 1.5 },
  { icon: Zap, x: "70%", y: "40%", delay: 2.5 },
];

const features = [
  { icon: Brain, title: "Knowledge Graph", desc: "Visualize topic connections like a brain map" },
  { icon: Zap, title: "Exam Mode", desc: "AI-generated study plans for exam prep" },
  { icon: Trophy, title: "Gamified Learning", desc: "Earn points, climb the leaderboard" },
  { icon: BookOpen, title: "Resource Hub", desc: "Notes, PYQs, links — all organized" },
];

const LandingPage = () => (
  <div className="relative min-h-screen overflow-hidden">
    <AnimatedNavbar />

    {/* Floating icons */}
    {floatingIcons.map((item, i) => (
      <motion.div
        key={i}
        className="absolute text-primary/10 pointer-events-none"
        style={{ left: item.x, top: item.y }}
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, delay: item.delay, repeat: Infinity }}
      >
        <item.icon className="h-12 w-12 md:h-16 md:w-16" />
      </motion.div>
    ))}

    {/* Hero */}
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block gradient-primary rounded-full px-4 py-1.5 text-xs font-semibold text-primary-foreground mb-6"
        >
          ✨ Your AI-Powered Study Companion
        </motion.span>

        <h1 className="font-display text-5xl font-extrabold leading-tight md:text-7xl">
          Learn Smarter with{" "}
          <span className="gradient-text">StudyPath</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Organize resources, visualize topic connections, prepare for exams — all in one beautifully designed platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/dashboard">
            <Button size="lg" className="gradient-primary rounded-2xl border-0 text-primary-foreground gap-2 px-8 glow-primary">
              Enter StudyPath <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/knowledge-graph">
            <Button size="lg" variant="outline" className="rounded-2xl gap-2 px-8">
              <Brain className="h-5 w-5" /> Explore Graph
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Gradient orb decorations */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />
    </section>

    {/* Features */}
    <section className="relative px-6 pb-24">
      <div className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, boxShadow: "var(--shadow-elevated)" }}
            className="glass rounded-3xl p-6 text-center"
          >
            <div className="gradient-primary mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
              <f.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </div>
);

export default LandingPage;
