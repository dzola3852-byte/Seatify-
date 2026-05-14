#include "mongoose.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    int id_mesa;
    char nome_cliente[50];
    int numero_do_cliente;
    int ocupada; // 0: Livre, 1: Reservada, 2: Ocupada (QR)
} Reserva;

const char *DB_FILE = "Banco_Reserva.dat";

// --- PERSISTÊNCIA ---
void salvar_reserva(Reserva r) {
    FILE *file = fopen(DB_FILE, "rb+");
    if (!file) file = fopen(DB_FILE, "wb");

    Reserva temp;
    int encontrado = 0;
    long offset = (long)sizeof(Reserva);

    while (fread(&temp, sizeof(Reserva), 1, file)) {
        if (temp.id_mesa == r.id_mesa) {
            fseek(file, -offset, SEEK_CUR);
            encontrado = 1;
            break;
        }
    }
    if (!encontrado) fseek(file, 0, SEEK_END);
    fwrite(&r, sizeof(Reserva), 1, file);
    fclose(file);
    printf("[DB] Mesa %d salva para %s\n", r.id_mesa, r.nome_cliente);
}

// --- LOGICA QR CHECK-IN ---
int fazer_checkin(int id) {
    FILE *file = fopen(DB_FILE, "rb+");
    if (!file) return 0;
    Reserva r;
    long offset = (long)sizeof(Reserva);
    while (fread(&r, sizeof(Reserva), 1, file)) {
        if (r.id_mesa == id) {
            r.ocupada = 2;
            fseek(file, -offset, SEEK_CUR);
            fwrite(&r, sizeof(Reserva), 1, file);
            fclose(file);
            return 1;
        }
    }
    fclose(file);
    return 0;
}

// --- SERVIDOR ---
static void ev_handler(struct mg_connection *c, int ev, void *ev_data) {
    if (ev == MG_EV_HTTP_MSG) {
        struct mg_http_message *hm = (struct mg_http_message *) ev_data;

        // Rota: /reservar (Usando mg_match para compatibilidade total)
        if (mg_match(hm->uri, mg_str("/reservar"), NULL)) {
            Reserva r;
            double id, tel;
            
            mg_json_get_num(hm->body, "$.id_mesa", &id);
            mg_json_get_num(hm->body, "$.numero_do_cliente", &tel);
            
            char *nome = mg_json_get_str(hm->body, "$.nome_cliente");
            
            r.id_mesa = (int)id;
            r.numero_do_cliente = (int)tel;
            r.ocupada = 1;
            
            if(nome) { 
                snprintf(r.nome_cliente, sizeof(r.nome_cliente), "%s", nome); 
                free(nome); 
            }

            salvar_reserva(r);
            mg_http_reply(c, 200, "Content-Type: application/json\r\n", "{\"status\":\"ok\"}");
        } 
        // Rota: /checkin 
        (QR Code)
        else if (mg_match(hm->uri, mg_str("/checkin"), NULL)) {
            char id_str[10];
            mg_http_get_var(&hm->query, "id", id_str, sizeof(id_str));
            if (fazer_checkin(atoi(id_str))) {
                mg_http_reply(c, 200, "Content-Type: text/html\r\n", "<h1>Check-in OK!</h1>");
            } else {
                mg_http_reply(c, 404, "", "Nao encontrado");
            }
        }
    }
}

// Rota: /listar_reservas
else if (mg_match(hm->uri, mg_str("/listar_reservas"), NULL)) {
    FILE *file = fopen(DB_FILE, "rb");
    if (!file) {
        mg_http_reply(c, 200, "Content-Type: application/json\r\n", "[]");
        return;
    }

    Reserva r;
    mg_http_reply(c, 200, "Content-Type: application/json\r\n", "");
    mg_printf(c, "[");
    int primeiro = 1;

    while (fread(&r, sizeof(Reserva), 1, file)) {
        if (!primeiro) mg_printf(c, ",");
        mg_printf(c, "{\"id_mesa\":%d, \"nome_cliente\":\"%s\", \"numero\":%d, \"ocupada\":%d}", 
                  r.id_mesa, r.nome_cliente, r.numero_do_cliente, r.ocupada);
        primeiro = 0;
    }
    mg_printf(c, "]");
    fclose(file);
}

int main() {
    struct mg_mgr mgr;
    mg_mgr_init(&mgr);
    printf("Think Tech Server: http://0.0.0.0:8080\n");
    mg_http_listen(&mgr, "http://0.0.0.0:8080", ev_handler, NULL);
    for (;;) mg_mgr_poll(&mgr, 1000);
    return 0;
}