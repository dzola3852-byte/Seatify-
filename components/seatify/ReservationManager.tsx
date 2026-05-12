
import React, { useState, useRef } from 'react';
import { 
  Modal, View, Text, StyleSheet, TextInput, 
  TouchableOpacity, ScrollView, Animated, Dimensions, Alert 
} from 'react-native';

const { height } = Dimensions.get('window');

// CONFIGURAÇÃO: Coloque o IP do seu computador aqui
const SERVER_IP = "192.168.1.XXX"; 

export const ReservationManager = ({ visible, onClose }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('16:00');
  const sonnerAnim = useRef(new Animated.Value(150)).current;

  const triggerSonner = () => {
    Animated.sequence([
      Animated.spring(sonnerAnim, { toValue: -40, useNativeDriver: true, friction: 8 }),
      Animated.delay(3000),
      Animated.timing(sonnerAnim, { toValue: 150, duration: 300, useNativeDriver: true })
    ]).start();
  };

  const sendToBackend = async () => {
    if (!name || !phone) {
      Alert.alert("Erro", "Preencha o nome e o telefone.");
      return;
    }

    const reservationData = {
      id_mesa: Math.floor(Math.random() * 50) + 1,
      nome_cliente: name,
      numero_do_cliente: parseInt(phone.replace(/[^0-9]/g, '')),
      quantidade_pessoas: 2,
      horario: time 
    };

    try {
      const response = await fetch(`http://${SERVER_IP}:8080/reservar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });

      const result = await response.json();

      if (response.ok && result.status === "sucesso") {
        handleConfirm();
      } else {
        Alert.alert("Erro", "O servidor C recusou a reserva.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Rede", "Verifique se o servidor C está rodando e o IP está correto.");
    }
  };

  const handleConfirm = () => {
    onClose();
    setTimeout(triggerSonner, 500);
    setName('');
    setPhone('');
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.title}>Nova Reserva</Text>
            
            <ScrollView style={styles.form}>
              <Text style={styles.label}>NOME DO CLIENTE</Text>
              <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholder="Ex: Danielzola"
                placeholderTextColor="#444"
              />

              <Text style={styles.label}>TELEFONE</Text>
              <TextInput 
                style={styles.input} 
                value={phone} 
                onChangeText={setPhone} 
                placeholder="+244..."
                keyboardType="phone-pad"
                placeholderTextColor="#444" 
              />

              <TouchableOpacity style={styles.mainBtn} onPress={sendToBackend}>
                <Text style={styles.mainBtnText}>Confirmar e Sincronizar com Banco C</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeText}>Voltar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Animated.View style={[styles.sonner, { transform: [{ translateY: sonnerAnim }] }]}>
        <View style={styles.sonnerContent}>
          <View style={styles.sonnerIcon} />
          <View>
            <Text style={styles.sonnerTitle}>Think Tech: Sucesso!</Text>
            <Text style={styles.sonnerDesc}>Dados salvos no Banco_Reserva.dat</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  sheet: { 
    backgroundColor: '#0F0F0F', 
    borderTopLeftRadius: 32, borderTopRightRadius: 32, 
    padding: 24, height: height * 0.7, borderWidth: 1, borderColor: '#222'
  },
  handle: { width: 40, height: 4, backgroundColor: '#333', alignSelf: 'center', marginBottom: 20 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 25 },
  form: { flex: 1 },
  label: { color: '#10B981', fontSize: 10, fontWeight: 'bold', marginBottom: 8 },
  input: { 
    backgroundColor: '#1A1A1A', borderRadius: 16, padding: 18, 
    color: '#FFF', marginBottom: 20, borderWidth: 1, borderColor: '#333'
  },
  mainBtn: { backgroundColor: '#10B981', padding: 20, borderRadius: 18, alignItems: 'center' },
  mainBtnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  closeBtn: { padding: 20, alignItems: 'center' },
  closeText: { color: '#555', fontWeight: '600' },
  sonner: {
    position: 'absolute', bottom: 0, left: 16, right: 16,
    backgroundColor: '#FFF', borderRadius: 16, padding: 16, elevation: 10, zIndex: 9999,
  },
  sonnerContent: { flexDirection: 'row', alignItems: 'center' },
  sonnerIcon: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981', marginRight: 12 },
  sonnerTitle: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  sonnerDesc: { color: '#666', fontSize: 12 }
});
