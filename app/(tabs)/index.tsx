
import "@/global.css"
import React from 'react';


import { useColorScheme } from '@/hooks/use-color-scheme';


import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Index from '@/app/(tabs)/index';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
   <SafeAreaView>
         <StatusBar barStyle="light-content" />
         <Index />
       </SafeAreaView>
     );
   }
   