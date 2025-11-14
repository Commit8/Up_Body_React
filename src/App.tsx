import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import HomePage from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import ListaCategorias from "./components/categoria/listaCategorias/ListaCategorias";
import FormCategoria from "./components/categoria/formCategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarCategoria/DeletarCategoria";
import ListaServico from "./components/servico/listaServico/ListaServico";
import FormServico from "./components/servico/formServico/FormServico";
import DeletarServico from "./components/servico/deletarServico/DeletarServico";
import Footer from "./components/footer/Footer";
import PerfilPlus from "./pages/perfilPlus/PerfilPlus";


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path='/' element ={<HomePage />} />
              <Route path='/login' element ={<Login />} />             
              <Route path='/home' element ={<HomePage />} />        
              <Route path='/cadastro' element ={<Cadastro />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/servicos" element={<ListaServico />} />
              <Route path="/cadastrarservico" element={<FormServico />} />
              <Route path="/editarservico/:id" element={<FormServico />} />
              <Route path="/deletarservico/:id" element={<DeletarServico />} />
              <Route path="/perfilplus/:id" element={<PerfilPlus />} />
              
           </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
