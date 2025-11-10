import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { buscar } from "../../../services/Service";
import { SyncLoader } from "react-spinners";
import CardServico from "../cardServico/CardServico";
import type Servico from "../../../models/Servico";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import ModalServico from "../modalServico/ModalServico";

function ListaServico() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [servicos, setServicos] = useState<Servico[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

   useEffect(() => {
      if (token === "") {
        ToastAlerta("Você precisa estar logado!", "info");
        navigate("/login");
      }
    }, [token]);
  

  useEffect(() => {
    buscarServicos();
  }, [servicos.length]);

  async function buscarServicos() {
    try {
      setIsLoading(true);

      await buscar("/servicos", setServicos, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <div className="flex justify-center w-full my-8">
          <SyncLoader color="#312e81" size={32} />
        </div>
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-2">
          {!isLoading && servicos.length === 0 && (
            <span className="text-3xl text-center my-8">
              Nenhum Serviço foi encontrado!
            </span>
          )}
          <div
            className="container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 
                        lg:grid-cols-3 gap-4"
          ><p className="text-xl">Cadastrar Serviços</p>

            <div className="flex justify-around gap-4">
              <ModalServico />
            </div>
            {servicos.map((servico) => (
              <CardServico key={servico.id} servico={servico}  />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaServico;
