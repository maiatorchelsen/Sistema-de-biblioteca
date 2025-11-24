// src/data/Persistencia.ts

import * as fs from 'fs';
import * as path from 'path';

import { Livro } from '../bibiblioteca/Livro';
import { Membro } from '../bibiblioteca/Membro';
import { Emprestimo } from '../bibiblioteca/Emprestimo';
import { Pessoa } from '../bibiblioteca/Pessoa'; 

/**
 * Classe responsável por salvar e carregar dados de/para arquivos JSON.
 */
export class Persistencia {
    private static BASE_DIR = path.join(process.cwd(), 'data'); 

    /**
     * Salva uma lista de objetos em um arquivo JSON.
     * Utiliza o método .toJSON() das classes para serialização.
     */
    public static salvar(dados: Array<{ toJSON: () => object }>, nomeArquivo: string): void {
        const caminhoCompleto = path.join(Persistencia.BASE_DIR, nomeArquivo);
        
        // 1. Serializa a lista de objetos, usando o método toJSON() de cada objeto
        const dadosSerializados = dados.map(obj => obj.toJSON());
        
        try {
            // Garante que o diretório 'data' exista
            if (!fs.existsSync(Persistencia.BASE_DIR)) {
                fs.mkdirSync(Persistencia.BASE_DIR, { recursive: true });
            }
            fs.writeFileSync(caminhoCompleto, JSON.stringify(dadosSerializados, null, 2), 'utf-8');
            // console.log(`Dados salvos em: ${caminhoCompleto}`);
        } catch (error) {
            console.error(`Erro ao salvar dados em ${nomeArquivo}:`, error);
        }
    }

    // Carrega dados de um arquivo JSON e os converte de volta para instâncias das classes.
    
    public static carregar<T>(nomeArquivo: string, ConstrutorClasse: new (...args: any[]) => T): T[] {
        const caminhoCompleto = path.join(Persistencia.BASE_DIR, nomeArquivo);
        
        if (!fs.existsSync(caminhoCompleto)) {
            return []; 
        }

        try {
            const dadosJson = fs.readFileSync(caminhoCompleto, 'utf-8');
            const dadosArray = JSON.parse(dadosJson);

            return dadosArray.map((dados: any) => {
                
                
                if (ConstrutorClasse === Livro) {
                    return new Livro(
                        dados.titulo, 
                        dados.autor, 
                        dados.isbn, 
                        dados.anoPublicacao, 
                        dados.disponivel
                    ) as T;

                } else if (ConstrutorClasse === Membro) {
                    // O Membro precisa ser desserializado com base nos atributos de Pessoa e Membro
                    return new Membro(
                        dados.nome,
                        dados.endereco,
                        dados.telefone,
                        dados.matricula
                    ) as T;

                } else if (ConstrutorClasse === Emprestimo) {
                    // Datas precisam ser convertidas de volta para objetos Date
                    return new Emprestimo(
                        dados.isbnLivro,
                        dados.matriculaMembro,
                        new Date(dados.dataEmprestimo),
                        dados.dataDevolucao ? new Date(dados.dataDevolucao) : undefined
                    ) as T;
                }
                
                // Retorna o objeto simples se não for uma classe conhecida (fallback)
                return dados as T; 
            });

        } catch (error) {
            console.error(`Erro ao carregar dados de ${nomeArquivo}. O arquivo pode estar corrompido.`, error);
            return [];
        }
    }
}