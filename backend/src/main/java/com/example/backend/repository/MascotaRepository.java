package com.example.backend.repository;

import com.example.backend.model.Mascota;
import com.example.backend.model.Mascota.EstadoMascota; // Import necesario
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Integer> {

    // Buscar mascotas por estado único
    List<Mascota> findByEstado(EstadoMascota estado);

    // --- ESTE ES EL MÉTODO CLAVE PARA TU CATÁLOGO ---
    // Permite buscar mascotas que coincidan con cualquiera de los estados enviados
    List<Mascota> findByEstadoIn(List<EstadoMascota> estados);

    // Buscar mascotas por especie
    List<Mascota> findByEspecie(Mascota.Especie especie);

    // Buscar mascotas por tamaño
    List<Mascota> findByTamanio(Mascota.Tamanio tamanio);

    // Buscar mascotas por especie y estado
    List<Mascota> findByEspecieAndEstado(Mascota.Especie especie, EstadoMascota estado);
}