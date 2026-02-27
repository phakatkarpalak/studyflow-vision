import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle, FileUp } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { uploadResource } from "@/lib/api";

const UploadPage = () => {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleSubmit = async () => {
    await uploadResource(new FormData());
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageWrapper className="container mx-auto max-w-2xl px-6 pt-24 pb-12">
        <h1 className="font-display text-3xl font-bold mb-2">Upload Resource</h1>
        <p className="text-muted-foreground mb-8">Share your notes, PYQs, or links with the community</p>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-5">
            <label className="text-sm font-medium mb-2 block">Title</label>
            <input className="w-full rounded-xl bg-secondary px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Binary Trees Complete Notes" />
          </div>

          <div className="glass rounded-2xl p-5">
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <select className="w-full rounded-xl bg-secondary px-4 py-3 text-sm outline-none">
              <option>Data Structures</option>
              <option>Operating Systems</option>
              <option>Database Systems</option>
              <option>Computer Networks</option>
            </select>
          </div>

          <div className="glass rounded-2xl p-5">
            <label className="text-sm font-medium mb-2 block">Type</label>
            <div className="flex gap-3">
              {["Notes", "PYQ", "Link"].map((t) => (
                <button key={t} className="rounded-xl bg-secondary px-4 py-2 text-sm font-medium hover:gradient-primary hover:text-primary-foreground transition-all">
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Dropzone */}
          <motion.div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            animate={{ scale: dragOver ? 1.02 : 1, borderColor: dragOver ? "hsl(245 58% 51%)" : "hsl(240 15% 90%)" }}
            className="glass rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) setFileName(file.name);
              };
              input.click();
            }}
          >
            <FileUp className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <p className="font-medium">{fileName || "Drop your file here or click to browse"}</p>
            <p className="text-sm text-muted-foreground mt-1">PDF, DOC, PPT up to 10MB</p>
          </motion.div>

          <Button onClick={handleSubmit} className="w-full gradient-primary rounded-2xl border-0 text-primary-foreground py-6 text-base gap-2 glow-primary">
            <Upload className="h-5 w-5" /> Upload Resource
          </Button>

          {uploaded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 justify-center text-success font-medium"
            >
              <CheckCircle className="h-5 w-5" /> Resource uploaded successfully!
            </motion.div>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default UploadPage;
