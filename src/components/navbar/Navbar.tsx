import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div
      className="w-full flex bg-[linear-gradient(135deg,#333333_20%,#4F4F4F_60%,#6D6D6D_100%)] 
                 text-white font-yusei md:px-4 lg:px-6"
    >
      <div className="container flex justify-between text-lg mx-8">
        <Link
          to="/home"
          className={`flex items-center space-x-2 text-3xl bg-linear-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent text font-bold ${
            !isNavOpen ? "block" : "hidden"} sm:flex`}
        >
          <img
            src="https://i.postimg.cc/9QvR6ksk/4-removebg-preview-1.png"
            alt="Logo UP Body"
            className="w-10 h-10 mr-5 my-2.5"
          />
          UpBody
        </Link>
        <div className="sm:hidden">
          <div
            className="cursor-pointer hover:text-[#27292D] absolute top-0 right-0 px-6 py-6 z-11"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            {isNavOpen ? <XIcon size={32} /> : <ListIcon size={32} />}
          </div>
          <div className={isNavOpen ? "mostraMenuNav" : "escondeMenuNav"}>
            <div className="flex flex-col text-[##333333] gap-8">
              <Link
                to="/servicos"
                className="hover:text-[#27292D] transition-colors"
                onClick={() => setIsNavOpen(false)}
              >
                Serviços
              </Link>
              <Link
                to="/categorias"
                className="hover:text-[#27292D] transition-colors"
                onClick={() => setIsNavOpen(false)}
              >
                Categorias
              </Link>
              <Link
                to="/login"
                className="hover:text-[#27292D] transition-colors"
                onClick={() => setIsNavOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex gap-8 items-center ">
          <Link to="/servicos" className="px-2 py-1 rounded-md border-2 border-transparent hover:border-black hover:bg-black
             hover:text-white transition-all" onClick={() => setIsNavOpen(false)}>
            Serviços
          </Link>
          <Link to="/categorias" className="px-2 py-1 rounded-md border-2 border-transparent hover:border-black hover:bg-black
           hover:text-white transition-all" onClick={() => setIsNavOpen(false)}>
            Categorias
          </Link>
          <Link
            to="/login"
            className="px-2 py-1 rounded-md border-2 border-transparent hover:border-black hover:bg-black 
            hover:text-white transition-all" onClick={() => setIsNavOpen(false)}>
            Login
          </Link>
        </div>
      </div>
      <style>
        {`
        .escondeMenuNav{
          display: none;
        }
        .mostraMenuNav{
          background: #4F4F4F;
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 30;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
        }`}
      </style>
    </div>
  );
}

export default Navbar;
