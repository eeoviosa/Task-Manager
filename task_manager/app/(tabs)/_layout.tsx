import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from "expo-router"
import { ImageBackground } from 'expo-image'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

// Component to render the tab bar icon
const TabIcon = ({ focused, icon, title }: any) => {
  const isAdd = icon === icons.add; // Check if the icon is the "Add" button (center button)

  // Special styling for the "Add" icon in the center
  if (isAdd) {
    return (
      <View className={`w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full justify-center items-center shadow-lg -mt-6 ${
        focused ? 'bg-blue-200 rounded-full p-1' : ''
      }`}>
        <Image source={icon} className="w-12 h-12" resizeMode="contain" />
      </View>
    );
  }

  // Default styling for other icons (Home, Schedule)
  return (
    <View
      className={`flex-1 justify-center items-center ${
        focused ? 'bg-blue-200 rounded-full p-1' : ''
      }`}
    >
      <Image
        source={icon}
        className="w-11 h-11"
        resizeMode="contain"
      />
    </View>
  );
};

// Main layout for the bottom tab navigation
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide tab labels
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: 'white', // White tab bar background
          borderRadius: 50,         // Rounded corners
          marginHorizontal: 20,     // Horizontal spacing
          marginBottom: 36,         // Lifted up from bottom
          height: 52,               // Custom height
          overflow: 'visible',      // Allow the center button to overflow
          borderWidth: 1,
          borderColor: '0f0D23',    // Custom border color
          paddingTop: 5,
          paddingBottom: 0,
        }
      }}
    >
      {/* Home screen tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} />
          )
        }}
      />

      {/* Add Task screen tab (center button) */}
      <Tabs.Screen
        name="add_task"
        options={{
          title: 'Add',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.add} />
          )
        }}
      />

      {/* Calendar / Schedule screen tab */}
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Schedule',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.schedule} />
          )
        }}
      />
    </Tabs>
  );
};

export default _layout;
