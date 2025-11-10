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
    peso: "",
    altura: 0,
    servico: [],
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
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center">
    
      <div className="hidden lg:block bg-[url('https://i.postimg.cc/Xqx1D4Wy/4.png')] bg-cover bg-center w-full h-full" />

      
      <form onSubmit={cadastrar} className="flex flex-col gap-3 w-3/4 max-w-md">
        <h2 className="text-4xl font-bold text-slate-900 text-center">
          Criar Conta
        </h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          className="border rounded p-2"
          value={usuario.nome}
          onChange={atualizarEstado}
        />

        <input
          type="text"
          name="usuario"
          placeholder="Usuário (login)"
          className="border rounded p-2"
          value={usuario.usuario}
          onChange={atualizarEstado}
        />

        <input
          type="text"
          name="foto"
          placeholder="URL da foto"
          className="border rounded p-2"
          value={usuario.foto}
          onChange={atualizarEstado}
        />

        <input
          type="text"
          name="peso"
          placeholder="Peso em quilos (kg)"
          className="border rounded p-2"
          value={usuario.peso}
          onChange={atualizarEstado}
        />

        <input
          type="text"
          name="altura"
          placeholder="Altura em centímetros (cm)"
          className="border rounded p-2"
          value={usuario.altura}
          onChange={atualizarEstado}
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha (mín. 8 caracteres)"
          className="border rounded p-2"
          value={usuario.senha}
          onChange={atualizarEstado}
        />

        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirmar senha"
          className="border rounded p-2"
          value={confirmarSenha}
          onChange={handleConfirmarSenha}
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-purple-600 text-white font-semibold py-2 rounded flex justify-center"
        >
          {isLoading ? <ClipLoader size={24} color="#fff" /> : "Cadastrar"}
        </button>

        <button
          type="button"
          className="text-slate-600 underline text-center"
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
