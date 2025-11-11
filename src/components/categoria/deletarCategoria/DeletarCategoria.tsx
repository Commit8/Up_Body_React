/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";

function DeletarCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
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

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categoria/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      ToastAlerta("Categoria apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar categoria", "erro");
      }
    }
    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center mx-auto pb-20 bg-[url('https://images.unsplash.com/photo-1758506971667-fbaa8942258a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170')] bg-cover bg-center">
      <div className="w-[4/5] flex flex-col justify-center items-center px-5 pb-10 bg-linear-to-b from-[#111] via-[#1a1a1a] to-black opacity-80 rounded-2xl">
        <h1 className="font-bold text-4xl text-center my-4 text-[#FAF9F6]">
          Deletar Categoria
        </h1>
        <p className="text-center font-semibold mb-4 text-[#FAF9F6]">
          Você tem certeza de que deseja apagar a categoria a seguir?
        </p>

        <div
          key={categoria.id}
          className="bg-[#222]/80 rounded-2xl p-6 shadow-md text-center flex flex-col justify-between"
        >
          <div>
            {/* Ícone genérico (opcional: personalize conforme tipo) */}
            <div className="text-4xl mb-4 text-orange-400">🏋️‍♂️</div>
            <p className="text-[#FAF9F6] font-semibold text-xl mb-6">
              {categoria.tipo}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            <button
              className="text-white px-5 w-full py-1 rounded-md hover:opacity-90 bg-green-600 hover:bg-green-800"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="text-white px-5 w-full py-1 rounded-md hover:opacity-90 bg-orange-700 hover:bg-orange-900"
              onClick={deletarCategoria}
            >
              {isLoading ? (
                <ClipLoader color="#fff" size={24} />
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

export default DeletarCategoria;
