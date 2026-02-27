import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageWrapper from "@/components/PageWrapper";
import LeaderboardCard from "@/components/LeaderboardCard";
import { fetchLeaderboard } from "@/lib/api";

const LeaderboardPage = () => {
  const [entries, setEntries] = useState<Awaited<ReturnType<typeof fetchLeaderboard>>>([]);

  useEffect(() => {
    fetchLeaderboard().then(setEntries);
  }, []);

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageWrapper className="container mx-auto px-6 pt-24 pb-12">
        <h1 className="font-display text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground mb-8">Top contributors making learning better for everyone</p>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-12">
          {[top3[1], top3[0], top3[2]].filter(Boolean).map((entry, i) => {
            const heights = [160, 200, 130];
            const order = [2, 1, 3];
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="gradient-primary rounded-full h-16 w-16 flex items-center justify-center text-primary-foreground font-bold text-lg mb-3">
                  {entry.avatar}
                </div>
                <p className="font-semibold text-sm mb-1">{entry.name.split(" ")[0]}</p>
                <p className="text-xs text-muted-foreground mb-2">{entry.points} pts</p>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: heights[i] }}
                  transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                  className={`w-24 rounded-t-2xl flex items-start justify-center pt-4 ${
                    order[i] === 1
                      ? "gradient-primary"
                      : order[i] === 2
                      ? "bg-secondary"
                      : "bg-secondary"
                  }`}
                >
                  <Trophy className={`h-6 w-6 ${order[i] === 1 ? "text-primary-foreground" : "text-muted-foreground"}`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* List */}
        <div className="space-y-3 max-w-2xl mx-auto">
          {rest.map((entry, i) => (
            <LeaderboardCard key={entry.id} {...entry} index={i} />
          ))}
        </div>
      </PageWrapper>
    </div>
  );
};

export default LeaderboardPage;
