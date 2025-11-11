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
    <div className="relative p-0.5 bg-linear-to-r from-yellow-500 to-green-500 rounded-2xl">
      <div className="bg-gray-800 flex flex-col rounded-2xl overflow-hidden justify-between h-full">
        <div className="text-white">
          <div className="flex w-full  py-2 px-4 items-center gap-4 ">
            <img
              src={servico.usuario?.foto || "https://i.imgur.com/pK6vSCy.png"}
              onError={(e) => e.currentTarget.src = "https://i.imgur.com/pK6vSCy.png"}
              className="h-12 rounded-full"
              alt={servico.usuario?.foto}
            />
            <h3 className="text-lg font-bold text-center uppercase">
              {servico.usuario.nome}
            </h3>
          </div>
          <hr className="h-0.5 border-0 bg-linear-to-r from-yellow-500 to-green-500" />
          <div className="p-6">
            <h4 className="text-lg font-semibold uppercase">
             {servico.plano}
            </h4>
            <hr className="h-0.5 border-0 bg-linear-to-r from-yellow-500 to-green-500" />
            <p>Categoria: {servico.categoria?.tipo}</p>
            <p>Valor: {servico.valor}</p>
            <hr className="h-0.5 border-0 bg-linear-to-r from-yellow-500 to-green-500" />
            <p>
              Inicio:{" "}
              {new Intl.DateTimeFormat("pt-br", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(servico.inicio))}
            </p>

            {servico?.termino !== null ? (
              <p>
                Termino:
                {new Intl.DateTimeFormat("pt-br", {
                  dateStyle: "short",
                  timeStyle: "short",
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
              className="w-full text-white bg-linear-to-r from-[#308733] to-[#02dd09] hover:from-[#479a49] hover:to-[#44ff00] transition-all duration-300 flex items-center justify-center py-2"
            >
              <button>Editar</button>
            </Link>
            <Link
              to={`/deletarservico/${servico.id}`}
              className="text-white bg-linear-to-r from-[#eabe0f] to-[#e67e22] hover:from-[#ffcf00] hover:to-[#ff9840] transition-all duration-300 w-full flex items-center justify-center"
            >
              <button>Deletar</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardServico;
