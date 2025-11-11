import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import CardServico from "../cardServico/CardServico";
import type Servico from "../../../models/Servico";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ModalServico from "../modalServico/ModalServico";

function ListaServico() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [servicos, setServicos] = useState<Servico[]>([]);
  const reloadTrigger = useRef<() => void>(() => {});

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    buscarServicos();
  }, [servicos.length]);

  async function buscarServicos() {
    try {
      setIsLoading(true);

      await buscar("/servicos", setServicos, {
        headers: { Authorization: token },
      });
    } catch (error) {
      if ((error as Error).toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    reloadTrigger.current = buscarServicos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center bg-linear-to-b from-[#111] via-[#1a1a1a] to-black min-h-screen">
      <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden flex items-center justify-center">
        {/* Imagem de fundo */}
        <img
          src="https://i.imgur.com/QX46BaC.png"
          alt="Atividades físicas e bem-estar"
          className="absolute inset-0 w-full h-109 object-cover opacity-70"
        />

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/80"></div>

        {/* Texto do topo */}
        <div className="relative z-10 text-center px-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-pink-600 drop-shadow-lg">
            TRANSFORME SEU CORPO E MENTE
          </h2>
          <p className="mt-4 text-gray-200 text-lg max-w-2x0 mx-auto">
            Encontre as melhores atividades físicas e programas de bem-estar
            para o seu estilo de vida.
          </p>
          {/* Botão de cadastrar nova categoria */}
          <div className="flex justify-center mt-10 mb-8 ">
            <ModalServico onServicoCadastrado={() => reloadTrigger.current()} />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-7xl rounded- bg-[#1A1A1A]/90 p-15 text-center">
        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <SyncLoader color="#FF7F50" size={20} />
          </div>
        )}

        {/* Mensagem de vazio */}
        {!isLoading && servicos.length === 0 && (
          <p className="text-gray-400 text-lg mt-10">
            Nenhuma atividade encontrada!
          </p>
        )}

        {/* Cards de servico */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicos.map((servico) => (
            <CardServico key={servico.id} servico={servico} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListaServico;
