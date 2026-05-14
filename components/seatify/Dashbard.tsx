import React, { useState, useEffect, useCallback } from "react";
import { 
  View, Text, ScrollView, TouchableOpacity, TextInput, Image, 
  useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, FlatList, RefreshControl 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ChevronLeft, Search, Star, Users, CalendarCheck, CheckCircle2 
} from "lucide-react-native";
import  ReservationManager  from "./ReservationManager"; 
import { ReservationList } from "./ReservationList";

// CONFIGURAÇÃO DO SERVIDOR C
const SERVER_IP = "192.168.1.XX"; 

const RESTAURANTS = [
  { id: '1', name: 'Lumina', rating: '4.9', img: require('../../assets/images/images (2).jpeg') },
  { id: '2', name: 'Grill', rating: '4.7', img: require('../../assets/images/images (1).jpeg') },
  { id: '3', name: 'Foods', rating: '4.3', img: require('../../assets/images/images.jpeg') },
];

export default function Dashboard({ onBack }: { onBack: () => void }) {
  const { width } = useWindowDimensions();
  const [selectedRes, setSelectedRes] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [reservedTables, setReservedTables] = useState<number[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Lógica de Responsividade: Ajusta colunas baseado na largura da tela
  const numColumns = width > 700 ? 5 : width > 400 ? 4 : 3;
  const tableSize = (width - 40 - (numColumns - 1) * 12) / numColumns;

  // Função para buscar mesas ocupadas no Banco C
  const fetchStatusDasMesas = useCallback(async () => {
    try {
      const response = await fetch(`http://${SERVER_IP}:8080/listar_reservas`);
      const data = await response.json();
      // Filtra apenas os IDs das mesas que estão ocupadas ou reservadas
      const ocupadas = data.map((res: any) => res.id_mesa);
      setReservedTables(ocupadas);
    } catch (error) {
      console.log("Erro ao sincronizar mesas:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStatusDasMesas();
  }, [fetchStatusDasMesas]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStatusDasMesas();
  };

  const handleOpenReservation = () => {
    if (selectedRes && selectedTable) {
      setModalVisible(true);
    }
  };

  const renderRestaurant = ({ item }: any) => {
    const isSelected = selectedRes === item.id;
    return (
      <TouchableOpacity 
        onPress={() => setSelectedRes(item.id)}
        style={[styles.resCard, isSelected && styles.resCardSelected]}
      >
        <Image source={item.img} style={styles.resImage} />
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <CheckCircle2 color="#10B981" size={24} />
          </View>
        )}
        <View style={styles.resContent}>
          <Text style={styles.resName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.resInfo}>
            <Star color="#F59E0B" size={10} fill="#F59E0B" />
            <Text style={styles.resRating}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 160 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10B981" />}
      >
        <LinearGradient colors={['#1A1A22', '#0F0F12']} style={styles.header}>
          <View style={styles.navBar}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <ChevronLeft color="#FFF" size={20} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Seatify</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.searchContainer}>
            <Search color="#64748B" size={18} />
            <TextInput placeholder="Procurar mesa..." placeholderTextColor="#64748B" style={styles.input} />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>1. Escolha o Restaurante</Text>
          <FlatList
            horizontal
            data={RESTAURANTS}
            renderItem={renderRestaurant}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          />

          <Text style={[styles.sectionTitle, { marginTop: 32 }]}>2. Mesas Disponíveis</Text>
          <View style={styles.tableGrid}>
            {Array.from({ length: 15 }, (_, i) => i + 1).map((id) => {
              const isReserved = reservedTables.includes(id);
              const isSelected = selectedTable === id;

              return (
                <TouchableOpacity
                  key={id}
                  disabled={isReserved}
                  onPress={() => setSelectedTable(id)}
                  style={[
                    styles.tableCard, 
                    { width: tableSize, height: tableSize },
                    isReserved && styles.tableReserved,
                    isSelected && styles.tableSelected
                  ]}
                >
                  <Text style={[styles.tableNum, isSelected && { color: '#000' }, isReserved && { color: '#444' }]}>
                    {id}
                  </Text>
                  <Users color={isSelected ? "#000" : isReserved ? "#333" : "#64748B"} size={12} />
                  {isReserved && <View style={styles.reservedDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
          
        </View>
      </ScrollView>

      {/* FAB - Botão de Ação Flutuante */}
      {selectedRes && selectedTable && (
        <View style={styles.fabWrapper}>
          <TouchableOpacity style={styles.fab} onPress={handleOpenReservation}>
            <CalendarCheck color="#000" size={22} />
            <Text style={styles.fabText}>Reservar Mesa {selectedTable}</Text>
          </TouchableOpacity>
        </View>
      )}

      <ReservationManager 
        visible={modalVisible} 
        onClose={() => {
          setModalVisible(false);
          fetchStatusDasMesas(); // Atualiza a lista após fechar a reserva
        }} 
        tableId={selectedTable}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F12' },
  header: { padding: 20, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backBtn: { padding: 10, backgroundColor: '#1A1A22', borderRadius: 14, borderWidth: 1, borderColor: '#333' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', backgroundColor: '#1A1A22', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  input: { flex: 1, color: '#FFF', marginLeft: 10, fontSize: 14 },
  body: { paddingTop: 24 },
  sectionTitle: { color: '#10B981', fontSize: 12, fontWeight: '800', marginLeft: 20, marginBottom: 16, letterSpacing: 1, textTransform: 'uppercase' },
  resCard: { width: 140, marginRight: 12, backgroundColor: '#16161D', borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: '#222' },
  resCardSelected: { borderColor: '#10B981', backgroundColor: '#10B98110' },
  resImage: { width: '100%', height: 90, opacity: 0.7 },
  selectedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(16, 185, 129, 0.1)', justifyContent: 'center', alignItems: 'center' },
  resContent: { padding: 12 },
  resName: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
  resInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  resRating: { color: '#F59E0B', fontSize: 10, marginLeft: 4, fontWeight: 'bold' },
  tableGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'flex-start', gap: 12 },
  tableCard: { backgroundColor: '#16161D', borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  tableSelected: { backgroundColor: '#10B981', borderColor: '#10B981' },
  tableReserved: { backgroundColor: '#0A0A0A', borderColor: '#222', opacity: 0.6 },
  tableNum: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  reservedDot: { position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF4444' },
  fabWrapper: { position: 'absolute', bottom: 40, left: 24, right: 24 },
  fab: { backgroundColor: '#10B981', padding: 22, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#10B981', shadowOpacity: 0.3, shadowRadius: 10 },
  fabText: { color: '#000', fontWeight: '900', marginLeft: 12, fontSize: 15 }
});