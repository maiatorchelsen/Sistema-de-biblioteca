
export class Emprestimo {
    // Atributos privados (Encapsulamento)
    private _isbnLivro: string;
    private _matriculaMembro: string;
    private _dataEmprestimo: Date;
    private _dataDevolucao?: Date; 

    constructor(
        isbnLivro: string,
        matriculaMembro: string,
        // Ao criar, a data de empréstimo é o momento atual
        dataEmprestimo: Date = new Date(), 
        dataDevolucao?: Date
    ) {
        this._isbnLivro = isbnLivro;
        this._matriculaMembro = matriculaMembro;
        this._dataEmprestimo = dataEmprestimo;
        this._dataDevolucao = dataDevolucao;
    }

    // --- GETTERS ---
    public get isbnLivro(): string {
        return this._isbnLivro;
    }

    public get matriculaMembro(): string {
        return this._matriculaMembro;
    }

    public get dataEmprestimo(): Date {
        return this._dataEmprestimo;
    }

    public get dataDevolucao(): Date | undefined {
        return this._dataDevolucao;
    }

    // --- SETTERS ---

    public set dataDevolucao(data: Date | undefined) {
        this._dataDevolucao = data;
    }

    
    public isAtivo(): boolean {
        return this._dataDevolucao === undefined;
    }

   
    public toJSON(): object {
        return {
            isbnLivro: this._isbnLivro,
            matriculaMembro: this._matriculaMembro,
            dataEmprestimo: this._dataEmprestimo.toISOString(), 
            dataDevolucao: this._dataDevolucao ? this._dataDevolucao.toISOString() : undefined
        };
    }
}