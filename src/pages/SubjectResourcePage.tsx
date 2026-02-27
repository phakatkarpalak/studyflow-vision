import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ChevronRight } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageWrapper from "@/components/PageWrapper";
import ResourceCard from "@/components/ResourceCard";
import SearchBar from "@/components/SearchBar";
import { fetchResources } from "@/lib/api";

const tabs = ["All", "Notes", "PYQs", "Links"] as const;

const SubjectResourcePage = () => {
  const { semesterId, subjectId } = useParams();
  const [resources, setResources] = useState<Awaited<ReturnType<typeof fetchResources>>>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResources(Number(subjectId)).then(setResources);
  }, [subjectId]);

  const typeMap: Record<string, string> = { Notes: "notes", PYQs: "pyq", Links: "link" };
  const filtered = resources
    .filter((r) => activeTab === "All" || r.type === typeMap[activeTab])
    .filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageWrapper className="container mx-auto px-6 pt-24 pb-12">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-4 w-4" /> Dashboard
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/semester/${semesterId}`} className="hover:text-foreground transition-colors">
            Semester {semesterId}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Subject Resources</span>
        </nav>

        <h1 className="font-display text-3xl font-bold mb-6">Resources</h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "gradient-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="w-full max-w-xs">
            <SearchBar placeholder="Search resources..." onSearch={setSearch} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((r, i) => (
            <ResourceCard key={r.id} {...r} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-12 text-muted-foreground">
              No resources found.
            </div>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default SubjectResourcePage;
