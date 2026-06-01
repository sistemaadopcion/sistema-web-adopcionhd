package com.example.backend.service;

import com.example.backend.model.Mascota;
import com.example.backend.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MascotaService {

    @Autowired
    private MascotaRepository mascotaRepository;

    // ─── Registrar nueva mascota ───────────────────────────
    public Mascota registrar(Mascota mascota) {
        return mascotaRepository.save(mascota);
    }

    // ─── Listar todas las mascotas ─────────────────────────
    public List<Mascota> listarTodas() {
        return mascotaRepository.findAll();
    }

    // ─── Listar mascotas disponibles ───────────────────────
    public List<Mascota> listarDisponibles() {
        return mascotaRepository.findByEstado(
                Mascota.EstadoMascota.DISPONIBLE);
    }

    // ─── Buscar mascota por ID ─────────────────────────────
    public Optional<Mascota> buscarPorId(Integer id) {
        return mascotaRepository.findById(id);
    }

    // ─── Buscar mascotas por especie ───────────────────────
    public List<Mascota> buscarPorEspecie(Mascota.Especie especie) {
        return mascotaRepository.findByEspecie(especie);
    }

    // ─── Actualizar mascota ────────────────────────────────
    public Mascota actualizar(Integer id, Mascota mascotaActualizada) {
        Mascota mascotaExistente = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Mascota no encontrada con ID: " + id));

        mascotaExistente.setNombre(mascotaActualizada.getNombre());
        mascotaExistente.setEspecie(mascotaActualizada.getEspecie());
        mascotaExistente.setRaza(mascotaActualizada.getRaza());
        mascotaExistente.setEdad(mascotaActualizada.getEdad());
        mascotaExistente.setTamanio(mascotaActualizada.getTamanio());
        mascotaExistente.setSexo(mascotaActualizada.getSexo());
        mascotaExistente.setEstado(mascotaActualizada.getEstado());
        mascotaExistente.setDescripcion(mascotaActualizada.getDescripcion());
        mascotaExistente.setFoto(mascotaActualizada.getFoto());

        return mascotaRepository.save(mascotaExistente);
    }

    // ─── Cambiar estado de mascota ─────────────────────────
    public Mascota cambiarEstado(Integer id, Mascota.EstadoMascota nuevoEstado) {
        Mascota mascota = mascotaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Mascota no encontrada con ID: " + id));

        mascota.setEstado(nuevoEstado);
        return mascotaRepository.save(mascota);
    }

    // ─── Eliminar mascota ──────────────────────────────────
    public void eliminar(Integer id) {
        if (!mascotaRepository.existsById(id)) {
            throw new RuntimeException(
                    "Mascota no encontrada con ID: " + id);
        }
        mascotaRepository.deleteById(id);
    }
}