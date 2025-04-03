import React, { useState } from 'react';
import { 
  ChevronRight, 
  Home, 
  Calendar, 
  Briefcase, 
  ClipboardList, 
  BarChart2, 
  Folder, 
  Users, 
  FileText, 
  Target, 
  PieChart, 
  DollarSign, 
  Gift, 
  Trello 
} from 'lucide-react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Input, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui';

// Define types for better type safety
interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
}

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  key: string;
  subItems?: { label: string; key: string }[];
}

const StartupDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'status'>>({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    urgency: 'low'
  });

  // Sidebar Menu Items
  const sidebarItems: SidebarItem[] = [
    { icon: <Home />, label: 'Dashboard', key: 'dashboard' },
    { icon: <ClipboardList />, label: 'Tasks', key: 'tasks' },
    { icon: <Calendar />, label: 'Meetings', key: 'meetings' },
    { icon: <Folder />, label: 'Branding', key: 'branding' },
    { icon: <FileText />, label: 'Business Plan', key: 'business-plan' },
    { icon: <Gift />, label: 'Demo', key: 'demo' },
    { 
      icon: <BarChart2 />, 
      label: 'Features', 
      key: 'features',
      subItems: [
        { label: 'Marketplace', key: 'marketplace' },
        { label: 'Health', key: 'health' },
        { label: 'Groups', key: 'groups' },
        { label: 'Career Center', key: 'career-center' },
        { label: 'Gus Education', key: 'gus-education' },
        { label: 'Business Center', key: 'business-center' }
      ]
    },
    { icon: <DollarSign />, label: 'Financial Projections', key: 'financial-projections' },
    { icon: <FileText />, label: 'Lean Business Plan', key: 'lean-business-plan' },
    { icon: <Briefcase />, label: 'Legal', key: 'legal' },
    { icon: <Target />, label: 'Marketing', key: 'marketing' },
    { icon: <PieChart />, label: 'Pitch Deck', key: 'pitch-deck' },
    { icon: <Trello />, label: 'Product Roadmap', key: 'product-roadmap' },
    { icon: <Users />, label: 'Target Market Research', key: 'target-market-research' },
    { icon: <Calendar />, label: 'Timeline', key: 'timeline' }
  ];

  // Add Task Handler
  const handleAddTask = () => {
    if (newTask.title && newTask.assignedTo) {
      const taskToAdd: Task = {
        ...newTask,
        id: Date.now(),
        status: 'todo'
      };
      setTasks([...tasks, taskToAdd]);
      // Reset new task form
      setNewTask({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
        urgency: 'low'
      });
    }
  };

  // Delete Task Handler
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Daily Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No scheduled items today.</p>
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No upcoming meetings.</p>
        </CardContent>
      </Card>

      {/* Project Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No timeline items.</p>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Company Kanban Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-bold mb-2">To Do</h3>
              {tasks.filter(task => task.status === 'todo').map(task => (
                <div key={task.id} className="bg-gray-100 p-2 mb-2 rounded">
                  {task.title}
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-2">In Progress</h3>
              {tasks.filter(task => task.status === 'in-progress').map(task => (
                <div key={task.id} className="bg-yellow-100 p-2 mb-2 rounded">
                  {task.title}
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold mb-2">Done</h3>
              {tasks.filter(task => task.status === 'done').map(task => (
                <div key={task.id} className="bg-green-100 p-2 mb-2 rounded">
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Tasks Component
  const TasksComponent = () => (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Create New Task</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input 
              placeholder="Task Title" 
              value={newTask.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setNewTask({...newTask, title: e.target.value})
              }
            />
            <Input 
              placeholder="Description" 
              value={newTask.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setNewTask({...newTask, description: e.target.value})
              }
            />
            <Select 
              value={newTask.assignedTo}
              onValueChange={(value: string) => 
                setNewTask({...newTask, assignedTo: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Assign to" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sammy">Sammy</SelectItem>
                <SelectItem value="Soleil">Soleil</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              type="date" 
              value={newTask.dueDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setNewTask({...newTask, dueDate: e.target.value})
              }
            />
            <Select 
              value={newTask.urgency}
              onValueChange={(value: 'low' | 'medium' | 'high') => 
                setNewTask({...newTask, urgency: value})
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddTask}>Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map(task => (
          <Card key={task.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <div className="text-sm text-gray-500">
                  Assigned to: {task.assignedTo}
                  {task.dueDate && ` | Due: ${task.dueDate}`}
                  {task.urgency && ` | Urgency: ${task.urgency}`}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => (
    <div className={`
      fixed left-0 top-0 bottom-0 bg-white shadow-lg 
      transition-all duration-300 ease-in-out
      ${isSidebarOpen ? 'w-64' : 'w-16'}
      overflow-y-auto border-r