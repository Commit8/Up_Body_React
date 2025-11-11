/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardCategoria from "../cardCategoria/CardCategoria";        
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";

function Listacategorias(){

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Verifica se o usuário está logado ao carregar o componente
    useEffect(() => {
      if (token === '') {
        ToastAlerta("É necessário estar logado", 'info')
        navigate('/');
      }
    }, [token]);

   
    useEffect(() => {
      buscarCategorias();
    }, [categorias.length]);

   
    async function buscarCategorias() {
      try {
        setIsLoading(true);

        await buscar('/categoria', setCategorias, {
          headers: { Authorization: token },
        });
      } catch (error: any) { 
        if (error.toString().includes('401')) {
          handleLogout();
        }
      } finally { // Garantir que o carregamento seja desativado após a conclusão da requisição
        setIsLoading(false);
      }
    }

    //  Quando clicar em editar:  redireciona para o formulário com o ID na URL
  function handleEditar(id: number) {
    navigate(`/editarCategoria/${id}`);
  }

  //  Quando clicar em deletar: exclui e recarrega lista
  async function handleDeletar(id: number) {
    if (confirm("Tem certeza que deseja deletar esta categoria?")) {
      navigate(`/deletarCategoria/${id}`);
      buscarCategorias(); 
    }
  }

  return(

     <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#111] via-[#1a1a1a] to-black min-h-screen">
      <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden flex items-center justify-center">
        {/* Imagem de fundo */}
        <img
          src="https://i.imgur.com/3idZJL5.png"
          alt="Atividades físicas e bem-estar"
          className="absolute inset-0 w-full h-108 object-cover opacity-70"
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/44 to-black/75">
        </div>

        {/* Texto do topo */}
        <div className="relative z-10 text-center px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-lg">
            TRANSFORME SEU CORPO E MENTE
          </h2>
          <p className="mt-4 text-gray-200 text-2xl mx-auto">
            Encontre as melhores atividades físicas e programas de bem-estar
           para o seu estilo de vida.
          </p>
                  {/* Botão de cadastrar nova categoria */}
          <div className="flex justify-center mt-7 mb-7">
            <button
              onClick={() => navigate("/cadastrarcategoria")}
              className="bg-gradient-to-r from-orange-700 to-green-600 text-white font-semibold px-8 py-2 rounded-xl 
              shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-out"
            >
              + Nova Atividade
            </button>
          </div>
        </div>
        
      </div>
      

    <div className="relative w-full max-w-9xl p-15 text-center">

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <SyncLoader color="#79BE48" size={20} />
        </div>
      )}

      {/* Mensagem de vazio */}
      {!isLoading && categorias.length === 0 && (
        <p className="text-gray-400 text-lg mt-10">Nenhuma atividade encontrada!</p>
      )}

      {/* Cards de categorias */}
      <div className="grid sm:grid-cols- lg:grid-cols-4 gap-8">
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
  )

}

export default Listacategorias;