import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, BookOpen } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageWrapper from "@/components/PageWrapper";
import TimelineStep from "@/components/TimelineStep";
import { Button } from "@/components/ui/button";
import { generateExamPlan } from "@/lib/api";

const ExamModePage = () => {
  const [plan, setPlan] = useState<Awaited<ReturnType<typeof generateExamPlan>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(10);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateExamPlan(1, days);
    setPlan(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageWrapper className="container mx-auto px-6 pt-24 pb-12">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="gradient-primary rounded-3xl p-8 text-primary-foreground mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-6 w-6" />
            <span className="text-sm font-medium opacity-90">EXAM MODE</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Exam in {days} days?</h1>
          <p className="mt-2 opacity-90 max-w-lg">
            Let us generate a personalized study plan based on priority topics, PYQs, and recommended study sequence.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 glass rounded-xl px-4 py-2">
              <label className="text-sm font-medium text-foreground">Days left:</label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                min={1}
                max={60}
                className="w-16 bg-transparent text-foreground font-bold text-lg outline-none"
              />
            </div>
            <Button
              onClick={handleGenerate}
              variant="secondary"
              className="rounded-xl gap-2"
              disabled={loading}
            >
              <Zap className="h-4 w-4" />
              {loading ? "Generating..." : "Generate Study Plan"}
            </Button>
          </div>
        </motion.div>

        {plan && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Priority Topics */}
            <div>
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Priority Topics
              </h2>
              <div className="space-y-3">
                {plan.priorities.map((p, i) => (
                  <motion.div
                    key={p.topic}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold">{p.topic}</p>
                      <p className="text-sm text-muted-foreground">{p.estimatedHours}h estimated</p>
                    </div>
                    <span className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                      p.weight === "high"
                        ? "gradient-primary text-primary-foreground"
                        : p.weight === "medium"
                        ? "gradient-accent text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}>
                      {p.weight}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Study Timeline
              </h2>
              <div>
                {plan.timeline.map((step, i) => (
                  <TimelineStep key={step.day} {...step} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default ExamModePage;
