import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import type Servico from "../../../models/Servico";
import { Link } from "react-router-dom";

interface CardServicosProps {
  servico: Servico;
}

function CardServico({ servico }: CardServicosProps) {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          <img
            src={servico.usuario?.foto || "https://i.imgur.com/pK6vSCy.png"}
            className="h-12 rounded-full"
            alt={servico.usuario?.foto}
          />
          <h3 className="text-lg font-bold text-center uppercase">
            {servico.usuario.foto}
          </h3>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">{servico.plano}</h4>
          <p>{servico.categoria?.tipo}</p>
          <p>Tema: {servico.valor}</p>
          <p>
            {new Intl.DateTimeFormat("pt-br", {
              dateStyle: "medium",
              timeStyle: "medium",
            }).format(new Date(servico.inicio))}
          </p>
        </div>
      </div>
      {usuario.id === servico.usuario.id && (
        <div className="flex">
          <Link
            to={`/editarservico/${servico.id}`}
            className="w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
          >
            <button>Editar</button>
          </Link>
          <Link
            to={`/deletarservico/${servico.id}`}
            className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center"
          >
            <button>Deletar</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardServico;
