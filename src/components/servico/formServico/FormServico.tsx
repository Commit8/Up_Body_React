/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import type Servico from "../../../models/Servico";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface FormServicoprops {
  onServicoCadastrado?: () => void;
}

function FormServico({ onServicoCadastrado }: FormServicoprops) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const [servico, setServico] = useState<Servico>({} as Servico);

  async function buscarCategorias() {
    try {
      await buscar("/categoria", setCategorias, {
        headers: { Authorization: token },
      });
    } catch {
      ToastAlerta("Erro ao carregar categorias.", "erro");
    }
  }

  async function buscarPorId(id: string) {
    try {
      await buscar(`/servicos/${id}`, setServico, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      ToastAlerta("Erro ao buscar serviço.", "erro");
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch {
      ToastAlerta("Erro ao carregar categoria.", "erro");
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) buscarPorId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setServico((prev) => ({
      ...prev,
      categoria,
      usuario: { id: usuario.id } as any,
    }));
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setServico({
      ...servico,
      [e.target.name]:
        e.target.name === "valor" ? Number(e.target.value) : e.target.value,
      categoria,
      usuario: { id: usuario.id } as any,
    });
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar(`/servicos`, servico, setServico, {
          headers: { Authorization: token },
        });
        ToastAlerta("Serviço atualizado!", "sucesso");
        navigate("/servicos");
      } else {
        await cadastrar(`/servicos`, servico, setServico, {
          headers: { Authorization: token },
        });
        ToastAlerta("Serviço cadastrado!", "sucesso");
        onServicoCadastrado?.();
      }
    } catch {
      ToastAlerta("Erro ao salvar serviço.", "erro");
    }

    setIsLoading(false);
  }

  async function finalizarServico() {
    const terminoAtual = new Date().toISOString();

    const servicoAtualizado = {
      ...servico,
      termino: terminoAtual,
      usuario: { id: usuario.id } as any,
    };

    setIsLoading(true);

    try {
      await atualizar(`/servicos`, servicoAtualizado, setServico, {
        headers: { Authorization: token },
      });
      ToastAlerta("Término registrado!", "sucesso");
      navigate("/servicos");
    } catch {
      ToastAlerta("Erro ao finalizar serviço.", "erro");
    }

    setIsLoading(false);
  }

  return (
    <div
      className="flex items-center justify-center w-full min-h-screen p-6"
      style={
        id !== undefined
          ? {
              backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://i.postimg.cc/KjzFZvyX/personal-training-amberg-gross.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <div className="opacity-95 bg-linear-to-b from-[#111] via-[#1a1a1a] to-black shadow-lg rounded-xl p-10 w-[90%] max-w-[600px]">
        <h1 className="text-4xl text-center my-8 text-white">
          {id !== undefined ? "Editar Serviço" : "Cadastrar Serviço"}
        </h1>

        <form
          className="flex flex-col gap-4 w-full text-white"
          onSubmit={enviar}
        >
          <div className="flex flex-col gap-2">
            <label>Plano</label>
            <input
              type="text"
              name="plano"
              value={servico.plano}
              onChange={atualizarEstado}
              required
              className="border-2 border-slate-700 rounded p-2 text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              name="valor"
              value={servico.valor}
              onChange={atualizarEstado}
              required
              className="border-2 border-slate-700 rounded p-2 text-white"
            />
          </div>

          <div className="flex flex-col gap-2 text-white">
            <p>Categoria</p>
            <select
              className="border p-2 border-slate-800 rounded text-white"
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            >
              <option className="text-black" value="" disabled selected>
                Selecione uma categoria
              </option>

              {categorias.map((categoria) => (
                <option
                  className="text-black"
                  key={categoria.id}
                  value={categoria.id}
                >
                  {categoria.tipo}
                </option>
              ))}
            </select>
          </div>

          {id !== undefined && (
            <button
              type="button"
              onClick={finalizarServico}
              className="w-full py-2 rounded-lg text-white font-semibold
             bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400  
             hover:opacity-90 transition-all"
            >
              Registrar Término
            </button>
          )}

          <button
            type="submit"
            className="rounded bg-gradient-to-r from-emerald-600 to-cyan-600 hover:bg-indigo-800 text-white font-bold w-full py-2 flex justify-center"
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" size={24} />
            ) : id ? (
              "Atualizar"
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormServico;
