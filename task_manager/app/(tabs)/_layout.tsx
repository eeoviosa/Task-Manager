import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs} from "expo-router"
import { ImageBackground } from 'expo-image'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'


const TabIcon = ({ focused, icon, title }: any) => {
  
  const isAdd = icon === icons.add;
  
    if (isAdd) {
    return (
      <View className={`w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full justify-center items-center shadow-lg -mt-6 ${
        focused ? 'bg-blue-200 rounded-full p-1' : ''
      }`}>
        <Image source={icon} className="w-12 h-12" resizeMode="contain" />
      </View>
    );
  }
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

const _layout = () => {
  return (
   <Tabs
   screenOptions = {{tabBarShowLabel: false,
                    tabBarItemStyle:{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },

                    tabBarStyle:{
                        backgroundColor: 'white',
                        borderRadius:50,
                        marginHorizontal:20,
                        marginBottom:36,
                        height:52,
                        overflow: 'visible',
                        borderWidth: 1,
                        borderColor: '0f0D23',
                        paddingTop:5,
                        paddingBottom:0,


                    }
   }}>
        <Tabs.Screen
            name = "index"
            options = {{title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (<TabIcon focused = {focused} icon = {icons.home}/>)
            }}
        />
           <Tabs.Screen
            name = "add_task"
            options = {{title: 'Add',
                headerShown: false,
                tabBarIcon: ({focused}) => (<TabIcon focused = {focused} icon = {icons.add}/>)
            }}
        />

        <Tabs.Screen
        name="calendar"
        options = {{title: 'Schedule',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (<TabIcon focused = {focused} icon = {icons.schedule}/>)
                
        }}
        />

   </Tabs>
  )
}

export default _layout