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
import type Servico from "../../../models/Servico";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormServico() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(false);

  const [servico, setServico] = useState<Servico>({
    id: 0,
    plano: "",
    inicio: "",
    termino: "",
    valor: 0,
    usuario: {} as any,
    categoria: {} as any,
  });

  async function buscarPorId(id: string) {
    try {
      await buscar(`/servico/${id}`, setServico, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) buscarPorId(id);
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setServico({
      ...servico,
      [e.target.name]:
        e.target.name === "valor" ? Number(e.target.value) : e.target.value,
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
        ToastAlerta("Serviço atualizado com sucesso!", "sucesso");
      } else {
        await cadastrar(`/servico`, servico, setServico, {
          headers: { Authorization: token },
        });
        ToastAlerta("Serviço criado com sucesso!", "sucesso");
      }

      navigate("/servicos");
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else ToastAlerta("Erro ao salvar serviço.", "erro");
    }

    setIsLoading(false);
  }

  async function finalizarServico() {
    const terminoAtual = new Date().toISOString();
    const servicoAtualizado = { ...servico, termino: terminoAtual };

    setIsLoading(true);

    try {
      await atualizar(`/servico`, servicoAtualizado, setServico, {
        headers: { Authorization: token },
      });
      ToastAlerta("Horário de término registrado!", "sucesso");
      navigate("/servicos");
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      else ToastAlerta("Erro ao finalizar serviço.", "erro");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white p-6">
      <form
        onSubmit={enviar}
        className="bg-[#1c1c1c] p-6 rounded-2xl w-full max-w-lg shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {id !== undefined ? "Editar Serviço" : "Cadastrar Serviço"}
        </h2>

        <div className="flex flex-col">
          <label>Plano</label>
          <input
            type="text"
            name="plano"
            value={servico.plano}
            onChange={atualizarEstado}
            className="p-2 rounded bg-[#2b2b2b] border border-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label>Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            name="valor"
            value={servico.valor}
            onChange={atualizarEstado}
            className="p-2 rounded bg-[#2b2b2b] border border-gray-600"
          />
        </div>

        {id !== undefined && (
          <button
            type="button"
            onClick={finalizarServico}
            className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded flex justify-center items-center"
          >
            Registrar Término
          </button>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded flex justify-center items-center"
        >
          {isLoading ? (
            <ClipLoader color="#fff" size={24} />
          ) : id !== undefined ? (
            "Atualizar"
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </div>
  );
}

export default FormServico;
