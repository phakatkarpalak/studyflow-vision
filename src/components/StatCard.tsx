import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  index?: number;
}

const StatCard = ({ label, value, icon: Icon, trend, index = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    whileHover={{ y: -4, boxShadow: "var(--shadow-elevated)" }}
    className="glass rounded-2xl p-5"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-bold">{value}</p>
        {trend && <p className="mt-1 text-xs text-success">{trend}</p>}
      </div>
      <div className="gradient-primary rounded-xl p-2.5">
        <Icon className="h-5 w-5 text-primary-foreground" />
      </div>
    </div>
  </motion.div>
);

export default StatCard;
