 import React from 'react';
import {View, Text } from 'react-native';
import {Task } from '@/context/TaskContext';
 
 const StatusTag = ({task}:{task: Task}) => {
    const isComplete = task.status === 'completed';
    console.log (task.status);
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

  export default StatusTag