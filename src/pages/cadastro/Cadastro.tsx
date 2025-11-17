/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import  { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";

function Cadastro() {
  const navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      navigate("/login");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
        ToastAlerta("Cadastro realizado com sucesso!", "sucesso");
      } catch (error) {
        ToastAlerta("Erro ao cadastrar. Verifique os dados!", "erro");
      }

      setIsLoading(false);
    } else {
      ToastAlerta("As senhas não conferem ou são muito curtas!", "erro");
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  return (
    <>
      
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Imagem de fundo */}
      <img
        src="https://i.imgur.com/lrAjsG5.jpg"
        alt="Fundo de atividades"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay para escurecer */}
      <div className="absolute inset-0 bg-black/30" />
      
      <form onSubmit={cadastrar} className="relative z-10 flex flex-col gap-3 w-3/4 max-w-md bg-black/50 backdrop-blur-md p-6 rounded-xl shadow-lg items-center">
        <h2 className="text-4xl font-bold text-slate-100 text-center">
          Criar Conta
        </h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          className=" border-2 border-white text-white placeholder:text-gray-400 rounded p-2 w-full"
          value={usuario.nome}
          onChange={atualizarEstado}
        />

        <input
          type="text"
          name="usuario"
          placeholder="Usuário (login)"
          className="border-2 border-white text-white placeholder:text-gray-400 rounded p-2 w-full"
          value={usuario.usuario}
          onChange={atualizarEstado}
        />

        <input
          type="text"
          name="foto"
          placeholder="URL da foto"
          className="border-2 border-white text-white placeholder:text-gray-400 rounded p-2 w-full"
          value={usuario.foto}
          onChange={atualizarEstado}
        />

        <input
          name="peso"
          placeholder="Peso (kg)"
          step="0.01" 
          type="number"
          min="0"
          inputMode="decimal"
          className="border-2 border-white text-white placeholder:text-gray-400 rounded p-2 w-full"
          value={usuario.peso}
          onChange={atualizarEstado}
        />

        <input
          name="altura"
          placeholder="Altura (m)"
          step="0.01" 
          type="number"
          min="0"
          inputMode="decimal"
          className="border-2 border-white text-white placeholder:text-gray-400 rounded p-2 w-full"
          value={usuario.altura}
          onChange={atualizarEstado}
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha (mín. 8 caracteres)"
          className="border-2 border-white text-white placeholder:text-gray-400 rounded p-2 w-full"
          value={usuario.senha}
          onChange={atualizarEstado}
        />

        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar senha"
          className="border-2 border-white text-white placeholder:text-gray-400 rounded p-2 w-full"
          value={confirmarSenha}
          onChange={handleConfirmarSenha}
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white font-semibold py-2 rounded flex justify-center hover:scale-105 w-full cursor-pointer"
        >
          {isLoading ? <ClipLoader size={24} color="#fff" /> : "Cadastrar"}
        </button>

        <button
          type="button"
          className="text-slate-400 underline text-center cursor-pointer w-1/3"
          onClick={() => navigate("/login")}
        >
          Já tenho conta
        </button>
      </form>
    </div>
    </>
  );
}

export default Cadastro;
