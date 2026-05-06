import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

export default function WelcomeScreen({ onStart }: any) {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800' }} 
        style={styles.hero}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <View style={styles.footer}>
        <View style={styles.indicator} />
        <Text style={styles.title}>Reserve sua mesa no Seatify</Text>
        <Text style={styles.desc}>Encontre os melhores restaurantes e faça reservas em segundos com nossa tecnologia.</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statVal}>120+</Text>
            <Text style={styles.statLab}>Locais</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statVal}>4.8★</Text>
            <Text style={styles.statLab}>Avaliação</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={onStart}>
          <Text style={styles.btnText}>Começar Agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A' },
  hero: { height: '50%', width: '100%' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(10,10,10,0.4)' },
  footer: { flex: 1, padding: 30, backgroundColor: '#0A0A0A', marginTop: -30, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  indicator: { width: 40, height: 4, backgroundColor: '#10B981', borderRadius: 2, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 32, fontWeight: 'bold', lineHeight: 40 },
  desc: { color: '#888', fontSize: 16, marginTop: 15, lineHeight: 24 },
  statsRow: { flexDirection: 'row', marginVertical: 30 },
  stat: { marginRight: 40 },
  statVal: { color: '#10B981', fontSize: 20, fontWeight: 'bold' },
  statLab: { color: '#555', fontSize: 12, textTransform: 'uppercase' },
  btn: { backgroundColor: '#10B981', padding: 20, borderRadius: 16, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});