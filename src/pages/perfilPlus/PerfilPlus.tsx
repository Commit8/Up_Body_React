import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type Usuario from "../../models/Usuario";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

// Funções utilitárias para IMC
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
  // para essa tela de perfil, iremos trabalhar pegando o ID do usuario da URL do navegador, para conseguir fazer um get do usuario
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // trazendo a context, pra poder pegar o token, sem ele, não rola de fazer o GET
  const { usuario } = useContext(AuthContext);
  // estado onde iremos guardar o usuário que está vindo do backend
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario>({} as Usuario);
  const [imc, setImc] = useState<number | null>(null);

  function calcularIMC() {
    if (!usuarioLogado || !usuarioLogado.peso || !usuarioLogado.altura) {
      ToastAlerta("Peso ou altura não disponíveis para cálculo.", "info");
      return;
    }

    const alturaEmMetros = usuarioLogado.altura / 100;
    if (alturaEmMetros <= 0) {
      ToastAlerta("Altura inválida.", "erro");
      return;
    }

    const valor = usuarioLogado.peso / (alturaEmMetros * alturaEmMetros);
    setImc(Number(valor.toFixed(2)));
  }

  async function getUserById(id: string) {
    try {
      await buscar(
        `/usuarios/${id}`,
        (dados: Usuario) => {
          // Zera o campo da senha, para não ficar visivel no front
          dados.senha = "";
          // joga o restante dos dados dentro do estado criado acima
          setUsuarioLogado(dados);
        },
        {
          headers: { Authorization: usuario.token },
        }
      );
    } catch (error) {
      const err = error as Error;
      if (err.toString().includes("401")) {
        ToastAlerta("Sem logar não rola", "info");
        navigate("/");
      }
    }
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogado({
      // ...usuarioLogado => mantem o que já tinha no estado
      ...usuarioLogado,
      // pega o campo que está sendo usado, e preenche com o valor digitado na tela
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    // O ID pode ser nulo, então precisamos tratar isso
    if (id !== undefined) {
      getUserById(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="">
            <p className="font-semibold text-sky-900 text-3xl">
              {usuarioLogado.nome}
            </p>
            <p className="font-semibold text-sky-900 text-lg">
              {usuarioLogado.usuario}
            </p>
          </div>
        </div>
        <hr className="border-sky-900 border w-full my-4" />
        <div className="flex gap-4 justify-center w-full mb-4">
          <div className="flex flex-col items-center bg-stone-100 rounded-lg p-4">
            <span className="text-slate-600 text-sm">Peso</span>
            <span className="font-bold text-lg">
              {usuarioLogado.peso ?? "---"} kg
            </span>
          </div>
          <div className="flex flex-col items-center bg-stone-100 rounded-lg p-4">
            <span className="text-slate-600 text-sm">Altura</span>
            <span className="font-bold text-lg">
              {usuarioLogado.altura ?? "---"} cm
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={calcularIMC}
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg"
            >
              Calcular IMC
            </button>
          </div>
        </div>
        {imc !== null && (
          <div className={`flex justify-center my-4`}>
            <div
              className={`${
                classificarIMC(imc).cor
              } rounded-lg p-6 w-full max-w-sm text-center text-white shadow-lg`}
            >
              <p className="text-sm opacity-90">IMC</p>
              <p className="text-4xl font-bold">{imc}</p>
              <p className="text-lg mt-2">
                {classificarIMC(imc).classificacao}
              </p>
            </div>
          </div>
        )}
        <div className="w-1/2">
          <h2>Atualizar dados</h2>
          <form className="">
            <div className="flex flex-col w-full">
              <label htmlFor="nome">Nome</label>
              <input
                disabled={true}
                type="text"
                name="nome"
                id="nome"
                placeholder="Nome completo"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="usuario">Usuário</label>
              <input
                disabled={true}
                type="text"
                name="usuario"
                id="usuario"
                placeholder="Seu melhor e-mail"
                className="border-2 border-slate-700 rounded p-2"
                disabled
                value={usuarioLogado.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="foto">Foto</label>
              <input
                disabled={true}
                type="text"
                name="foto"
                id="foto"
                placeholder="URL da foto"
                className="border-2 border-slate-700 rounded p-2"
                value={usuarioLogado.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PerfilPlus;
