export default function PetRow({ name, type, status }) {
  return (
    <tr className="border-b last:border-none">
      <td className="py-5 font-medium">{name}</td>

      <td>{type}</td>

      <td>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
          {status}
        </span>
      </td>

      <td>✎</td>
    </tr>
  );
}