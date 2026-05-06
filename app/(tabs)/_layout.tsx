import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import "global.css"
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Index from '@/app/(tabs)/index';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
   <SafeAreaView style={styles.container}>
         <StatusBar barStyle="light-content" />
         <Index />
       </SafeAreaView>
     );
   }
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#0A0A0A',
     }, 
  );
}
