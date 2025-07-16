import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTaskContext } from '@/context/TaskContext';
import dayjs from 'dayjs';

// Define the attributes of a Task object
type Task = {
  description: string;
  fromTime: Date;
  toTime: Date;
};

// TaskForm component allows input of task details
const TaskForm = ({ onSubmit }: { onSubmit?: (task: Task) => void }) => {
  // Form state
  const [description, setDescription] = useState('');
  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);

  // DateTime picker control state
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'date' | 'from' | 'to' | null>(null);

  // Handle confirmation of any date/time picker
  const handleConfirm = (selected: Date) => {
    if (pickerTarget === 'date') {
      setTaskDate(selected);
    } else if (pickerTarget === 'from') {
      setFromTime(selected);
    } else if (pickerTarget === 'to') {
      setToTime(selected);
    }

    setPickerVisible(false);
    setPickerTarget(null);
  };

  // Validate and submit the task
  const handleSubmit = () => {
    if (!description || !taskDate || !fromTime || !toTime) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Combine selected date with start and end times
    const fromDateTime = new Date(taskDate);
    fromDateTime.setHours(fromTime.getHours());
    fromDateTime.setMinutes(fromTime.getMinutes());

    const toDateTime = new Date(taskDate);
    toDateTime.setHours(toTime.getHours());
    toDateTime.setMinutes(toTime.getMinutes());

    // Validate time range
    if (fromDateTime >= toDateTime) {
      Alert.alert('Error', '"From Time" must be before "To Time".');
      return;
    }

    // Create the task object
    const task: Task = {
      description,
      fromTime: fromDateTime,
      toTime: toDateTime,
    };

    if (onSubmit) onSubmit(task);
    Alert.alert('Success', 'Task created successfully!');

    // Reset form
    setDescription('');
    setTaskDate(null);
    setFromTime(null);
    setToTime(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 32,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text className="mt-4 text-3xl font-bold text-center text-blue-700 mb-6">
          Create New Task
        </Text>

        {/* Task Description Field */}
        <View className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <Text className="text-sm text-gray-500 mb-1">Task Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="e.g. Team meeting or grocery shopping"
            className="text-base text-gray-800"
          />
        </View>

        {/* Date Picker Field */}
        <View className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <Text className="text-sm text-gray-500 mb-1">Date</Text>
          <TouchableOpacity
            onPress={() => {
              setPickerTarget('date');
              setPickerVisible(true);
            }}
          >
            <Text className="text-base text-gray-800">
              {taskDate
                ? dayjs(taskDate).format('MMM D, YYYY')
                : 'Select Date'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* From Time Picker Field */}
        <View className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
          <Text className="text-sm text-gray-500 mb-1">From Time</Text>
          <TouchableOpacity
            onPress={() => {
              setPickerTarget('from');
              setPickerVisible(true);
            }}
          >
            <Text className="text-base text-gray-800">
              {fromTime
                ? dayjs(fromTime).format('h:mm A')
                : 'Select Start Time'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* To Time Picker Field */}
        <View className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
          <Text className="text-sm text-gray-500 mb-1">To Time</Text>
          <TouchableOpacity
            onPress={() => {
              setPickerTarget('to');
              setPickerVisible(true);
            }}
          >
            <Text className="text-base text-gray-800">
              {toTime ? dayjs(toTime).format('h:mm A') : 'Select End Time'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 p-4 rounded-full items-center shadow"
        >
          <Text className="text-white font-semibold text-base">Save Task</Text>
        </TouchableOpacity>

        {/* Modal Date/Time Picker */}
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode={pickerTarget === 'date' ? 'date' : 'time'}
          onConfirm={handleConfirm}
          onCancel={() => setPickerVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Wrapper component to connect form to context
const AddTask = () => {
  const { addTask } = useTaskContext();

  // Handler for saving the task using context
  const saveTask = (task: Task) => {
    addTask(task);
  };

  return <TaskForm onSubmit={saveTask} />;
};

export default AddTask;
