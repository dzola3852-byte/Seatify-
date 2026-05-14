import React, { useState, useRef } from 'react';
import { 
  Modal, View, Text, StyleSheet, TextInput, 
  TouchableOpacity, ScrollView, Animated, Dimensions, Alert 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { CheckCircle2 } from 'lucide-react-native';

const { height } = Dimensions.get('window');
const SERVER_IP = "192.168.1.XX"; // Altere para o IP do seu servidor C

export default function ReservationManager({ visible, onClose, tableId }: any){
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState(2);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // ANIMAÇÃO DO SONNER
  const sonnerAnim = useRef(new Animated.Value(150)).current;

  const triggerSonner = () => {
    Animated.sequence([
      // Sobe o alerta
      Animated.spring(sonnerAnim, { 
        toValue: -40, 
        useNativeDriver: true, 
        friction: 8,
        tension: 40 
      }),
      Animated.delay(3000),
      // Esconde o alerta
      Animated.timing(sonnerAnim, { 
        toValue: 150, 
        duration: 300, 
        useNativeDriver: true 
      })
    ]).start();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const sendToBackend = async () => {
    if (!name || !phone) {
      Alert.alert("Erro", "Por favor, preencha o seu nome e telefone.");
      return;
    }

    const reservationData = {
      id_mesa: tableId,
      nome_cliente: name,
      numero_do_cliente: parseInt(phone.replace(/[^0-9]/g, '')),
      quantidade_pessoas: people,
      data: date.toLocaleDateString('pt-PT')
    };

    try {
      const response = await fetch(`http://${SERVER_IP}:8080/reservar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        handleSuccess();
      } else {
        Alert.alert("Erro no Banco C", "Não foi possível gravar no ficheiro .dat");
      }
    } catch (error) {
      Alert.alert("Erro de Conexão", "Servidor offline. Verifique o IP.");
    }
  };

  const handleSuccess = () => {
    onClose(); // Fecha o modal de reserva
    setTimeout(triggerSonner, 500); // Dispara o feedback visual
    
    // Reset do formulário
    setName('');
    setPhone('');
    setPeople(2);
    setDate(new Date());
  };

  return (
    <>
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.title}>Confirmar Reserva</Text>
            <Text style={styles.subtitle}>Mesa selecionada: {tableId}</Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.label}>NOME DO CLIENTE</Text>
              <TextInput 
                style={styles.input} 
                value={name} 
                onChangeText={setName} 
                placeholder="Seu nome"
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

              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>PESSOAS</Text>
                  <View style={styles.counter}>
                    <TouchableOpacity onPress={() => setPeople(Math.max(1, people - 1))}>
                      <Text style={styles.counterText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{people}</Text>
                    <TouchableOpacity onPress={() => setPeople(people + 1)}>
                      <Text style={styles.counterText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.label}>DATA</Text>
                  <TouchableOpacity style={styles.datePickerBtn} onPress={() => setShowDatePicker(true)}>
                    <Text style={{ color: '#FFF' }}>{date.toLocaleDateString('pt-PT')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}

              <TouchableOpacity style={styles.mainBtn} onPress={sendToBackend}>
                <Text style={styles.mainBtnText}>Finalizar Sincronização C</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                <Text style={styles.closeText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SONNER (Feedback de Sucesso Animado) */}
      <Animated.View style={[styles.sonner, { transform: [{ translateY: sonnerAnim }] }]}>
        <View style={styles.sonnerContent}>
          <View style={styles.sonnerIcon}>
             <CheckCircle2 color="#10B981" size={18} />
          </View>
          <View>
            <Text style={styles.sonnerTitle}>Sincronização Concluída</Text>
            <Text style={styles.sonnerDesc}>Mesa {tableId} inserida no Banco_Reserva.dat</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  sheet: { 
    backgroundColor: '#0F0F0F', borderTopLeftRadius: 32, borderTopRightRadius: 32, 
    padding: 24, height: height * 0.7, borderWidth: 1, borderColor: '#222'
  },
  handle: { width: 40, height: 4, backgroundColor: '#333', alignSelf: 'center', marginBottom: 20 },
  title: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#10B981', fontSize: 14, marginBottom: 25 },
  label: { color: '#555', fontSize: 10, fontWeight: '800', marginBottom: 8, letterSpacing: 1 },
  input: { 
    backgroundColor: '#1A1A1A', borderRadius: 16, padding: 18, 
    color: '#FFF', marginBottom: 20, borderWidth: 1, borderColor: '#333'
  },
  row: { flexDirection: 'row', marginBottom: 25 },
  counter: { 
    flexDirection: 'row', backgroundColor: '#1A1A1A', 
    borderRadius: 16, alignItems: 'center', justifyContent: 'space-between', padding: 12,
    borderWidth: 1, borderColor: '#333'
  },
  counterText: { color: '#10B981', fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10 },
  counterValue: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  datePickerBtn: { 
    backgroundColor: '#1A1A1A', borderRadius: 16, padding: 18, 
    borderWidth: 1, borderColor: '#333', alignItems: 'center' 
  },
  mainBtn: { backgroundColor: '#10B981', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  mainBtnText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  closeBtn: { padding: 20, alignItems: 'center' },
  closeText: { color: '#555', fontWeight: '600' },
  // ESTILOS DO SONNER
  sonner: {
    position: 'absolute', bottom: 0, left: 16, right: 16,
    backgroundColor: '#FFF', borderRadius: 20, padding: 16, elevation: 12, zIndex: 9999,
    shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 15,
  },
  sonnerContent: { flexDirection: 'row', alignItems: 'center' },
  sonnerIcon: { marginRight: 12 },
  sonnerTitle: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  sonnerDesc: { color: '#666', fontSize: 12 }
});