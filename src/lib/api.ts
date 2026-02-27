// API placeholder functions — assumes backend exists

export const loginUser = async (email: string, password: string, role: 'student' | 'admin') => {
  return { id: '1', name: 'Alex Student', email, role, points: 420 };
};

export const fetchSemesters = async () => [
  { id: 1, name: 'Semester 1', subjects: 6, progress: 78 },
  { id: 2, name: 'Semester 2', subjects: 7, progress: 65 },
  { id: 3, name: 'Semester 3', subjects: 6, progress: 45 },
  { id: 4, name: 'Semester 4', subjects: 7, progress: 30 },
  { id: 5, name: 'Semester 5', subjects: 5, progress: 12 },
  { id: 6, name: 'Semester 6', subjects: 6, progress: 0 },
];

export const fetchSubjects = async (semesterId: number) => [
  { id: 1, name: 'Data Structures', code: 'CS201', resources: 24, semesterId },
  { id: 2, name: 'Operating Systems', code: 'CS202', resources: 18, semesterId },
  { id: 3, name: 'Database Systems', code: 'CS203', resources: 31, semesterId },
  { id: 4, name: 'Computer Networks', code: 'CS204', resources: 15, semesterId },
  { id: 5, name: 'Discrete Mathematics', code: 'MA201', resources: 20, semesterId },
  { id: 6, name: 'Digital Logic', code: 'EC201', resources: 12, semesterId },
];

export const fetchResources = async (subjectId: number) => [
  { id: 1, title: 'Binary Trees Complete Notes', type: 'notes' as const, author: 'Priya S.', votes: 42, downloads: 156, date: '2025-12-01' },
  { id: 2, title: 'PYQ 2024 Solved', type: 'pyq' as const, author: 'Rahul K.', votes: 38, downloads: 201, date: '2025-11-15' },
  { id: 3, title: 'Graph Algorithms Video', type: 'link' as const, author: 'Amit T.', votes: 27, downloads: 0, date: '2025-10-20', url: '#' },
  { id: 4, title: 'Sorting Algorithms Cheatsheet', type: 'notes' as const, author: 'Sara M.', votes: 55, downloads: 312, date: '2025-09-05' },
  { id: 5, title: 'PYQ 2023 Solutions', type: 'pyq' as const, author: 'Dev P.', votes: 31, downloads: 178, date: '2025-08-22' },
  { id: 6, title: 'Dynamic Programming Guide', type: 'link' as const, author: 'Neha R.', votes: 44, downloads: 0, date: '2025-11-30', url: '#' },
];

export const fetchKnowledgeGraph = async () => ({
  nodes: [
    { id: '1', label: 'Data Structures', type: 'concept' as const, x: 400, y: 50 },
    { id: '2', label: 'Arrays', type: 'concept' as const, x: 150, y: 200 },
    { id: '3', label: 'Linked Lists', type: 'concept' as const, x: 400, y: 200 },
    { id: '4', label: 'Trees', type: 'important' as const, x: 650, y: 200 },
    { id: '5', label: 'Binary Search', type: 'resource' as const, x: 100, y: 370 },
    { id: '6', label: 'Stacks', type: 'concept' as const, x: 280, y: 370 },
    { id: '7', label: 'Queues', type: 'concept' as const, x: 460, y: 370 },
    { id: '8', label: 'BST', type: 'important' as const, x: 600, y: 370 },
    { id: '9', label: 'Heaps', type: 'important' as const, x: 750, y: 370 },
    { id: '10', label: 'Graphs', type: 'important' as const, x: 400, y: 500 },
    { id: '11', label: 'Hashing', type: 'resource' as const, x: 200, y: 500 },
    { id: '12', label: 'Sorting', type: 'resource' as const, x: 600, y: 500 },
  ],
  edges: [
    { from: '1', to: '2' }, { from: '1', to: '3' }, { from: '1', to: '4' },
    { from: '2', to: '5' }, { from: '3', to: '6' }, { from: '3', to: '7' },
    { from: '4', to: '8' }, { from: '4', to: '9' }, { from: '6', to: '10' },
    { from: '7', to: '10' }, { from: '2', to: '11' }, { from: '8', to: '12' },
  ],
});

export const uploadResource = async (data: FormData) => {
  return { success: true, message: 'Resource uploaded successfully!' };
};

export const fetchLeaderboard = async () => [
  { id: 1, name: 'Priya Sharma', avatar: 'PS', points: 1240, uploads: 48, votes: 320, rank: 1 },
  { id: 2, name: 'Rahul Kumar', avatar: 'RK', points: 1105, uploads: 42, votes: 285, rank: 2 },
  { id: 3, name: 'Amit Tiwari', avatar: 'AT', points: 980, uploads: 35, votes: 250, rank: 3 },
  { id: 4, name: 'Sara Mehta', avatar: 'SM', points: 870, uploads: 30, votes: 210, rank: 4 },
  { id: 5, name: 'Dev Patel', avatar: 'DP', points: 760, uploads: 28, votes: 195, rank: 5 },
  { id: 6, name: 'Neha Rao', avatar: 'NR', points: 650, uploads: 22, votes: 170, rank: 6 },
  { id: 7, name: 'Vikash Singh', avatar: 'VS', points: 580, uploads: 20, votes: 150, rank: 7 },
  { id: 8, name: 'Ananya Das', avatar: 'AD', points: 490, uploads: 18, votes: 130, rank: 8 },
];

export const generateExamPlan = async (subjectId: number, daysLeft: number) => ({
  subject: 'Data Structures',
  daysLeft,
  priorities: [
    { topic: 'Trees & BST', weight: 'high', estimatedHours: 8 },
    { topic: 'Graph Algorithms', weight: 'high', estimatedHours: 10 },
    { topic: 'Dynamic Programming', weight: 'medium', estimatedHours: 6 },
    { topic: 'Sorting Algorithms', weight: 'medium', estimatedHours: 4 },
    { topic: 'Hashing', weight: 'low', estimatedHours: 3 },
  ],
  timeline: [
    { day: 1, topic: 'Trees & BST - Basics', type: 'study' },
    { day: 2, topic: 'Trees & BST - Advanced', type: 'study' },
    { day: 3, topic: 'Trees PYQ Practice', type: 'practice' },
    { day: 4, topic: 'Graph Algorithms - BFS/DFS', type: 'study' },
    { day: 5, topic: 'Graph Algorithms - Shortest Path', type: 'study' },
    { day: 6, topic: 'Graphs PYQ Practice', type: 'practice' },
    { day: 7, topic: 'Dynamic Programming', type: 'study' },
    { day: 8, topic: 'Sorting & Hashing', type: 'study' },
    { day: 9, topic: 'Full PYQ Revision', type: 'revision' },
    { day: 10, topic: 'Final Revision', type: 'revision' },
  ],
});
