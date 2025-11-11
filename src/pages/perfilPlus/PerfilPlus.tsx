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
    <div className="container mx-auto my-10 flex flex-col gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-sky-900 font-bold text-4xl">
          Dados de perfil
        </h2>

        <div className="flex gap-8 mt-4 items-center">
          <img
            src={
              usuarioLogado.foto ||
              "https://ik.imagekit.io/2zvbvzaqt/usuario.png"
            }
            alt=""
            className="border-4 border-sky-800 rounded-2xl w-56"
          />

          <div>
            <p className="font-semibold text-sky-900 text-3xl">
              {usuarioLogado.nome}
            </p>
            <p className="font-semibold text-sky-900 text-lg">
              {usuarioLogado.usuario}
            </p>
          </div>
        </div>

        <hr className="border-sky-900 border w-full my-4" />

        {/* Bloco de IMC */}
        {(() => {
          const classificacao = classificarIMC(imc);

          return (
            <div className="w-1/2 my-4 p-4 border rounded">
              <p className="text-sky-900 font-semibold">
                IMC atual:{" "}
                <span className="font-bold">
                  {imc !== null ? imc.toFixed(2) : "—"}
                </span>
              </p>

              <div
                className={`mt-2 inline-block px-3 py-1 rounded ${classificacao.bg}`}
              >
                <span className={`${classificacao.color} font-semibold`}>
                  {classificacao.label}
                </span>
              </div>
            </div>
          );
        })()}

        <div className="w-1/2">
          <h2>Atualizar dados</h2>

          <form>
            <div className="flex flex-col w-full">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome completo"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.nome}
                onChange={atualizarEstado}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="usuario">Usuário</label>
              <input
                type="text"
                name="usuario"
                id="usuario"
                disabled
                placeholder="Seu melhor e-mail"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.usuario}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="foto">Foto</label>
              <input
                type="text"
                name="foto"
                id="foto"
                placeholder="URL da foto"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.foto}
                onChange={atualizarEstado}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="peso">Peso (kg)</label>
              <input
                name="peso"
                type="number"
                step="0.01"
                inputMode="decimal"
                placeholder="Peso em kg"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.peso}
                onChange={atualizarEstado}
              />
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="altura">Altura (m)</label>
              <input
                name="altura"
                type="number"
                step="0.01"
                inputMode="decimal"
                placeholder="Altura em metros"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.altura}
                onChange={atualizarEstado}
              />
            </div>

            <div className="flex items-center mt-4">
              <button
                type="button"
                onClick={() => id && calcularImc(id)}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Buscando..." : "Calcular IMC (Backend)"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PerfilPlus;
