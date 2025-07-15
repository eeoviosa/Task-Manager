import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useTaskContext, Task } from '@/context/TaskContext';
import dayjs from 'dayjs';

type FilterType = 'all' | 'in-progress' | 'completed';

const TaskList = () => {
  const { tasks, completeTask, removeTask } = useTaskContext();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const selectedTask = selectedTaskIndex !== null ? tasks[selectedTaskIndex] : null;

  const handleLongPress = (index: number) => {
    setSelectedTaskIndex(index);
    setModalVisible(true);
  };

  const markAsComplete = () => {
    if (selectedTaskIndex !== null) completeTask(selectedTaskIndex);
    setModalVisible(false);
  };

  const deleteTask = () => {
    if (selectedTaskIndex !== null) removeTask(selectedTaskIndex);
    setModalVisible(false);
  };

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

const today = dayjs().format('YYYY-MM-DD');

const todayTasks = tasks.filter(task =>
  dayjs(task.fromTime).format('YYYY-MM-DD') === today
);
const filteredTasks = todayTasks.filter(task => {
  if (filter === 'all') return true;
  return task.status === filter;
});
  const filterOptions: FilterType[] = ['all', 'in-progress', 'completed'];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-7 px-5 py-4">
        <Text className="text-2xl font-bold text-gray-900">Today's Tasks</Text>
        <Text className="text-sm text-gray-500">{dayjs().format('MMMM D, YYYY')}</Text>
      </View>
            {/* Filter Buttons */}
      <View className=" items-center justify-center flex-row mb-4 space-x-2">
        {filterOptions.map(option => (
          <Pressable
            key={option}
            onPress={() => setFilter(option)}
            className={` ml-3 px-4 py-2 rounded-full border ${
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
      {todayTasks.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No tasks for today.</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          data={filteredTasks}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable className="mb-4 bg-white p-4 rounded-2xl shadow-md border border-gray-100">
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

        <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-end bg-black/30">
        <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10 shadow-lg">
          <Text className="text-center font-bold text-lg text-gray-800 mb-6">Task Options</Text>

          <TouchableOpacity
            onPress={markAsComplete}
            className="py-4 bg-blue-50 rounded-xl mb-3"
          >
            <Text className="text-center text-blue-600 font-semibold">✅ Mark as Complete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={deleteTask}
            className="py-4 bg-red-50 rounded-xl mb-3"
          >
            <Text className="text-center text-red-600 font-semibold">🗑️ Delete Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="py-4 bg-gray-100 rounded-xl"
          >
            <Text className="text-center text-gray-600 font-medium">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
};

export default TaskList;
