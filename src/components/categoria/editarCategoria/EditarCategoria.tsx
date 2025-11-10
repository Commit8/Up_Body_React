import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Categoria from "../../../models/Categoria";
import { atualizar, buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function EditarCategoria() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function editarCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      await atualizar(`/categorias`, categoria, setCategoria, {
        headers: { Authorization: token },
      });

      ToastAlerta("Categoria atualizada com sucesso!", "sucesso");
      navigate("/categorias");
    } catch (error: any) {
      if (error.toString().includes("401")) handleLogout();
      ToastAlerta("Erro ao atualizar categoria.", "erro");
    }

    setIsLoading(false);
  }

  return (
    <div className="container w-1/2 mx-auto mt-10 p-6 border rounded-xl bg-white shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Editar Categoria</h1>

      <form onSubmit={editarCategoria} className="flex flex-col gap-4">

        <div>
          <label htmlFor="tipo" className="font-semibold">Tipo da Categoria</label>
          <input
            id="tipo"
            name="tipo"
            value={categoria.tipo || ""}
            onChange={atualizarEstado}
            className="border rounded p-2 w-full"
            placeholder="Ex.: Pilates, Massagem, Yoga..."
          />
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-purple-600 text-white font-semibold py-2 rounded flex justify-center"
        >
          {isLoading ? <ClipLoader size={20} color="#fff" /> : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}

export default EditarCategoria;
