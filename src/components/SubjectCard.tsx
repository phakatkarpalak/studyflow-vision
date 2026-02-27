import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SubjectCardProps {
  id: number;
  name: string;
  code: string;
  resources: number;
  semesterId: number;
  index?: number;
}

const SubjectCard = ({ id, name, code, resources, semesterId, index = 0 }: SubjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ y: -4, boxShadow: "var(--shadow-elevated)" }}
  >
    <Link to={`/semester/${semesterId}/subject/${id}`} className="block glass rounded-2xl p-6 group">
      <div className="flex items-center justify-between">
        <span className="gradient-accent rounded-lg px-2.5 py-1 text-xs font-semibold text-primary-foreground">{code}</span>
        <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold">{name}</h3>
      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        <FileText className="h-4 w-4" />
        <span>{resources} Resources</span>
      </div>
    </Link>
  </motion.div>
);

export default SubjectCard;
