import { useCallback, useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Star, FileText } from "lucide-react";
import AnimatedNavbar from "@/components/AnimatedNavbar";
import PageWrapper from "@/components/PageWrapper";
import { fetchKnowledgeGraph } from "@/lib/api";

const nodeTypeConfig = {
  concept: { color: "hsl(245 58% 51%)", icon: BookOpen },
  important: { color: "hsl(280 70% 55%)", icon: Star },
  resource: { color: "hsl(210 100% 55%)", icon: FileText },
};

function CustomNode({ data }: { data: { label: string; nodeType: keyof typeof nodeTypeConfig } }) {
  const config = nodeTypeConfig[data.nodeType];
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.12, boxShadow: `0 0 24px ${config.color}40` }}
      className="flex items-center gap-2 rounded-2xl border border-border/50 px-4 py-3 cursor-pointer"
      style={{ background: `linear-gradient(135deg, ${config.color}20, ${config.color}08)`, backdropFilter: "blur(12px)" }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      <div className="rounded-lg p-1.5" style={{ background: config.color }}>
        <Icon className="h-4 w-4" style={{ color: "white" }} />
      </div>
      <span className="font-medium text-sm">{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
    </motion.div>
  );
}

const nodeTypes = { custom: CustomNode };

const KnowledgeGraphPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selected, setSelected] = useState<{ label: string; type: string } | null>(null);

  useEffect(() => {
    fetchKnowledgeGraph().then((graph) => {
      const flowNodes: Node[] = graph.nodes.map((n) => ({
        id: n.id,
        type: "custom",
        position: { x: n.x, y: n.y },
        data: { label: n.label, nodeType: n.type },
      }));
      const flowEdges: Edge[] = graph.edges.map((e, i) => ({
        id: `e-${i}`,
        source: e.from,
        target: e.to,
        animated: true,
        style: { stroke: "hsl(245 58% 51%)", strokeWidth: 2 },
      }));
      setNodes(flowNodes);
      setEdges(flowEdges);
    });
  }, []);

  const onNodeClick = useCallback((_: any, node: Node) => {
    setSelected({ label: node.data.label as string, type: node.data.nodeType as string });
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatedNavbar />
      <PageWrapper className="pt-16 h-screen flex flex-col">
        <div className="container mx-auto px-6 py-6">
          <h1 className="font-display text-3xl font-bold">Knowledge Graph</h1>
          <p className="text-muted-foreground mt-1">Explore topic connections visually</p>
        </div>

        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            className="!bg-background"
          >
            <Background color="hsl(245 58% 51% / 0.05)" gap={24} />
            <Controls className="!bg-card !border-border !rounded-xl !shadow-card" />
            <MiniMap
              className="!bg-card !border-border !rounded-xl !shadow-card"
              nodeColor="hsl(245 58% 51%)"
            />
          </ReactFlow>

          {/* Side panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="absolute top-4 right-4 w-80 glass-strong rounded-2xl p-6 z-10"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold">{selected.label}</h3>
                  <button onClick={() => setSelected(null)} className="rounded-lg p-1 hover:bg-secondary transition-colors">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <span className="inline-block gradient-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-lg capitalize mb-3">
                  {selected.type}
                </span>
                <p className="text-sm text-muted-foreground">
                  Explore resources and subtopics related to {selected.label}. Click to view notes, PYQs, and linked topics.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageWrapper>
    </div>
  );
};

export default KnowledgeGraphPage;
