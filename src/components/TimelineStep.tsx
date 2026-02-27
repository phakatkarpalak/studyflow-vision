import { motion } from "framer-motion";
import { BookOpen, ClipboardList, RotateCcw } from "lucide-react";

interface TimelineStepProps {
  day: number;
  topic: string;
  type: string;
  index?: number;
}

const typeConfig: Record<string, { icon: typeof BookOpen; color: string }> = {
  study: { icon: BookOpen, color: "gradient-primary" },
  practice: { icon: ClipboardList, color: "gradient-accent" },
  revision: { icon: RotateCcw, color: "bg-success" },
};

const TimelineStep = ({ day, topic, type, index = 0 }: TimelineStepProps) => {
  const config = typeConfig[type] || typeConfig.study;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center">
        <div className={`${config.color} rounded-full p-2`}>
          <Icon className="h-4 w-4 text-primary-foreground" />
        </div>
        {<div className="w-0.5 flex-1 bg-border mt-2" />}
      </div>
      <div className="pb-8">
        <p className="text-xs font-medium text-muted-foreground">Day {day}</p>
        <p className="font-semibold">{topic}</p>
        <span className="mt-1 inline-block rounded-lg bg-secondary px-2 py-0.5 text-xs capitalize text-secondary-foreground">
          {type}
        </span>
      </div>
    </motion.div>
  );
};

export default TimelineStep;
