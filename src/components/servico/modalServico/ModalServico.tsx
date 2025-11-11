import { useState } from "react";
import Popup from "reactjs-popup";
import FormServico from "../formServico/FormServico";

interface ModalServicoprops {
  onServicoCadastrado?: () => void;
}

function ModalServico({ onServicoCadastrado }: ModalServicoprops) {
  const [isOpen, setIsOpen] = useState(false);

  const handleServicoCadastrado = () => {
    onServicoCadastrado?.(); // recarrega lista
    setIsOpen(false); // fecha modal
  };

  return (
    <>
      {/* AGORA o botão é fora do Popup */}
      <button
        className="border rounded px-4 py-2 font-semibold bg-linear-to-r from-yellow-500 to-green-500 hover:from-yellow-700 hover:to-green-700"
        onClick={() => setIsOpen(true)}
      >
        Novo Serviço
      </button>

      <Popup 
        modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        contentStyle={{
          borderRadius: "1rem",
          padding: "2rem",
          color: "white",
        }}
      >
        <FormServico onServicoCadastrado={handleServicoCadastrado} />
      </Popup>
    </>
  );
}

export default ModalServico;
