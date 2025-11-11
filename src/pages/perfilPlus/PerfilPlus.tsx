import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

// Funções utilitárias para IMC (retorna classificação e classe de cor Tailwind)
function classificarIMC(valor: number): { classificacao: string; cor: string } {
  const imc = Math.floor(valor);

  switch (true) {
    case imc < 18:
      return { classificacao: "Abaixo do peso", cor: "bg-blue-500" };
    case imc < 25:
      return { classificacao: "Peso normal", cor: "bg-green-500" };
    case imc < 30:
      return { classificacao: "Sobrepeso", cor: "bg-yellow-500" };
    case imc < 35:
      return { classificacao: "Obesidade grau I", cor: "bg-orange-500" };
    case imc < 40:
      return { classificacao: "Obesidade grau II", cor: "bg-red-500" };
    default:
      return { classificacao: "Obesidade grau III", cor: "bg-red-700" };
  }
}

function PerfilPlus() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({} as Usuario);
  const [imc, setImc] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Busca dados básicos do usuário (sem IMC)
  async function getUserById(userId: string) {
    try {
      await buscar(
        `/usuarios/${userId}`,
        (dados: Usuario) => {
          dados.senha = "";
          setUsuarioLogado(dados);
        },
        { headers: { Authorization: token } }
      );
    } catch (error) {
      const err = error as Error;
      if (err.toString().includes("401")) {
        ToastAlerta("Sem logar não rola", "info");
        navigate("/");
      }
    }
  }

  // Chama o endpoint que retorna IMC calculado pelo backend
  async function fetchImc(userId: string) {
    if (!userId) return;
    setIsLoading(true);
    try {
      await buscar(
        `/usuarios/imc/${userId}`,
        (dados: Usuario) => {
          // endpoint pode retornar o usuário com campo imc
          setUsuarioLogado((prev) => ({ ...prev, ...dados }));
          setImc(dados.imc ?? null);
        },
        { headers: { Authorization: token } }
      );
    } catch (error) {
      const err = error as Error;
      if (err.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao obter IMC.", "erro");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogado({ ...usuarioLogado, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
      return;
    }

    if (id !== undefined) {
      getUserById(id);
      // também tentamos obter o IMC (se o backend disponibilizar)
      fetchImc(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  const imcToShow = imc ?? usuarioLogado.imc ?? null;

  return (
    <div className="container mx-auto my-10 flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-sky-900 font-bold text-4xl">Dados de perfil</h2>
        <div className="flex gap-8 mt-4 items-center">
          <img
            src={usuarioLogado.foto || "https://ik.imagekit.io/2zvbvzaqt/usuario.png"}
            alt=""
            className="border-4 border-sky-800 rounded-2xl w-56"
          />
          <div>
            <p className="font-semibold text-sky-900 text-3xl">{usuarioLogado.nome ?? ""}</p>
            <p className="font-semibold text-sky-900 text-lg">{usuarioLogado.usuario ?? ""}</p>
          </div>
        </div>

        <hr className="border-sky-900 border w-full my-4" />

        <div className="flex gap-4 justify-center w-full mb-4">
          <div className="flex flex-col items-center bg-stone-100 rounded-lg p-4">
            <span className="text-slate-600 text-sm">Peso</span>
            <span className="font-bold text-lg">{usuarioLogado.peso ?? "---"} kg</span>
          </div>
          <div className="flex flex-col items-center bg-stone-100 rounded-lg p-4">
            <span className="text-slate-600 text-sm">Altura</span>
            <span className="font-bold text-lg">{usuarioLogado.altura ?? "---"} cm</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => id && fetchImc(id)}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Buscando..." : "Obter IMC"}
            </button>
          </div>
        </div>

        {imcToShow !== null && (
          <div className="flex justify-center my-4">
            <div className={`${classificarIMC(imcToShow).cor} rounded-lg p-6 w-full max-w-sm text-center text-white shadow-lg`}>
              <p className="text-sm opacity-90">IMC</p>
              <p className="text-4xl font-bold">{Number(imcToShow).toFixed(2)}</p>
              <p className="text-lg mt-2">{classificarIMC(imcToShow).classificacao}</p>
            </div>
          </div>
        )}

        <div className="w-1/2">
          <h2>Atualizar dados</h2>
          <form>
            <div className="flex flex-col w-full">
              <label htmlFor="nome">Nome</label>
              <input
                disabled
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome completo"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.nome ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-full mt-2">
              <label htmlFor="usuario">Usuário</label>
              <input
                disabled
                type="text"
                name="usuario"
                id="usuario"
                placeholder="Seu melhor e-mail"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.usuario ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-full mt-2">
              <label htmlFor="foto">Foto</label>
              <input
                disabled
                type="text"
                name="foto"
                id="foto"
                placeholder="URL da foto"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.foto ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PerfilPlus;
