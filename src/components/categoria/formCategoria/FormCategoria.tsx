/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import type Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
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
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categoria`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("A categoria foi atualizada com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a categoria.", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/categoria`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("A categoria foi cadastrada com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a categoria.", "erro");
        }
      }
    }
    setIsLoading(false);
    retornar();
  }
  return (
    <div className="w-full h-screen flex items-center justify-center mx-auto pb-20 bg-[url('https://ik.imagekit.io/Disturbedmoss/SenhoresPraticandoExercicio.png?updatedAt=1762871096155')] bg-cover bg-center bg-no-repeat">
      <div className="w-[4/5] flex flex-col justify-center items-center px-5 pb-10 bg-[#222]/80 border border-[#FF7F50]/40 rounded-2xl">
        <h1 className="text-4xl text-center my-8 w-full font-semibold text-[#FAF9F6]">
        {id === undefined ? "Cadastrar categoria" : "Editar categoria"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4 w-full" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">

          <label htmlFor="tipo" className="font-semibold text-xl text-[#FAF9F6]">Tipo de Exercício</label>
          <input
            type="text"
            placeholder="Descreva aqui o tipo de exercício"
            name="tipo"
            className="border-2 border-slate-800 rounded p-2 text-[#FAF9F6]"
            value={categoria.tipo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="
            relative 
            w-1/2 
            py-2 
            mx-auto 
            flex 
            justify-center 
            rounded-md 
          text-slate-100 
            bg-linear-to-r 
          from-blue-500 
          to-purple-500 
            transition-all 
            duration-500 
            ease-out
            before:absolute 
            before:inset-0 
            before:rounded-md 
            before:border-2 
            before:border-transparent 
            before:transition-all 
            before:duration-500 
          hover:before:border-[rgb(246,171,59)]
            hover:shadow-[0_0_20px_rgba(246,171,59,0.6),0_0_40px_rgba(168,10,10,0.4)]
          "
          type="submit"
        >
          {isLoading ? (
            <ClipLoader color="#fff" size={24} />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
      </div>
    </div>
  );
}

export default FormCategoria;