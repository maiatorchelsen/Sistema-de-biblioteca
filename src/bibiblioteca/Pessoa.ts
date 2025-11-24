
export class Pessoa {
    // Atributos protected (Encapsulamento + Herança)
    protected _nome: string;
    protected _endereco: string;
    protected _telefone: string;

    constructor(nome: string, endereco: string, telefone: string) {
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }

    // --- GETTERS (Acesso controlado) ---

    public get nome(): string {
        return this._nome;
    }

    public get endereco(): string {
        return this._endereco;
    }

    public get telefone(): string {
        return this._telefone;
    }

    // --- SETTERS (Modificação controlada) ---

    public set nome(novoNome: string) {
        this._nome = novoNome;
    }

    public set endereco(novoEndereco: string) {
        this._endereco = novoEndereco;
    }

    public set telefone(novoTelefone: string) {
        this._telefone = novoTelefone;
    }

    
    public detalhes(): string {
        return `Nome: ${this._nome} | Endereço: ${this._endereco} | Telefone: ${this._telefone}`;
    }

    
    public toJSON(): object {
        return {
            nome: this._nome,
            endereco: this._endereco,
            telefone: this._telefone
        };
    }
}