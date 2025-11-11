import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ClipLoader } from "react-spinners";
import type Servico from "../../../models/Servico";
import { AuthContext } from "../../../contexts/AuthContext";

function DeletarServico() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [servico, setServico] = useState<Servico>({} as Servico);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/servicos/${id}`, setServico, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarServico() {
    setIsLoading(true);

    try {
      await deletar(`/servicos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      ToastAlerta("Serviço apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a serviço.", "erro");
      }
    }
    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/servicos");
  }

  return (
    <div className="w-full pt-22 h-screen bg-[url('https://images.unsplash.com/photo-1758506971667-fbaa8942258a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')] bg-cover bg-center">
      <div className="container w-1/3 mx-auto">
        <h1 className="text-5xl text-white font-bold text-center my-4 pt-20">Deletar Serviço</h1>

        <p className="text-center pt-5 text-white  font-bold mb-4">
          Você tem certeza de que deseja apagar o serviço a seguir ?
        </p>

        <div className="border-b-white flex flex-col rounded-2xl overflow-hidden justify-between">
          <header className="py-2 px-6 bg-white text-black font-bold text-2xl">
            Serviço
          </header>
          <div className="p-4">
            <p className="text-xl text-white h-full">{servico.plano}</p>
            <p className="text-white">R$ {servico.valor}</p>
          </div>
          <div className="flex">
            <button
              className="text-slate-100 bg-black hover:bg-red-800 w-full py-2"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="text-slate-100 bg-red-700 hover:bg-red-800 w-full py-2"
              onClick={deletarServico}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarServico;
