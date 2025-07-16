// Import necessary hooks and types from React
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the two possible statuses a task can have
export type TaskStatus = 'in-progress' | 'completed';

// Define the shape of a Task object
export type Task = {
  description: string;   // A brief description of the task
  fromTime: Date;        // Start time of the task
  toTime: Date;          // End time of the task
  status?: TaskStatus;   // Optional task status, defaults to 'in-progress'
};

// Define the atrributes of the context that will be shared across components
type TaskContextType = {
  tasks: Task[];                                 // Array of tasks
  addTask: (task: Task) => void;                 // Function to add a task
  completeTask: (index: number) => void;         // Function to mark task as completed
  removeTask: (index: number) => void;           // Function to remove a task
};

// Create the context with an undefined initial value
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Context Provider component to wrap the app or component tree
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // State to hold all tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task with default status 'in-progress'
  const addTask = (task: Task) => {
    setTasks(prev => [...prev, { ...task, status: 'in-progress' }]);
  };

  // Mark a task as 'completed' by index
  const completeTask = (index: number) => {
    setTasks(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, status: 'completed' } : task
      )
    );
  };

  // Remove a task by filtering it out by index
  const removeTask = (index: number) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  // Provide the context value to children components
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

// Custom hook to use the task context
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  
  // Error if hook is used outside of the provider
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }

  return context;
};
