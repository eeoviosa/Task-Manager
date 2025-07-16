import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView
} from 'react-native';
import { useTaskContext, Task } from '@/context/TaskContext';
import dayjs from 'dayjs';
import TaskOptionsModal from '@/components/TaskOptionsModal';

// Define possible filter options
type FilterType = 'all' | 'in-progress' | 'completed';

const TaskList = () => {
  const { tasks, completeTask, removeTask } = useTaskContext();

  // State for managing task selection and modal visibility
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // State to track the current filter selection
  const [filter, setFilter] = useState<FilterType>('all');

  const selectedTask = selectedTaskIndex !== null ? tasks[selectedTaskIndex] : null;

  // Open modal on long press
  const handleLongPress = (index: number) => {
    setSelectedTaskIndex(index);
    setModalVisible(true);
  };

  // Mark selected task as completed
  const markAsComplete = () => {
    if (selectedTaskIndex !== null) completeTask(selectedTaskIndex);
    setModalVisible(false);
  };

  // Delete selected task
  const deleteTask = () => {
    if (selectedTaskIndex !== null) removeTask(selectedTaskIndex);
    setModalVisible(false);
  };

  // Render a status badge for each task
  const renderStatusTag = (task: Task) => {
    const isComplete = task.status === 'completed';
    const tagStyle = isComplete
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
    const label = isComplete ? 'Completed ✅' : 'In Progress';

    return (
      <View className="flex-row justify-end">
        <View className={`rounded-full bg-opacity-30 ${tagStyle}`}>
          <Text className="text-xs font-semibold px-2 py-1">{label}</Text>
        </View>
      </View>
    );
  };

  // Filter tasks to only include those due today
  const today = dayjs().format('YYYY-MM-DD');
  const todayTasks = tasks.filter(task =>
    dayjs(task.fromTime).format('YYYY-MM-DD') === today
  );

  // Apply status filter (all, in-progress, completed)
  const filteredTasks = todayTasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const filterOptions: FilterType[] = ['all', 'in-progress', 'completed'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="mt-7 px-5 py-4">
        <Text className="text-2xl font-bold text-gray-900">Today's Tasks</Text>
        <Text className="text-sm text-gray-500">{dayjs().format('MMMM D, YYYY')}</Text>
      </View>

      {/* Filter Buttons */}
      <View className="items-center justify-center flex-row mb-4 space-x-2">
        {filterOptions.map(option => (
          <Pressable
            key={option}
            onPress={() => setFilter(option)}
            className={`ml-3 px-4 py-2 rounded-full border ${
              filter === option
                ? 'bg-blue-500 border-blue-500'
                : 'bg-white border-gray-300'
            }`}
          >
            <Text
              className={`font-medium ${
                filter === option ? 'text-white' : 'text-gray-700'
              }`}
            >
              {option === 'all'
                ? 'All'
                : option === 'in-progress'
                ? 'In Progress'
                : 'Completed'}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Empty State or Task List */}
      {todayTasks.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No tasks for today.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          data={filteredTasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              onLongPress={() => handleLongPress(index)}
              className="mb-4 bg-white p-4 rounded-2xl shadow border border-gray-200"
            >
              <Text className="text-base font-semibold text-gray-800 mb-1">
                {item.description}
              </Text>

              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm text-gray-500">
                  {dayjs(item.fromTime).format('h:mm A')} → {dayjs(item.toTime).format('h:mm A')}
                </Text>
                {renderStatusTag(item)}
              </View>
            </Pressable>
          )}
        />
      )}

    {/* Modal for Task Options */}
      <TaskOptionsModal
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onComplete={markAsComplete}
      onDelete={deleteTask}
      />
    </SafeAreaView>
  );
};

export default TaskList;
