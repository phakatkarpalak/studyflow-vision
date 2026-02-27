import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageWrapper from "@/components/PageWrapper";
import SubjectCard from "@/components/SubjectCard";
import { fetchSubjects } from "@/lib/api";

const SemesterPage = () => {
  const { semesterId } = useParams();
  const id = Number(semesterId);
  const [subjects, setSubjects] = useState<Awaited<ReturnType<typeof fetchSubjects>>>([]);

  useEffect(() => {
    fetchSubjects(id).then(setSubjects);
  }, [id]);

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageWrapper className="container mx-auto px-6 pt-24 pb-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-4 w-4" /> Dashboard
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">Semester {id}</span>
        </nav>

        <h1 className="font-display text-3xl font-bold mb-8">Semester {id} — Subjects</h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s, i) => (
            <SubjectCard key={s.id} {...s} semesterId={id} index={i} />
          ))}
        </div>
      </PageWrapper>
    </div>
  );
};

export default SemesterPage;
