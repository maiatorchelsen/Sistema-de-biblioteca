// src/main.ts

import { GerenciadorLivros } from './servicos/GerenciadorLivros';
import { GerenciadorMembros } from './servicos/GerenciadorMembros';
import { GerenciadorEmprestimos } from './servicos/GerenciadorEmprestimos';
import { CLI } from './cli/CLI';

// 1. Inicializa os Gerenciadores (eles carregam os dados dos arquivos)
const gerenciadorLivros = new GerenciadorLivros();
const gerenciadorMembros = new GerenciadorMembros();

const gerenciadorEmprestimos = new GerenciadorEmprestimos(gerenciadorLivros, gerenciadorMembros);

const cli = new CLI(gerenciadorLivros, gerenciadorMembros, gerenciadorEmprestimos);

cli.iniciar();

// Para rodar o sistema: npm start