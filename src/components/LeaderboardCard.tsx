import { motion } from "framer-motion";
import { Trophy, Upload, ThumbsUp } from "lucide-react";

interface LeaderboardCardProps {
  name: string;
  avatar: string;
  points: number;
  uploads: number;
  votes: number;
  rank: number;
  index?: number;
}

const rankColors: Record<number, string> = {
  1: "from-[hsl(45,93%,47%)] to-[hsl(35,92%,55%)]",
  2: "from-[hsl(210,10%,70%)] to-[hsl(210,15%,80%)]",
  3: "from-[hsl(30,60%,50%)] to-[hsl(25,50%,60%)]",
};

const LeaderboardCard = ({ name, avatar, points, uploads, votes, rank, index = 0 }: LeaderboardCardProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ x: 4 }}
    className={`glass rounded-2xl p-5 flex items-center gap-4 ${rank <= 3 ? "border-2" : ""}`}
    style={rank <= 3 ? { borderColor: rank === 1 ? "hsl(45 93% 47%)" : rank === 2 ? "hsl(210 10% 70%)" : "hsl(30 60% 50%)" } : {}}
  >
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold text-sm ${
      rank <= 3
        ? `bg-gradient-to-br ${rankColors[rank]} text-primary-foreground`
        : "bg-secondary text-secondary-foreground"
    }`}>
      {rank <= 3 ? <Trophy className="h-4 w-4" /> : `#${rank}`}
    </div>

    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full gradient-primary text-primary-foreground font-semibold text-sm">
      {avatar}
    </div>

    <div className="flex-1 min-w-0">
      <p className="font-semibold truncate">{name}</p>
      <p className="text-sm text-muted-foreground">{points} points</p>
    </div>

    <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
      <span className="flex items-center gap-1"><Upload className="h-3.5 w-3.5" /> {uploads}</span>
      <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {votes}</span>
    </div>
  </motion.div>
);

export default LeaderboardCard;
