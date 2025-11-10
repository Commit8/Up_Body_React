import type Usuario from "./Usuario";

export default interface Servico {
    id: number;
    plano: string;
    inicio: string;
    termino: string;
    valor: number;
    usuario: Usuario;

}