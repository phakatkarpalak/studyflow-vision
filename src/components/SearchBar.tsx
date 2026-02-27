import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar = ({ placeholder = "Search...", onSearch }: SearchBarProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      animate={{ boxShadow: focused ? "var(--glow-primary)" : "none" }}
      className="glass flex items-center gap-3 rounded-2xl px-4 py-3 transition-all"
    >
      <Search className="h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onSearch?.(e.target.value)}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </motion.div>
  );
};

export default SearchBar;
