import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  FlatList 
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ChevronLeft, 
   
  Search, 
 
  MapPin, 
  Star,
  Users, 
  LayoutGrid, 
  Map as MapIcon, 
  Clock,
  CalendarCheck
} from "lucide-react-native";
import { FloatingActionButton } from "./FloatingActionButton";

const { width } = Dimensions.get("window");

const t = {
  overview: "Seatify",
  nearby: "Próximos a você",
  free: "Livres",
  occupied: "Ocupados",
  Reserved: "Reservados",
};

const RESTAURANTS = [
  { id: '1', name: 'Lumina', rating: '4.9', loc: 'Luanda', img: require('../../assets/images/images (2).jpeg'),des:'Contemporânea' },
  { id: '2', name: 'Grill', rating: '4.7', loc: 'Talatona' , img: require('../../assets/images/images (1).jpeg'),des:'Bistrôs'  },
  { id: '3', name: 'Foods', rating: '4.3', loc: '1º de Maio' , img: require('../../assets/images/images.jpeg'),des:'Autor'  },
  { id: '4', name: 'GoodEat', rating: '4.6', loc: ' Vila de Cacuaco', img: require('../../assets/images/images (4).jpeg'),des:'Bistrôs'  },
  { id: '5', name: 'KFC', rating: '4.1', loc: 'Vila de Viana', img: require ('../../assets/images/images (6).jpeg'),des:'Casual'  },
  { id: '6', name: 'Gormet', rating: '4.5', loc: 'Vila Alice', img: require ('../../assets/images/images (5).jpeg') ,des:'Monotemáticos' },
];

const TABLES = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, status: (i + 1) % 2 === 0 ? 'occupied' : 'free' }));

export default function Dashboard({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const renderRestaurant = ({ item }: any) => (
    <ScrollView>
    <TouchableOpacity style={styles.restaurantCard}>
      <Image 
        style={styles.cardImage}
        source={item.img} 
      />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>ABERTO</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star color="#F59E0B" size={14} fill="#F59E0B" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.locationRow}>
          <MapPin color="#64748B" size={14} />
          <Text style={styles.locationText}>{item.loc} · {item.des}</Text>
        </View>
          
      </View>
    </TouchableOpacity>
    </ScrollView>
  );

  return (
  
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <LinearGradient colors={['#1A1A22', '#0F0F12']} style={styles.header}>
          <SafeAreaView>
            <View style={styles.headerTop}>
              <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                <ChevronLeft color="#FFFFFF" size={24} />
              </TouchableOpacity>
              
              <View style={{ alignItems: 'center' }}>
                
                <Text style={styles.headerTitle}>{t.overview}</Text>
              </View>

              <TouchableOpacity style={styles.iconButton}>
                <CalendarCheck color="#FFFFFF" size={22} />
                <div style={styles.notificationDot} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
              <Search color="#94A3B8" size={20} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar restaurante..."
                placeholderTextColor="#64748B"
                style={styles.searchInput}
              />
              
            </View>
          </SafeAreaView>
        </LinearGradient>
        

        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <StatCard label={t.free} value="8" color="#10B981" bgColor="rgba(16, 185, 129, 0.1)" />
            <StatCard label={t.occupied} value="7" color="#FB7185" bgColor="rgba(251, 113, 133, 0.1)" />
            <StatCard label={t.Reserved} value="7" color="#f19f06ff" bgColor="rgba(251, 242, 113, 0.1)" />
            </View>

          <Text style={styles.sectionTitle}>{t.nearby}</Text>
          <FlatList
            horizontal
            data={RESTAURANTS}
            renderItem={renderRestaurant}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 20 }}
            style={styles.horizontalScroll}
          />

          <View style={styles.viewSelectorRow}>
            <View>
              <Text style={styles.sectionTitle}>Escolha as melhores Mesas</Text>
              <Text style={styles.sectionSubtitle}>Selecione uma mesa disponível</Text>
            </View>
            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                onPress={() => setViewMode('grid')}
                style={[styles.toggleItem, viewMode === 'grid' && styles.toggleActive]}
              >
                <LayoutGrid color={viewMode === 'grid' ? '#FFF' : '#64748B'} size={18} />
              </TouchableOpacity>
              
            </View>
          </View>

          <View style={styles.grid}>
            {TABLES.map((mesa) => (
              <TableCardMobile key={mesa.id} number={mesa.id} status={mesa.status as any} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.fabContainer}>
        <TouchableOpacity >
         <FloatingActionButton />
        </TouchableOpacity>
        
      </View>
    </View>
    
  

  );
}



function StatCard({ label, value, color, bgColor }: any) {
  return (
    <View style={[styles.statCard, { backgroundColor: bgColor }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

function TableCardMobile({ number, status }: { number: number, status: 'free' | 'occupied'|'Reserved' }) {
  const isFree = status === 'free';
  return (
    
    <TouchableOpacity style={[styles.tableCard, isFree ? styles.tableFree : styles.tableOccupied]}>
      <View style={styles.tableCardHeader}>
        <Text style={styles.tableMesaLabel}>MESA</Text>
        <View style={[styles.statusDot, { backgroundColor: isFree ? '#10B981' : '#F43F5E'}]} />
      </View>
      <Text style={styles.tableNumber}>{number.toString().padStart(2, '0')}</Text>
      <View style={styles.capacityRow}>
        <Users color={isFree ? "#10B981" : "#64748B"} size={12} />
        <Text style={styles.capacityText}>4</Text>
      </View>
    </TouchableOpacity>
    
  );
}





// ESTILOS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F12' },
  header: { paddingHorizontal: 20, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  iconButton: { width: 48, height: 48, backgroundColor: '#25252E', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  brandText: { fontSize: 10, color: '#34D399', fontWeight: 'bold', letterSpacing: 2 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  notificationDot: { position: 'absolute', top: 12, right: 12, width: 10, height: 10, backgroundColor: '#10B981', borderRadius: 5, borderWidth: 2, borderColor: '#25252E' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(37, 37, 46, 0.6)', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 },
  searchInput: { flex: 1, marginLeft: 12, color: '#FFF' },
  filterButton: { backgroundColor: 'rgba(16, 185, 129, 0.2)', padding: 8, borderRadius: 12 },
  content: { paddingHorizontal: 20, paddingTop: 24 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  statCard: { width: '31%', padding: 16, borderRadius: 24, alignItems: 'center' },
  statLabel: { color: '#94A3B8', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '900' },
  sectionTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  horizontalScroll: { marginHorizontal: -20, paddingLeft: 20, marginBottom: 32 },
  restaurantCard: { marginRight: 16, width: 280, backgroundColor: '#1A1A22', borderRadius: 24, overflow: 'hidden' },
  cardImage: { width: '100%', height: 150 },
  badge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#10B981', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  cardContent: { padding: 16 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: '#F59E0B', marginLeft: 4, fontWeight: 'bold' },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  locationText: { color: '#64748B', fontSize: 12, marginLeft: 4 },
  viewSelectorRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  sectionSubtitle: { color: '#64748B', fontSize: 12 },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#1A1A22', padding: 4, borderRadius: 12 },
  toggleItem: { padding: 8, borderRadius: 10 },
  toggleActive: { backgroundColor: '#10B981' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tableCard: { width: '31%', aspectRatio: 1, borderRadius: 20, marginBottom: 15, padding: 12, justifyContent: 'space-between', borderWidth: 1 },
  tableFree: { backgroundColor: '#1A1A22', borderColor: '#10B981' },
  tableOccupied: { backgroundColor: '#16161D', borderColor: 'transparent', opacity: 0.4 },
  tableCardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  tableMesaLabel: { color: '#64748B', fontSize: 9, fontWeight: 'bold' },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  tableNumber: { color: '#FFF', fontSize: 24, fontWeight: '900', textAlign: 'center' },
  capacityRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  capacityText: { color: '#94A3B8', fontSize: 10, marginLeft: 4 },
  fabContainer: { position: 'absolute', bottom: 30, left: 20, right: 20 },
  fab: { backgroundColor: '#10B981', padding: 18, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  fabText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
});