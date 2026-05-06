
import React, { useState, useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Animated,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

export const ReservationManager = ({ visible, onClose, lang }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('20:00');
  
  // Animação para simular o Sonner (Shadcn Toast)
  const sonnerAnim = useRef(new Animated.Value(150)).current;

  const triggerSonner = () => {
    Animated.sequence([
      Animated.spring(sonnerAnim, { 
        toValue: -40, 
        useNativeDriver: true,
        friction: 8 
      }),
      Animated.delay(3000),
      Animated.timing(sonnerAnim, { 
        toValue: 150, 
        duration: 300, 
        useNativeDriver: true 
      })
    ]).start();
  };

  const handleConfirm = () => {
    // Aqui a lógica chamaria a sua API em C via backend
    onClose();
    // Delay pequeno para o modal fechar antes do toast aparecer
    setTimeout(triggerSonner, 500);
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.title}>Gerenciar Reserva</Text>
            
            <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
              <Text style={styles.label}>NOME DO CLIENTE</Text>
              <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholder="Digite seu nome"
                placeholderTextColor="#444"
              />

              <Text style={styles.label}>TELEFONE</Text>
              <TextInput 
                style={styles.input} 
                value={phone} 
                onChangeText={setPhone} 
                placeholder="+244 000 000 000"
                keyboardType="phone-pad"
                placeholderTextColor="#444"
              />

              <Text style={styles.label}>HORÁRIO</Text>
              <View style={styles.timeGrid}>
                {['19:00', '20:00', '21:00', '22:00'].map(t => (
                  <TouchableOpacity 
                    key={t} 
                    style={[styles.timeBtn, time === t && styles.timeBtnActive]}
                    onPress={() => setTime(t)}
                  >
                    <Text style={[styles.timeText, time === t && styles.timeTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.mainBtn} onPress={handleConfirm}>
                <Text style={styles.mainBtnText}>Confirmar Reserva</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SONNER SIMULATION (Shadcn UI style) */}
      <Animated.View style={[styles.sonner, { transform: [{ translateY: sonnerAnim }] }]}>
        <View style={styles.sonnerContent}>
          <View style={styles.sonnerIcon} />
          <View>
            <Text style={styles.sonnerTitle}>Sucesso!</Text>
            <Text style={styles.sonnerDesc}>Reserva confirmada para {time}.</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  sheet: { 
    backgroundColor: '#0F0F0F', 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32, 
    padding: 24, 
    height: height * 0.7,
    borderWidth: 1,
    borderColor: '#222'
  },
  handle: { width: 40, height: 4, backgroundColor: '#333', alignSelf: 'center', marginBottom: 20, borderRadius: 2 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 25 },
  form: { flex: 1 },
  label: { color: '#10B981', fontSize: 10, fontWeight: 'bold', marginBottom: 8, letterSpacing: 1 },
  input: { 
    backgroundColor: '#1A1A1A', 
    borderRadius: 16, 
    padding: 18, 
    color: '#FFF', 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333'
  },
  timeGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  timeBtn: { paddingVertical: 12, paddingHorizontal: 15, borderRadius: 12, backgroundColor: '#1A1A1A', borderWidth: 1, borderColor: '#333' },
  timeBtnActive: { backgroundColor: '#10B981', borderColor: '#10B981' },
  timeText: { color: '#888', fontWeight: '600' },
  timeTextActive: { color: '#000' },
  mainBtn: { backgroundColor: '#10B981', padding: 20, borderRadius: 18, alignItems: 'center' },
  mainBtnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  closeBtn: { padding: 20, alignItems: 'center' },
  closeText: { color: '#555', fontWeight: '600' },
  
  // Sonner (Toast) Styles
  sonner: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 9999,
  },
  sonnerContent: { flexDirection: 'row', alignItems: 'center' },
  sonnerIcon: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981', marginRight: 12 },
  sonnerTitle: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  sonnerDesc: { color: '#666', fontSize: 12 }
});
