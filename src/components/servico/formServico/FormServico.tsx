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

function FormServico() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    tipo: "",
    servico: [],
  });

  const [servico, setServico] = useState<Servico>({
    id: 0,
    plano: "",
    valor: 0,
    inicio: "",
    termino: "",
    categoria: categoria,
    usuario: { id: usuario.id } as any,
  });

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
       await buscar(`/servico/${id}`, setServico, {
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
  }, [token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) buscarPorId(id);
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
        await atualizar(`/servico`, servico, setServico, {
          headers: { Authorization: token },
        });
        ToastAlerta("Serviço atualizado!", "sucesso");
      } else {
        await cadastrar(`/servico`, servico, setServico, {
          headers: { Authorization: token },
        });
        ToastAlerta("Serviço cadastrado!", "sucesso");
      }

      navigate("/servicos");
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
      await atualizar(`/servico`, servicoAtualizado, setServico, {
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
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Serviço" : "Cadastrar Serviço"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={enviar}>
        <div className="flex flex-col gap-2">
          <label>Plano</label>
          <input
            type="text"
            name="plano"
            value={servico.plano}
            onChange={atualizarEstado}
            required
            className="border-2 border-slate-700 rounded p-2"
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
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p>Categoria</p>
          <select
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" disabled selected>
              Selecione uma categoria
            </option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </select>
        </div>

        {id !== undefined && (
          <button
            type="button"
            onClick={finalizarServico}
            className="rounded bg-emerald-600 hover:bg-emerald-800 
                    text-white font-bold w-full py-2 flex justify-center"
          >
            Registrar Término
          </button>
        )}

        <button
          type="submit"
          className="rounded bg-indigo-600 hover:bg-indigo-800 text-white font-bold w-full py-2 flex justify-center"
        >
          {isLoading ? <ClipLoader color="#ffffff" size={24} /> : id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default FormServico;
