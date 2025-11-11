/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCategoria from "../cardCategoria/CardCategoria";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";

function Listacategorias() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("É necessário estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  async function buscarCategorias() {
    try {
      setIsLoading(true);
      await buscar("/categoria", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleEditar(id: number) {
    navigate(`/editarCategoria/${id}`);
  }

  async function handleDeletar(id: number) {
    navigate(`/deletarCategoria/${id}`);
    buscarCategorias();
  }

  return (
    <div className="justify-center items-center bg-gradient-to-b from-[#111] via-[#1a1a1a] to-black min-h-screen">
      
      {/* 🔹 Seção de topo responsiva */}
      <div className="relative w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[400px] overflow-hidden flex items-center justify-center">
        {/* Imagem de fundo */}
        <img
          src="https://i.imgur.com/RWgidSU.png"
          alt="Atividades físicas e bem-estar"
          className="absolute inset-0 w-full h-116 object-cover opacity-70"
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/75"></div>

        {/* Texto do topo */}
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-lg">
            TRANSFORME SEU CORPO E MENTE
          </h2>

          <p className="mt-3 sm:mt-4 text-gray-200 text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Encontre as melhores atividades físicas e programas de bem-estar
            para o seu estilo de vida.
          </p>

          {/* Botão de cadastrar nova categoria */}
          <div className="flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8">
            <button
              onClick={() => navigate("/cadastrarcategoria")}
              className="bg-gradient-to-r from-orange-700 to-green-600 text-white font-semibold 
              px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-xl 
              shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out text-sm sm:text-base"
            >
              + Nova Atividade
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 Conteúdo principal (lista de categorias) */}
      <div className="relative w-full max-w-8xl px-4 sm:px-8 md:px-12 lg:px-16 py-10 text-center">
        
        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <SyncLoader color="#79BE48" size={20} />
          </div>
        )}

        {/* Mensagem de vazio */}
        {!isLoading && categorias.length === 0 && (
          <p className="text-gray-400 text-base sm:text-lg mt-10">
            Nenhuma atividade encontrada!
          </p>
        )}

        {/* Cards de categorias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 
                max-w-7xl mx-auto px-6 sm:px-10 py-8 backdrop-blur-md">
          {categorias.map((categoria) => (
            <CardCategoria
              key={categoria.id}
              categoria={categoria}
              tipo={categoria.tipo}
              onEditar={() => handleEditar(categoria.id)}
              onDeletar={() => handleDeletar(categoria.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Listacategorias;
