import React, { useEffect, useMemo, useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image, 
  Dimensions,
  SafeAreaView,
  StatusBar
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ChevronLeft, 
  Bell, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Users, 
  LayoutGrid, 
  Map as MapIcon, 
  Clock,
  X
} from "lucide-react-native";


// Mock das traduções e dados baseado no seu source
const t = {
  overview: "Visão Geral",
  restaurant: "Restaurante",
  cuisine: "Cozinha",
  filters: "Filtros",
  all: "Todos",
  nearby: "Próximos a você",
  free: "Livre",
  occupied: "Ocupado",
  reserved: "Reservado",
  occupancy: "Ocupação",
  grid: "Grade",
  map: "Mapa",
  bookTable: "Reservar Agora",
  km: "km",
  table: "Mesa"
};
import { Lang } from "@/constants/data";

type Props = {
  lang:Lang;
  onBack:()=> void;
}

const { width } = Dimensions.get("window");

export default function Dashboard({ lang,onBack }:Props) {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  return (
    <SafeAreaView className="flex-1 bg-[#0F0F12]">
      <StatusBar barStyle="light-content" />
      
      {/* HEADER PROFISSIONAL COM GRADIENTE */}
      <LinearGradient
        colors={['#1A1A22', '#0F0F12']}
        className="px-5 pt-4 pb-6 rounded-b-[32px] shadow-2xl"
      >
        <View className="flex-row justify-between items-center mb-6">
          <TouchableOpacity 
            onPress={onBack}
            className="w-12 h-12 bg-[#25252E] rounded-2xl items-center justify-center border border-white/5"
          >
            <ChevronLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          
          <View className="items-center">
            <Text className="text-[10px] text-emerald-400 font-bold tracking-[2px] uppercase">
              THINK TECH · SEATIFY
            </Text>
            <Text className="text-white text-lg font-bold">{t.overview}</Text>
          </View>

          <TouchableOpacity className="w-12 h-12 bg-[#25252E] rounded-2xl items-center justify-center border border-white/5">
            <Bell color="#FFFFFF" size={22} />
            <View className="absolute top-3 right-3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#25252E]" />
          </TouchableOpacity>
        </View>

        {/* SEARCH BAR GLASSMORPHISM */}
        <View className="flex-row items-center bg-[#25252E]/60 border border-white/10 rounded-2xl px-4 py-3">
          <Search color="#94A3B8" size={20} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar restaurante ou culinária..."
            placeholderTextColor="#64748B"
            className="flex-1 ml-3 text-white text-base"
          />
          <TouchableOpacity className="bg-emerald-500/20 p-2 rounded-xl">
            <Filter color="#10B981" size={20} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-5 pt-6">
        
        {/* CARDS DE STATUS (NEUMORPHISM STYLE) */}
        <View className="flex-row justify-between mb-8">
          <StatCard label={t.free} value="12" color="text-emerald-400" bgColor="bg-emerald-400/10" />
          <StatCard label={t.occupied} value="08" color="text-rose-400" bgColor="bg-rose-400/10" />
          <StatCard label={t.occupancy} value="64%" color="text-blue-400" bgColor="bg-blue-400/10" />
        </View>

        {/* SEÇÃO DE RESTAURANTES EM DESTAQUE */}
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-white text-xl font-bold">{t.nearby}</Text>
          <Text className="text-emerald-500 font-semibold">Ver todos</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5 px-5 mb-8">
          {[1, 2].map((item) => (
            <TouchableOpacity 
              key={item}
              activeOpacity={0.9}
              className="mr-5 w-[280px] bg-[#1A1A22] rounded-[24px] overflow-hidden border border-white/5"
            >
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500' }} 
                className="w-full h-40"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                className="absolute top-0 left-0 right-0 h-40"
              />
              <View className="absolute top-4 right-4 bg-emerald-500 px-3 py-1 rounded-full">
                <Text className="text-white text-[10px] font-bold">ABERTO</Text>
              </View>
              
              <View className="p-4">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-white text-lg font-bold">Lumina Gastronomia</Text>
                  <View className="flex-row items-center bg-white/5 px-2 py-1 rounded-lg">
                    <Star color="#F59E0B" size={14} fill="#F59E0B" />
                    <Text className="text-amber-400 ml-1 font-bold">4.9</Text>
                  </View>
                </View>
                <View className="flex-row items-center">
                  <MapPin color="#64748B" size={14} />
                  <Text className="text-slate-400 text-xs ml-1">Luanda · Contemporânea</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SELETOR DE VISTA (GRID / MAPA) */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-lg font-bold">Layout de Mesas</Text>
            <Text className="text-slate-500 text-xs">Selecione uma mesa disponível</Text>
          </View>
          
          <View className="flex-row bg-[#1A1A22] p-1 rounded-2xl border border-white/5">
            <TouchableOpacity 
              onPress={() => setViewMode('grid')}
              className={`flex-row items-center px-4 py-2 rounded-xl ${viewMode === 'grid' ? 'bg-emerald-500' : ''}`}
            >
              <LayoutGrid color={viewMode === 'grid' ? '#FFF' : '#64748B'} size={18} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setViewMode('map')}
              className={`flex-row items-center px-4 py-2 rounded-xl ${viewMode === 'map' ? 'bg-emerald-500' : ''}`}
            >
              <MapIcon color={viewMode === 'map' ? '#FFF' : '#64748B'} size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* GRID DE MESAS MELHORADO */}
        <View className="flex-row flex-wrap justify-between pb-10">
          {[1, 2, 3, 4, 5, 6].map((mesa) => (
            <TableCardMobile key={mesa} number={mesa} status={mesa % 3 === 0 ? 'occupied' : 'free'} />
          ))}
        </View>

      </ScrollView>

      {/* FLOATING ACTION BUTTON (RESERVA RÁPIDA) */}
      <View className="absolute bottom-8 left-0 right-0 items-center px-5">
        <TouchableOpacity 
          className="w-full bg-emerald-500 py-4 rounded-2xl flex-row justify-center items-center shadow-xl shadow-emerald-500/40"
          style={{ elevation: 8 }}
        >
          <Clock color="#FFF" size={20} className="mr-2" />
          <Text className="text-white font-bold text-lg">Reserva Rápida</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// COMPONENTES AUXILIARES
function StatCard({ label, value, color, bgColor }: any) {
  return (
    <View className={`${bgColor} w-[30%] p-4 rounded-[24px] border border-white/5 items-center`}>
      <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">{label}</Text>
      <Text className={`${color} text-2xl font-black`}>{value}</Text>
    </View>
  );
}

function TableCardMobile({ number, status }: { number: number, status: 'free' | 'occupied' }) {
  const isFree = status === 'free';
  
  return (
    <TouchableOpacity 
      className={`w-[31%] aspect-square rounded-[24px] mb-4 p-3 justify-between border-2 
        ${isFree ? 'bg-[#1A1A22] border-emerald-500/30' : 'bg-[#1A1A22]/40 border-transparent opacity-50'}`}
    >
      <View className="flex-row justify-between items-start">
        <Text className="text-slate-500 text-[10px] font-bold">MESA</Text>
        <View className={`w-2 h-2 rounded-full ${isFree ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      </View>
      
      <Text className="text-white text-3xl font-black text-center">
        {number.toString().padStart(2, '0')}
      </Text>
      
      <View className="flex-row justify-center items-center">
        <Users color={isFree ? "#10B981" : "#64748B"} size={12} />
        <Text className="text-slate-400 text-[10px] ml-1 font-bold">4</Text>
      </View>
    </TouchableOpacity>
  );
}