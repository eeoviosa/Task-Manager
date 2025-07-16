import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onComplete: () => void;
  onDelete: () => void;
};

const TaskOptionsModal: React.FC<Props> = ({
  visible,
  onClose,
  onComplete,
  onDelete,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/30">
        <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10 shadow-lg">
          <Text className="text-center font-bold text-lg text-gray-800 mb-6">
            Task Options
          </Text>

          {/* Mark as Complete */}
          <TouchableOpacity
            onPress={onComplete}
            className="py-4 bg-blue-50 rounded-xl mb-3"
          >
            <Text className="text-center text-blue-600 font-semibold">
              ✅ Mark as Complete
            </Text>
          </TouchableOpacity>

          {/* Delete Task */}
          <TouchableOpacity
            onPress={onDelete}
            className="py-4 bg-red-50 rounded-xl mb-3"
          >
            <Text className="text-center text-red-600 font-semibold">
              🗑️ Delete Task
            </Text>
          </TouchableOpacity>

          {/* Cancel */}
          <TouchableOpacity onPress={onClose} className="py-4 bg-gray-100 rounded-xl">
            <Text className="text-center text-gray-600 font-medium">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaskOptionsModal;
