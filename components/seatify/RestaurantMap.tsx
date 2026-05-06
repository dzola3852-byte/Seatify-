import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function RestaurantMap({ restaurants }: any) {
  return (
    <View style={styles.mapContainer}>
      {/* Aqui integraria o react-native-maps, mas mantemos puro conforme pedido */}
      <View style={styles.placeholderMap}>
        <Text style={styles.mapLabel}>Visualização de Mapa Ativa</Text>
        {/* Simulação de Pins */}
        <View style={[styles.pin, { top: 50, left: 100 }]} />
        <View style={[styles.pin, { top: 120, left: 200 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: { height: 250, borderRadius: 24, overflow: 'hidden', margin: 20, borderWidth: 1, borderColor: '#333' },
  placeholderMap: { flex: 1, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center' },
  mapLabel: { color: '#555', fontSize: 14 },
  pin: { position: 'absolute', width: 15, height: 15, backgroundColor: '#10B981', borderRadius: 10, borderWidth: 3, borderColor: '#FFF' }
});