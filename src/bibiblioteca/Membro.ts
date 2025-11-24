
import { Pessoa } from './Pessoa';


export class Membro extends Pessoa {
    // Atributo específico do Membro
    private _matricula: string; 

    constructor(nome: string, endereco: string, telefone: string, matricula: string) {
        
        super(nome, endereco, telefone); 
        this._matricula = matricula;
    }

    // --- GETTERS ---

    public get matricula(): string {
        return this._matricula;
    }

    // --- SETTERS ---

   
    public detalhes(): string {
        return `${super.detalhes()} | Matrícula: ${this._matricula}`;
    }
    
    /**
     * Método auxiliar para serializar o Membro.
     */
    public toJSON(): object {
        // Combina os atributos da superclasse com os específicos
        return {
            ...super.toJSON(), 
            matricula: this._matricula
        };
    }
}