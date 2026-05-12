
import React, { useState } from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  Text, 
  Animated 
} from 'react-native';
import { ReservationManager } from './ReservationManager';
import { Plus } from 'lucide-react-native';


export const FloatingActionButton = ({ lang }: { lang: string }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Animated.View 
        style={[
          styles.container, 
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <TouchableOpacity 
          style={styles.fab}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
        <Text style={styles.icon}>
          <Plus/>
        </Text>
        </TouchableOpacity>
      </Animated.View>

      <ReservationManager 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        lang={lang} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
  },
  fab: {
    backgroundColor: '#10B981',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
   
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  icon: {
    color: '#000',
    fontSize: 32,
    fontWeight: '300',
    
  }
});
