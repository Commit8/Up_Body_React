import { useState } from "react";
import Popup from "reactjs-popup";
import FormServico from "../formServico/FormServico";

interface ModalServicoprops {
  onServicoCadastrado?: () => void;
}

function ModalServico({ onServicoCadastrado }: ModalServicoprops) {
  const [isOpen, setIsOpen] = useState(false);

  const handleServicoCadastrado = () => {
    onServicoCadastrado?.();   // recarrega lista
    setIsOpen(false);          // fecha modal
  };

  return (
    <>
      {/* AGORA o botão é fora do Popup */}
      <button
        className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800"
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
          padding: "4rem",
          backgroundColor: "gray",
          color: "white",
        }}
      >
        <FormServico onServicoCadastrado={handleServicoCadastrado} />
      </Popup>
    </>
  );
}

export default ModalServico;
