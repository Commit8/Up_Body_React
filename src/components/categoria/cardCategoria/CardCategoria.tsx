// #DE2D30 - vermelho
// #EF942A - laranja
// #79BE48 - verde
// #3F9FC1 - azul
// #4B4A9C - violeta
// #57417F - roxo
// #B93A6F - rosa

import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
  tipo: string;
  onEditar: (id: number) => void;
  onDeletar: (id: number) => void;
}

function CardCategoria({ categoria, onEditar, onDeletar }: CardCategoriaProps) {
  return (
    <div
      key={categoria.id}
      className="bg-[#222]/80 border border-[#FF7F50]/40 rounded-2xl p-6 shadow-md text-center flex flex-col justify-between hover:scale-110 transition hover:shadow-orange-500/30"
    >
      <div>
        {/* Ícone genérico (opcional: personalize conforme tipo) */}
        <div className="text-4xl mb-4 text-orange-400">🏋️‍♂️</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {categoria.tipo}
        </h3>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => onEditar(categoria.id)}
          className="bg-green-600 text-white text-sm px-3 py-1 rounded-md hover:bg-green-800 cursor-pointer"
        >
          Editar
        </button>
        <button
          onClick={() => onDeletar(categoria.id)}
          className="bg-orange-700 text-white text-sm px-3 py-1 rounded-md hover:bg-orange-900 cursor-pointer"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

export default CardCategoria;
