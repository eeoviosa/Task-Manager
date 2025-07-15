import React, {createContext, useContext, useState, ReactNode} from 'react';

export type TaskStatus = 'in-progress' | 'completed';

export type Task = {
  description: string;
  fromTime: Date;
  toTime: Date;
  status?: TaskStatus;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  completeTask: (index: number) => void;
  removeTask: (index: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks(prev => [...prev, { ...task, status: 'in-progress' }]);
  };

  const completeTask = (index: number) => {
    setTasks(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, status: 'completed' } : task
      )
    );
  };

  const removeTask = (index: number) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        completeTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};