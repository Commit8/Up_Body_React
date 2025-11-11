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
    <div className="bg-[#FF7F50] border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full  py-2 px-4 items-center gap-4">
          <img
            src={servico.usuario?.foto || "https://i.imgur.com/pK6vSCy.png"}
            className="h-12 rounded-full"
            alt={servico.usuario?.foto}
          />
          <h3 className="text-lg font-bold text-center uppercase">
            {servico.usuario.nome}
          </h3>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">plano - {servico.plano}</h4>
          <p>Categoria: {servico.categoria?.tipo}</p>
          <p>Valor: {servico.valor}</p>
          <p>
           Inicio: {new Intl.DateTimeFormat("pt-br", {
              dateStyle: "medium",
              timeStyle: "medium",
            }).format(new Date(servico.inicio))}
          </p>
          {servico?.termino !== null ? (
            <p>Termino: 
              {new Intl.DateTimeFormat("pt-br", {
                dateStyle: "medium",
                timeStyle: "medium",
              }).format(new Date(servico?.termino))}
            </p>
          ) : (
            <p>Em andamento</p>
          )}
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
