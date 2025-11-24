
import * as readline from 'readline';

// Importa os Gerenciadores
import { GerenciadorLivros } from '../servicos/GerenciadorLivros';
import { GerenciadorMembros } from '../servicos/GerenciadorMembros';
import { GerenciadorEmprestimos } from '../servicos/GerenciadorEmprestimos';

// Importa os Modelos
import { Livro } from '../bibiblioteca/Livro';
import { Membro } from '../bibiblioteca/Membro';

export class CLI {
    private rl: readline.Interface;
    private gerenciadorLivros: GerenciadorLivros;
    private gerenciadorMembros: GerenciadorMembros;
    private gerenciadorEmprestimos: GerenciadorEmprestimos;

    constructor(
        gl: GerenciadorLivros,
        gm: GerenciadorMembros,
        ge: GerenciadorEmprestimos
    ) {
        this.gerenciadorLivros = gl;
        this.gerenciadorMembros = gm;
        this.gerenciadorEmprestimos = ge;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

   
    public iniciar(): void {
        console.log("\n--- BEM-VINDO AO SISTEMA DE BIBLIOTECA (TS CLI) ---");
        this.mostrarMenuPrincipal();
    }

   
    private perguntar(pergunta: string): Promise<string> {
        return new Promise(resolve => {
            this.rl.question(pergunta, resolve);
        });
    }

    private async mostrarMenuPrincipal(): Promise<void> {
        console.log("\n### MENU PRINCIPAL ###");
        console.log("1. Cadastro de Livros");
        console.log("2. Cadastro de Membros");
        console.log("3. Gerenciamento de Empréstimos");
        console.log("4. Sair do Sistema");

        const opcao = await this.perguntar("Escolha uma opção: ");

        switch (opcao.trim()) {
            case '1':
                await this.menuLivros();
                break;
            case '2':
                await this.menuMembros();
                break;
            case '3':
                await this.menuEmprestimos();
                break;
            case '4':
                this.encerrar();
                return;
            default:
                console.log("Opção inválida. Tente novamente.");
                break;
        }
        this.mostrarMenuPrincipal();
    }

    // ----------------------------------------------------------------
    // #1 Menu Livros

    private async menuLivros(): Promise<void> {
        console.log("\n--- MENU LIVROS ---");
        console.log("1. Adicionar Novo Livro");
        console.log("2. Listar Todos os Livros");
        console.log("3. Atualizar Livro");
        console.log("4. Remover Livro");
        console.log("5. Voltar ao Menu Principal");

        const opcao = await this.perguntar("Escolha uma opção: ");

        switch (opcao.trim()) {
            case '1':
                await this.adicionarLivro();
                break;
            case '2':
                this.listarLivros();
                break;
            case '3':
                await this.atualizarLivro();
                break;
            case '4':
                await this.removerLivro();
                break;
            case '5':
                return; 
            default:
                console.log("Opção inválida.");
                break;
        }
        await this.menuLivros(); 
    }

    private async adicionarLivro(): Promise<void> {
        console.log("\n-- Adicionar Livro --");
        const titulo = await this.perguntar("Título: ");
        const autor = await this.perguntar("Autor: ");
        const isbn = await this.perguntar("ISBN (Identificador Único): ");
        const anoPublicacao = parseInt(await this.perguntar("Ano de Publicação: "));

        if (isNaN(anoPublicacao)) {
            console.warn("Ano inválido. Operação cancelada.");
            return;
        }

        const novoLivro = new Livro(titulo, autor, isbn, anoPublicacao);
        this.gerenciadorLivros.adicionarLivro(novoLivro);
    }

    private listarLivros(): void {
        console.log("\n-- Lista de Livros --");
        const livros = this.gerenciadorLivros.listarTodos();
        if (livros.length === 0) {
            console.log("Nenhum livro cadastrado.");
            return;
        }
        livros.forEach(livro => console.log(livro.detalhes()));
    }

    private async atualizarLivro(): Promise<void> {
        console.log("\n-- Atualizar Livro --");
        const isbn = await this.perguntar("ISBN do Livro a ser atualizado: ");
        const livro = this.gerenciadorLivros.buscarLivroPorISBN(isbn);

        if (!livro) {
            console.warn(`Livro com ISBN ${isbn} não encontrado.`);
            return;
        }
        
        console.log(`Livro Atual: ${livro.detalhes()}`);
        const novoTitulo = await this.perguntar(`Novo Título (deixe em branco para manter "${livro.titulo}"): `);
        const novoAutor = await this.perguntar(`Novo Autor (deixe em branco para manter "${livro.autor}"): `);
        const novoAnoStr = await this.perguntar(`Novo Ano de Publicação (deixe em branco para manter ${livro.anoPublicacao}): `);
        
        const novosDados: { titulo?: string, autor?: string, anoPublicacao?: number } = {};

        if (novoTitulo.trim()) novosDados.titulo = novoTitulo;
        if (novoAutor.trim()) novosDados.autor = novoAutor;
        
        const novoAno = parseInt(novoAnoStr.trim());
        if (!isNaN(novoAno)) novosDados.anoPublicacao = novoAno;

        this.gerenciadorLivros.atualizarLivro(isbn, novosDados);
    }
    
    private async removerLivro(): Promise<void> {
        console.log("\n-- Remover Livro --");
        const isbn = await this.perguntar("ISBN do Livro a ser removido: ");
        this.gerenciadorLivros.removerLivro(isbn);
    }

    
    private async menuMembros(): Promise<void> {
        console.log("\n--- MENU MEMBROS ---");
        console.log("1. Adicionar Novo Membro");
        console.log("2. Listar Todos os Membros");
        console.log("3. Atualizar Membro");
        console.log("4. Remover Membro");
        console.log("5. Voltar ao Menu Principal");

        const opcao = await this.perguntar("Escolha uma opção: ");

        switch (opcao.trim()) {
            case '1':
                await this.adicionarMembro();
                break;
            case '2':
                this.listarMembros();
                break;
            case '3':
                await this.atualizarMembro();
                break;
            case '4':
                await this.removerMembro();
                break;
            case '5':
                return; // Volta ao Menu Principal
            default:
                console.log("Opção inválida.");
                break;
        }
        await this.menuMembros();
    }
    
    private async adicionarMembro(): Promise<void> {
        console.log("\n-- Adicionar Membro --");
        const nome = await this.perguntar("Nome: ");
        const matricula = await this.perguntar("Matrícula (Identificador Único): ");
        const endereco = await this.perguntar("Endereço: ");
        const telefone = await this.perguntar("Telefone: ");

        const novoMembro = new Membro(nome, endereco, telefone, matricula);
        this.gerenciadorMembros.adicionarMembro(novoMembro);
    }

    private listarMembros(): void {
        console.log("\n-- Lista de Membros --");
        const membros = this.gerenciadorMembros.listarTodos();
        if (membros.length === 0) {
            console.log("Nenhum membro cadastrado.");
            return;
        }
        membros.forEach(membro => console.log(membro.detalhes()));
    }

    private async atualizarMembro(): Promise<void> {
        console.log("\n-- Atualizar Membro --");
        const matricula = await this.perguntar("Matrícula do Membro a ser atualizado: ");
        const membro = this.gerenciadorMembros.buscarMembroPorMatricula(matricula);

        if (!membro) {
            console.warn(`Membro com Matrícula ${matricula} não encontrado.`);
            return;
        }
        
        console.log(`Membro Atual: ${membro.detalhes()}`);
        const novoNome = await this.perguntar(`Novo Nome (deixe em branco para manter "${membro.nome}"): `);
        const novoEndereco = await this.perguntar(`Novo Endereço (deixe em branco para manter "${membro.endereco}"): `);
        const novoTelefone = await this.perguntar(`Novo Telefone (deixe em branco para manter "${membro.telefone}"): `);
        
        const novosDados: { nome?: string, endereco?: string, telefone?: string } = {};

        if (novoNome.trim()) novosDados.nome = novoNome;
        if (novoEndereco.trim()) novosDados.endereco = novoEndereco;
        if (novoTelefone.trim()) novosDados.telefone = novoTelefone;

        this.gerenciadorMembros.atualizarMembro(matricula, novosDados);
    }

    private async removerMembro(): Promise<void> {
        console.log("\n-- Remover Membro --");
        const matricula = await this.perguntar("Matrícula do Membro a ser removido: ");
        this.gerenciadorMembros.removerMembro(matricula);
    }
    
    
    // #3 Menu Empréstimos
    // ----------------------------------------------------------------

    private async menuEmprestimos(): Promise<void> {
        console.log("\n--- MENU EMPRÉSTIMOS ---");
        console.log("1. Realizar Empréstimo");
        console.log("2. Registrar Devolução");
        console.log("3. Listar Empréstimos Ativos");
        console.log("4. Listar Histórico Completo");
        console.log("5. Voltar ao Menu Principal");

        const opcao = await this.perguntar("Escolha uma opção: ");

        switch (opcao.trim()) {
            case '1':
                await this.realizarEmprestimo();
                break;
            case '2':
                await this.registrarDevolucao();
                break;
            case '3':
                this.listarEmprestimosAtivos();
                break;
            case '4':
                this.listarHistoricoEmprestimos();
                break;
            case '5':
                return;
            default:
                console.log("Opção inválida.");
                break;
        }
        await this.menuEmprestimos();
    }
    
    private async realizarEmprestimo(): Promise<void> {
        console.log("\n-- Realizar Empréstimo --");
        const isbn = await this.perguntar("ISBN do Livro: ");
        const matricula = await this.perguntar("Matrícula do Membro: ");

        this.gerenciadorEmprestimos.realizarEmprestimo(isbn, matricula);
    }

    private async registrarDevolucao(): Promise<void> {
        console.log("\n-- Registrar Devolução --");
        const isbn = await this.perguntar("ISBN do Livro a ser devolvido: ");
        const matricula = await this.perguntar("Matrícula do Membro que está devolvendo: ");

        this.gerenciadorEmprestimos.registrarDevolucao(isbn, matricula);
    }

    private listarEmprestimosAtivos(): void {
        console.log("\n-- Empréstimos Ativos --");
        const ativos = this.gerenciadorEmprestimos.listarEmprestimosAtivos();
        if (ativos.length === 0) {
            console.log("Nenhum empréstimo ativo no momento.");
            return;
        }
        ativos.forEach(e => {
            console.log(`[ATIVO] Livro ISBN: ${e.isbnLivro} | Membro Matrícula: ${e.matriculaMembro} | Data Empréstimo: ${e.dataEmprestimo.toLocaleDateString()}`);
        });
    }

    private listarHistoricoEmprestimos(): void {
        console.log("\n-- Histórico Completo de Empréstimos --");
        const historico = this.gerenciadorEmprestimos.listarHistorico();
        if (historico.length === 0) {
            console.log("Nenhum empréstimo registrado no histórico.");
            return;
        }
        historico.forEach(e => {
            const status = e.isAtivo() ? 'ATIVO' : 'DEVOLVIDO';
            const dataDev = e.dataDevolucao ? e.dataDevolucao.toLocaleDateString() : 'N/A';
            console.log(`[${status}] Livro: ${e.isbnLivro} | Membro: ${e.matriculaMembro} | Emp: ${e.dataEmprestimo.toLocaleDateString()} | Dev: ${dataDev}`);
        });
    }


    /**
     * Encerra a interface de leitura.
     */
    private encerrar(): void {
        this.rl.close();
        console.log("\nSistema encerrado. Obrigado!");
    }
}