export default function RecentPetsTable() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        Mascotas Recientes
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Mascota</th>
            <th>Especie</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Luna</td>
            <td>Perro</td>
            <td>Disponible</td>
          </tr>

          <tr>
            <td>Oliver</td>
            <td>Gato</td>
            <td>En tratamiento</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}