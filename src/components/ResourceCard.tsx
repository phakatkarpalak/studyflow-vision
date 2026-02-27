import { motion } from "framer-motion";
import { Download, ExternalLink, ThumbsUp, FileText, ClipboardList, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceCardProps {
  title: string;
  type: "notes" | "pyq" | "link";
  author: string;
  votes: number;
  downloads: number;
  date: string;
  url?: string;
  index?: number;
}

const typeConfig = {
  notes: { icon: FileText, label: "Notes", className: "gradient-primary" },
  pyq: { icon: ClipboardList, label: "PYQ", className: "gradient-accent" },
  link: { icon: Link2, label: "Link", className: "bg-success" },
};

const ResourceCard = ({ title, type, author, votes, downloads, date, url, index = 0 }: ResourceCardProps) => {
  const config = typeConfig[type];
  const TypeIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start gap-4">
        <div className={`${config.className} rounded-xl p-2.5 shrink-0`}>
          <TypeIcon className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{title}</h4>
          <p className="mt-1 text-sm text-muted-foreground">by {author} · {date}</p>
          <div className="mt-3 flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
              <ThumbsUp className="h-3.5 w-3.5" /> {votes}
            </Button>
            {type !== "link" ? (
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                <Download className="h-3.5 w-3.5" /> {downloads}
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg text-xs">
                <ExternalLink className="h-3.5 w-3.5" /> Open
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
