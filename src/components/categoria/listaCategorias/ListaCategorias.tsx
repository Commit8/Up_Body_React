/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import DeletarCategoria from "../deletarCategoria/DeletarCategoria";
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
      await DeletarCategoria(`/categoria/${id}`);
      buscarCategorias(); 
    }
  }

  return(
    <div className="min-h-screen flex justify-center items-center bg-linear-to-b from-gray-900 p-8">
    <div className="max-w-6xl w-full bg-[#1A1A1A]/90 rounded-3xl shadow-2xl p-10 text-center">
      
      {/* Título principal */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-wide mb-2">
          EXPLORE NOSSOS SERVIÇOS
        </h2>
        <p className="text-gray-400">
          Atividades Físicas e Programas de Bem-Estar
        </p>
      </div>

      {/* Botão de cadastrar nova categoria */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => navigate("/cadastrarcategoria")}
          className="bg-linear-to-r from-orange-500 to-pink-500 text-white font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition"
        >
          + Nova Atividade
        </button>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <SyncLoader color="#FF7F50" size={20} />
        </div>
      )}

      {/* Mensagem de vazio */}
      {!isLoading && categorias.length === 0 && (
        <p className="text-gray-300 text-lg mt-10">Nenhuma atividade encontrada!</p>
      )}

      {/* Cards de categorias */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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