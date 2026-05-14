import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';

const SERVER_IP = "192.168.1.XX"; // Mesma config do seu Manager

export const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const response = await fetch(`http://${SERVER_IP}:8080/listar_reservas`);
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Erro ao carregar banco C:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{item.ocupada === 1 ? "RESERVADO" : "EM USO"}</Text>
      </View>
      <Text style={styles.clientName}>{item.nome_cliente}</Text>
      <Text style={styles.details}>Mesa: {item.id_mesa} • Tel: {item.numero}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservas Sincronizadas (C)</Text>
      {loading ? (
        <ActivityIndicator color="#10B981" size="large" />
      ) : (
        <FlatList
          data={reservations}
          //keyExtractor={(item) => item.id_mesa.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchReservations} tintColor="#10B981" />}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma reserva no Banco_Reserva.dat</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', padding: 20 },
  header: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#161616', padding: 20, borderRadius: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#10B981' },
  statusBadge: { alignSelf: 'flex-start', backgroundColor: '#10B98120', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8 },
  statusText: { color: '#10B981', fontSize: 10, fontWeight: 'bold' },
  clientName: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  details: { color: '#888', fontSize: 14, marginTop: 4 },
  empty: { color: '#444', textAlign: 'center', marginTop: 50 }
});
