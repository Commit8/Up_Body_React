import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function PerfilPlus() {
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);

  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({} as Usuario);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imc, setImc] = useState<number | null>(null);

  // Busca dados do usuário pelo ID
  async function getUserById(id: string) {
    try {
      await buscar(
        `/usuarios/${id}`,
        (dados: Usuario) => {
          dados.senha = "";
          setUsuarioLogado(dados);
          setImc(dados.imc ?? null);
        },
        {
          headers: { Authorization: usuario.token },
        }
      );
    } catch (error: any) {
      if (String(error).includes("401")) {
        ToastAlerta("Tem que estar logado", "info");
        handleLogout();
      }
    }
  }

  // Chama backend para calcular IMC
  async function calcularImc(id: string) {
    setIsLoading(true);
    try {
      await buscar(
        `/usuarios/imc/${id}`,
        (valorImc: number) => {
          setImc(valorImc);

          // Atualiza IMC no estado do usuário
          setUsuarioLogado((prev) => ({
            ...prev,
            imc: valorImc,
          }));
        },
        {
          headers: { Authorization: usuario.token },
        }
      );
    } catch (error: unknown) {
      if (String(error).includes("401")) {
        handleLogout();
      }
    }
    setIsLoading(false);
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogado({
      ...usuarioLogado,
      [e.target.name]: e.target.value,
    });
  }

  function classificarIMC(valor: number | null) {
    if (valor === null) {
      return {
        label: "Não calculado",
        color: "text-gray-700",
        bg: "bg-gray-100",
      };
    }
    switch (true) {
      case valor < 18.5:
        return {
          label: "Abaixo do peso",
          color: "text-blue-800",
          bg: "bg-blue-100",
        };
      case valor < 25:
        return {
          label: "Peso normal",
          color: "text-green-800",
          bg: "bg-green-100",
        };
      case valor < 30:
        return {
          label: "Sobrepeso",
          color: "text-yellow-800",
          bg: "bg-yellow-100",
        };
      case valor < 35:
        return {
          label: "Obesidade (Grau I)",
          color: "text-orange-800",
          bg: "bg-orange-100",
        };
      case valor < 40:
        return {
          label: "Obesidade (Grau II)",
          color: "text-red-800",
          bg: "bg-red-100",
        };
      default:
        return {
          label: "Obesidade (Grau III)",
          color: "text-red-900",
          bg: "bg-red-200",
        };
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      getUserById(id);
    }
  }, [id]);

  return (
    <div className="relative min-h-screen flex items-center justify-center text-gray-100">

      {/* Imagem de fundo */}
      <img
        src="https://i.imgur.com/2QBnQzu.jpeg"
        alt="Fundo de atividades"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Overlay para escurecer */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      {/* Container principal */}
      <div className="relative z-10 container mx-auto my-10 flex flex-col gap-6 bg-black/60 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-4xl">

        <div className="flex flex-col items-center">
          <h2 className="text-center font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-blue-400 mb-6">
            Perfil & Saúde
          </h2>

          <div className="flex gap-8 mt-4 items-center">
            <img
              src={usuarioLogado.foto || "https://ik.imagekit.io/2zvbvzaqt/usuario.png"}
              alt="Foto de perfil"
              className="border-4 border-slate-700 rounded-full w-41 h-40 object-cover"
            />

            <div>
              <p className="font-semibold text-white text-3xl">
                {usuarioLogado.nome}
              </p>
              <p className="font-semibold text-blue-400 text-lg">
                {usuarioLogado.usuario}
              </p>
            </div>
          </div>

          <hr className="border-slate-700 border w-full my-6" />

          {/* IMC */}
          {(() => {
            const classificacao = classificarIMC(imc);
            return (
              <div className="w-full md:w-1/2 my-4 p-4 border border-slate-700 rounded-xl bg-black/40">
                <p className="text-blue-400 font-semibold">
                  IMC atual:{" "}
                  <span className="font-bold text-white">
                    {imc !== null ? imc.toFixed(2) : "—"}
                  </span>
                </p>

                <div className={`mt-2 inline-block px-3 py-1 rounded ${classificacao.bg}`}>
                  <span className={`${classificacao.color} font-semibold`}>
                    {classificacao.label}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Formulário */}
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-xl font-semibold mb-2">Atualizar dados</h2>
            <form className="flex flex-col gap-3">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
                value={usuarioLogado.nome}
                onChange={atualizarEstado}
              />

              <label>Usuário</label>
              <input
                type="text"
                name="usuario"
                disabled
                className="border border-slate-700 rounded p-2 bg-gray-800 text-gray-400"
                value={usuarioLogado.usuario}
              />

              <label>Foto</label>
              <input
                type="text"
                name="foto"
                placeholder="URL da foto"
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
                value={usuarioLogado.foto}
                onChange={atualizarEstado}
              />

              <label>Peso (kg)</label>
              <input
                name="peso"
                type="number"
                step="0.01"
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
                value={usuarioLogado.peso}
                onChange={atualizarEstado}
              />

              <label>Altura (m)</label>
              <input
                name="altura"
                type="number"
                step="0.01"
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
                value={usuarioLogado.altura}
                onChange={atualizarEstado}
              />

              <button
                type="button"
                onClick={() => id && calcularImc(id)}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-400 via-blue-900 to-green-400 mb-6 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 hover:scale-105 transition-transform duration-300"
              >
                {isLoading ? "Buscando..." : "Calcular IMC"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilPlus;