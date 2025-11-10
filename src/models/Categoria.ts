import type Servico from "./Servico";

export default interface Categoria {
    id: number;
    tipo: string;
    servico?: Servico[] | null;
}