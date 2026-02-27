import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SemesterCardProps {
  id: number;
  name: string;
  subjects: number;
  progress: number;
  index?: number;
}

const SemesterCard = ({ id, name, subjects, progress, index = 0 }: SemesterCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ y: -6, boxShadow: "var(--shadow-elevated)" }}
  >
    <Link to={`/semester/${id}`} className="block glass rounded-2xl p-6 group cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="gradient-primary rounded-xl p-3">
          <BookOpen className="h-5 w-5 text-primary-foreground" />
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subjects} Subjects</p>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: index * 0.08 + 0.3, duration: 0.8 }}
            className="h-full rounded-full gradient-primary"
          />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default SemesterCard;
