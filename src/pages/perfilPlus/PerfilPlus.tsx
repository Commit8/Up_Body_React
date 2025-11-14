import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { atualizar, buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function PerfilPlus() {
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);

  // Estado inicial padronizado (evita undefined)
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    peso: 0,
    altura: 0,
    servico: [],
    imc: undefined,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imc, setImc] = useState<number | null>(null);

  // Buscar usuário por ID
  async function getUserById(id: string) {
    try {
      await buscar(
        `/usuarios/${id}`,
        (dados: Usuario) => {
          setUsuarioLogado({
            ...dados,
            senha: "",
            peso: dados.peso ?? 0,
            altura: dados.altura ?? 0,
          });

          setImc(dados.imc ?? null);
        },
        { headers: { Authorization: usuario.token } }
      );
    } catch (error: any) {
      if (String(error).includes("401")) {
        ToastAlerta("Tem que estar logado", "info");
        handleLogout();
      }
    }
  }

  // IMC
  async function calcularImc(id: string) {
    setIsLoading(true);
    try {
      await buscar(
        `/usuarios/imc/${id}`,
        (valorImc: number) => {
          setImc(valorImc);
          setUsuarioLogado((prev) => ({ ...prev, imc: valorImc }));
        },
        { headers: { Authorization: usuario.token } }
      );
    } catch {
      handleLogout();
    }
    setIsLoading(false);
  }

  // Atualizar
  async function atualizarUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const body = {
        id: usuarioLogado.id,
        nome: usuarioLogado.nome,
        usuario: usuarioLogado.usuario,
        foto: usuarioLogado.foto,
        peso: Number(usuarioLogado.peso),
        altura: Number(usuarioLogado.altura),
        senha: usuarioLogado.senha, // obrigatório no model — NÃO altera no backend
      };

      await atualizar(`/usuarios/atualizar`, body, () => {}, {
        headers: { Authorization: usuario.token },
      });

      ToastAlerta("Usuário atualizado!", "sucesso");
    } catch {
      ToastAlerta("Erro ao atualizar", "erro");
    }

    setIsLoading(false);
  }

  // Atualiza inputs
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUsuarioLogado((prev) => ({
      ...prev,
      [name]: name === "peso" || name === "altura" ? parseFloat(value) : value,
    }));
  }

  // Classificação IMC
  function classificarIMC(valor: number | null) {
    if (valor === null)
      return {
        label: "Não calculado",
        color: "text-gray-700",
        bg: "bg-gray-100",
      };

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
    if (id) getUserById(id);
  }, [id]);

  const ConfirmarSenha = usuarioLogado.senha === ""

  return (
    
    <div className="relative min-h-screen flex items-center justify-center text-gray-100">
      <img
        src="https://i.imgur.com/2QBnQzu.jpeg"
        alt="Fundo"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto my-10 flex flex-col gap-6 bg-black/60 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-4xl">
        <div className="flex flex-col items-center">
          <h2 className="text-center font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-blue-400 mb-6">
            Perfil & Saúde
          </h2>

          <div className="flex gap-8 mt-4 items-center">
            <img
              src={
                usuarioLogado.foto ||
                "https://ik.imagekit.io/2zvbvzaqt/usuario.png"
              }
              alt="Perfil"
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
            const c = classificarIMC(imc);
            return (
              <div className="w-full md:w-1/2 my-4 p-4 border border-slate-700 rounded-xl bg-black/40">
                <p className="text-blue-400 font-semibold">
                  IMC atual:{" "}
                  <span className="font-bold text-white">
                    {imc?.toFixed(2) || "—"}
                  </span>
                </p>
                <div className={`mt-2 inline-block px-3 py-1 rounded ${c.bg}`}>
                  <span className={`${c.color} font-semibold`}>{c.label}</span>
                </div>
              </div>
            );
          })()}

          {/* Formulário */}
          <div className="w-full md:w-1/2 text-white">
            <form onSubmit={atualizarUsuario} className="flex flex-col gap-3">
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                disabled
                value={usuarioLogado.nome}
                onChange={atualizarEstado}
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
              />

              <label>Usuário</label>
              <input
                type="text"
                name="usuario"
                disabled
                value={usuarioLogado.usuario}
                className="border border-slate-700 rounded p-2 bg-black/40 text-gray-400"
              />

              <label>Foto</label>
              <input
                type="text"
                name="foto"
                disabled
                value={usuarioLogado.foto}
                onChange={atualizarEstado}
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
              />
              <label>Confirme sua senha</label>
              <input
                type="text"
                name="senha"
                value={usuarioLogado.senha}
                onChange={atualizarEstado}
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
              />

              <label>Peso (kg)</label>
              <input
                name="peso"
                type="number"
                step="0.01"
                value={usuarioLogado.peso}
                onChange={atualizarEstado}
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
              />

              <label>Altura (m)</label>
              <input
                name="altura"
                type="number"
                step="0.01"
                value={usuarioLogado.altura}
                onChange={atualizarEstado}
                className="border border-slate-700 rounded p-2 bg-black/40 text-white"
              />

              <button
                type="submit"
                disabled={ConfirmarSenha}
                className="bg-linear-to-r from-green-400 via-blue-900 to-green-400 mb-6 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 hover:scale-105 transition-transform duration-300"
              >
                {isLoading ? "Atualizando..." : "Atualizar"}
              </button>

              <button
                type="button"
                onClick={() => id && calcularImc(id)}
                disabled={isLoading}
                className="bg-linear-to-r from-green-400 via-blue-900 to-green-400 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 hover:scale-105 transition-transform duration-300"
              >
                {isLoading ? "Calculando..." : "Calcular IMC"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerfilPlus;
