#include <stdio.h>
#include <math.h>

#define PI 3.14159265358979323846

typedef struct {
    char name[50];
    double lat;
    double lon;
} Restaurant;

// Cálculo de distância Haversine em C
double calculate_distance(double lat1, double lon1, double lat2, double lon2) {
    double dlat = (lat2 - lat1) * PI / 180.0;
    double dlon = (lon2 - lon1) * PI / 180.0;
    
    double a = pow(sin(dlat/2), 2) + cos(lat1 * PI / 180.0) * cos(lat2 * PI / 180.0) * pow(sin(dlon/2), 2);
    double c = 2 * atan2(sqrt(a), sqrt(1-a));
    
    return 6371.0 * c; // Distância em KM
}

// Função para buscar restaurantes (Lógica Core)
void find_nearby(double userLat, double userLon, Restaurant list[], int size) {
    /*for(int i = 0; i < size; i++) {
        double dist = calculate_distance(userLat, userLon, list[i].lat, list[i].lon);
        if(dist < 5.0) { // Filtro de 5km
            printf("Restaurante: %s a %.2f km\n", list[i].name, dist);
        }
    }*/
}