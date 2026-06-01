package com.example.backend.repository;

import com.example.backend.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Integer> {

    // Buscar mascotas por estado (disponible, en proceso, adoptado)
    List<Mascota> findByEstado(Mascota.EstadoMascota estado);

    // Buscar mascotas por especie
    List<Mascota> findByEspecie(Mascota.Especie especie);

    // Buscar mascotas por tamaño
    List<Mascota> findByTamanio(Mascota.Tamanio tamanio);

    // Buscar mascotas por especie y estado
    List<Mascota> findByEspecieAndEstado(Mascota.Especie especie,
                                         Mascota.EstadoMascota estado);
}