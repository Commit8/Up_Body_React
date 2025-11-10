import Popup from "reactjs-popup"
import FormServico from "../formServico/FormServico"

function ModalServico() {
    return (
        <>
        <Popup trigger={
                <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
                    Nova Publicação
                </button>
            }
            modal
            contentStyle={{
                borderRadius: '1rem',
                padding: '4rem',
                backgroundColor: 'gray',
                color: 'white'
            }}
           >

            <FormServico />    
                
        </Popup>        
        </>
    )
}

export default ModalServico

