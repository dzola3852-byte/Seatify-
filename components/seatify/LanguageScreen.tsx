import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const langs = [
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export default function LanguageScreen({ onContinue }: any) {
  const [selected, setSelected] = useState('pt');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <Text>Seatify</Text>
        </View>
        
        <Text style={styles.title}>Escolha seu idioma</Text>
        <Text style={styles.subtitle}>Selecione como deseja navegar no Seatify</Text>

        {langs.map((l) => (
          <TouchableOpacity 
            key={l.code}
            style={[styles.card, selected === l.code && styles.selectedCard]}
            onPress={() => setSelected(l.code)}
          >
            <Text style={styles.flag}>{l.flag}</Text>
            <Text style={styles.label}>{l.label}</Text>
            <View style={[styles.radio, selected === l.code && styles.radioActive]} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={() => onContinue(selected)}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', justifyContent: 'center', padding: 25 },
  content: { width: '100%' },
  logoBadge: { backgroundColor: '#10B981', alignSelf: 'flex-start', padding: 8, borderRadius: 8, marginBottom: 20 },
  logoText: { color: '#000', fontWeight: 'bold', fontSize: 12 },
  title: { color: '#FFF', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#888', fontSize: 16, marginBottom: 30 },
  card: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A', 
    padding: 20, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#333' 
  },
  selectedCard: { borderColor: '#10B981' },
  flag: { fontSize: 24, marginRight: 15 },
  label: { color: '#FFF', fontSize: 18, flex: 1 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#333' },
  radioActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  button: { backgroundColor: '#10B981', padding: 20, borderRadius: 16, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 }
});