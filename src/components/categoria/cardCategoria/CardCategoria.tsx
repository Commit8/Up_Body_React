import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
  id: number,
  tipo: string,
  onEditar: () => void;
  onDeletar: () => void;
}

function CardCategoria({ categoria, onEditar, onDeletar}: CardCategoriaProps) {
  return (
      <div
    key={categoria.id}
    className="bg-[#222]/80 border border-[#FF7F50]/40 rounded-2xl p-6 shadow-md text-center flex flex-col justify-between transition hover:scale-105 hover:shadow-orange-500/30"
  >
    <div>
      {/* Ícone genérico (opcional: personalize conforme tipo) */}
      <div className="text-4xl mb-4 text-orange-400">🏋️‍♂️</div>
      <h3 className="text-xl font-semibold text-white mb-2">{categoria.servico}</h3>
      <p className="text-gray-400 text-sm mb-6">{categoria.tipo}</p>
    </div>

    <div className="flex justify-center gap-2">
      <button
        onClick={() => onEditar(categoria.id)}
        className="bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm px-3 py-1 rounded-md hover:opacity-90"
      >
        Editar
      </button>
      <button
        onClick={() => onDeletar(categoria.id)}
        className="bg-linear-to-r from-red-500 to-orange-500 text-white text-sm px-3 py-1 rounded-md hover:opacity-90"
      >
        Deletar
      </button>
    </div>
  </div>
  );
}

export default CardCategoria;