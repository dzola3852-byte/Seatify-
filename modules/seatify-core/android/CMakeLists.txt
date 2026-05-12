cmake_minimum_required(VERSION 3.10.2)

add_library(seatify-core SHARED src/main/cpp/main.c)
find_library(log-lib log)
target_link_libraries(seatify-core ${log-lib})