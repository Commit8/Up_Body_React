/* eslint-disable react-hooks/exhaustive-deps */
import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";
import upbodylogo from '../../assets/upbodylogo.png';

function Login() {
    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    );

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#111] via-[#1a1a1a] to-black">
                {/* style={{ backgroundImage: "url('URL_DA_SUA_IMAGEM_AQUI')" }} */}
                <form
                    className="flex flex-col w-full max-w-md gap-4 bg-whit bg-opacity-50 p-8 rounded-lg shadow-lg"
                    onSubmit={login}
                >
                    {/* LOGO AQUI */}
                         <img src={upbodylogo} alt="Logo da UpBody" className="w-32 sm:w-40 md:w-48" style={{ width: '150px', height: 'auto', transform: 'translateX(110px)'}} /> 
                    <h2
                        className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r bg-linear-to-r from-red-500 via-yellow-500 to-green-500 text-center">
                        Login

                    </h2>
                
                    <div className="flex flex-col w-full">
    <label htmlFor="usuario" className="text-white">Usuário</label>
    <input
        type="text"
        id="usuario"
        name="usuario"
        placeholder="Usuário"
        className="border-2 border-white text-white placeholder:text-gray-400 rounded p-2"
        value={usuarioLogin.usuario}
        onChange={(e) => atualizarEstado(e)}
    />
</div>

<div className="flex flex-col w-full">
    <label htmlFor="senha" className="text-white">Senha</label>
    <input
        type="password"
        id="senha"
        name="senha"
        placeholder="Senha"
        className="border-2 border-white  text-white placeholder:text-gray-400 rounded p-2"
        value={usuarioLogin.senha}
        onChange={(e) => atualizarEstado(e)}
    />
</div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white font-semibold py-2 rounded flex justify-center items-center gap-2 transition-transform duration-300 hover:scale-125"
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={28} />
                        ) : (
                            <span>Entrar</span>
                        )}
                    </button>

                    <hr className="transition-transform duration-300 hover:scale-100  " />

                    <p className = "text-underline text-cen text-white">
                     Ainda não tem uma conta?{" "}
                            
                        <Link
                            to="/cadastro"
                            className="text-green-600 hover:underline "
                        >
                            Cadastre-se
                        </Link>

                
                    </p>
                </form>
            </div>
        </>
    );
}

export default Login;
