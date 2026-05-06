export type Lang = "pt" | "en" | "fr";

type Translation = {
  chooseLang: string;
    welcome: string;
    subtitle: string;
    nearby: string;
    bookTable: string;
    editReservation:string;
    confirm:string;
    cancel:string;
}

export const translations: Record<Lang, Translation> = {

  pt: {
    chooseLang: "Escolha seu idioma",
    welcome: "Bem-vindo ao Seatify",
    subtitle: "A forma mais rápida de reservar sua mesa favorita.",
    nearby: "Restaurantes Próximos",
    bookTable: "Reservar Mesa",
    editReservation: "Editar Reserva",
    confirm: "Confirmar",
    cancel: "Cancelar",
  },
  en: {
    chooseLang: "Choose your language",
    welcome: "Welcome to Seatify",
    subtitle: "The fastest way to book your favorite table.",
    nearby: "Nearby Restaurants",
    bookTable: "Book Table",
    editReservation: "Edit Reservation",
    confirm: "Confirm",
    cancel: "Cancel",
  },
  fr: {
    chooseLang: "Choisissez votre langue",
    welcome: "Bienvenue sur Seatify",
    subtitle: "Le moyen le plus rapide de réserver votre table préférée.",
    nearby: "Restaurants à Proximité",
    bookTable: "Réserver",
    editReservation: "Modifier la Réservation",
    confirm: "Confirmer",
    cancel: "Annuler",
  },
};

export const restaurants = [
  {
    id: "1",
    name: "Central Gourmet",
    cuisine: "Italiana",
    city: "Luanda",
    rating: 4.9,
    address: "Rua Rainha Ginga, 12",
    lat: -8.815,
    lng: 13.234,
    open: true,
  },
  {
    id: "2",
    name: "Ocean View",
    cuisine: "Frutos do Mar",
    city: "Luanda",
    rating: 4.7,
    address: "Ilha do Cabo",
    lat: -8.798,
    lng: 13.221,
    open: true,
  }
];