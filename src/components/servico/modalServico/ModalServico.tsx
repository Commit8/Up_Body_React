import { useState } from "react";
import Popup from "reactjs-popup";
import FormServico from "../formServico/FormServico";

interface ModalServicoprops {
  onServicoCadastrado?: () => void;
}

function ModalServico({ onServicoCadastrado }: ModalServicoprops) {
  const [isOpen, setIsOpen] = useState(false);

  const handleServicoCadastrado = () => {
    onServicoCadastrado?.();
    setIsOpen(false);
  };

  return (
    <>
      <Popup
        open={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={
          <button
            className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800"
            onClick={() => setIsOpen(true)}
          >
            Novo Serviço
          </button>
        }
        modal
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
