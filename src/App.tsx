import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login"
import { AuthProvider } from "./contexts/AuthContext";
import ListaCategorias from "./components/categoria/listaCategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formCategoria/FormCategoria";
import DeletarCategoria from "./components/deletarCategoria/DeletarCategoria";
import ListaServicos from "./components/servico/listaServico/ListaServico";
import DeletarServico from "./components/servico/deletarServico/DeletarServico";
import Perfil from "./pages/perfil/Perfil";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path='/' element ={<Login />} />       
              <Route path='/home' element ={<Home />} />        
              <Route path='/cadastro' element ={<Cadastro />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/servicos" element={<ListaServicos />} />
              <Route path="/cadastrarservico" element={<FormServico />} />
              <Route path="/editarservico/:id" element={<FormServico />} />
              <Route path="/deletarservico/:id" element={<DeletarServico />} />
              <Route path="/perfil" element={<Perfil />} />
           </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
