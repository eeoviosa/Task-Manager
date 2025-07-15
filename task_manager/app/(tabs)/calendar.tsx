import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useTaskContext, Task } from '@/context/TaskContext';
import dayjs from 'dayjs';

const ScheduleScreen = () => {
  const { tasks, completeTask, removeTask } = useTaskContext();

  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setSelectedDate(dayjs().format('YYYY-MM-DD'));
  }, [currentMonth]);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev =>
      direction === 'prev' ? prev.subtract(1, 'month') : prev.add(1, 'month')
    );
  };

  // Generate date options for the current month
  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const numberOfDays = endOfMonth.date();
  const dates = Array.from({ length: numberOfDays }, (_, i) =>
    startOfMonth.add(i, 'day')
  );

  const filteredTasks = tasks
    .map((task, index) => ({ ...task, index }))
    .filter(task => dayjs(task.fromTime).format('YYYY-MM-DD') === selectedDate);

  const groupedByHour = filteredTasks.reduce(
    (acc: Record<string, typeof filteredTasks>, task) => {
      const hour = dayjs(task.fromTime).format('hh:mm A');
      if (!acc[hour]) acc[hour] = [];
      acc[hour].push(task);
      return acc;
    },
    {}
  );

  Object.keys(groupedByHour).forEach(hour => {
    groupedByHour[hour].sort((a, b) => a.toTime.getTime() - b.toTime.getTime());
  });

  const sortedHours = Object.keys(groupedByHour).sort((a, b) =>
    dayjs(a, 'hh:mm A').isBefore(dayjs(b, 'hh:mm A')) ? -1 : 1
  );

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
    const tagColor = isComplete ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800';
    const text = isComplete ? 'Completed ✅' : 'In Progress';

    return (
      <View className={`px-2 py-1 rounded-full ${tagColor}`}>
        <Text className="text-xs font-semibold">{text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="mt-10 flex-1 bg-white">
      {/* Month Header */}
      <View className="flex-row justify-between items-center px-4 pt-4 pb-2">
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Text className="text-lg text-blue-500">◀</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800">{currentMonth.format('MMMM YYYY')}</Text>
        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Text className="text-lg text-blue-500">▶</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Date Selector */}
      <View className="px-4 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map(date => {
            const formatted = date.format('YYYY-MM-DD');
            const isSelected = formatted === selectedDate;
            return (
              <TouchableOpacity
                key={formatted}
                onPress={() => setSelectedDate(formatted)}
                className={`items-center mx-2 px-3 py-2 rounded-xl ${
                  isSelected ? 'bg-blue-500' : 'bg-gray-100'
                }`}
              >
                <Text className={`text-xs ${isSelected ? 'text-white' : 'text-gray-500'}`}>{date.format('ddd')}</Text>
                <Text className={`text-base font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>{date.format('D')}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Task Groups by Hour */}
      {sortedHours.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No tasks for this day.</Text>
        </View>
      ) : (
        <FlatList
          data={sortedHours}
          keyExtractor={hour => hour}
          renderItem={({ item: hour }) => (
            <View className="p-4">
              <Text className="text-lg font-semibold mb-2 text-gray-700">{hour}</Text>
              {groupedByHour[hour].map(task => (
                <Pressable
                  key={task.index}
                  onLongPress={() => handleLongPress(task.index)}
                  className="bg-white p-4 rounded-xl shadow mb-3 border border-gray-200"
                >
                  <View className="flex-row justify-between items-center mb-1">
                    <Text className="font-semibold text-base text-gray-900">
                      {task.description}
                    </Text>
                    {renderStatusTag(task)}
                  </View>
                  <Text className="text-sm text-gray-600">
                    {dayjs(task.fromTime).format('hh:mm A')} → {dayjs(task.toTime).format('hh:mm A')}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />
      )}

      {/* Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white rounded-t-2xl px-4 py-6">
            <Text className="text-center font-semibold text-lg mb-4">Task Options</Text>

            <TouchableOpacity
              onPress={markAsComplete}
              className="py-3 border-b border-gray-200"
            >
              <Text className="text-center text-blue-600 font-semibold">Mark as Complete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deleteTask}
              className="py-3 border-b border-gray-200"
            >
              <Text className="text-center text-red-600 font-semibold">Delete Task</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} className="py-3">
              <Text className="text-center font-medium text-gray-700">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleScreen;
