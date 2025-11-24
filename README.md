Sistema de Biblioteca
Este é um sistema de gerenciamento de bibliotecas desenvolvido em TypeScript com base em programação orientada a objetos. Ele permite gerenciar livros, membros e empréstimos, utilizando uma interface de linha de comando (CLI) para interação com o usuário. O sistema armazena os dados em arquivos JSON e implementa funcionalidades básicas de CRUD (Criar, Ler, Atualizar e Deletar).

Funcionalidades
Gerenciamento de Livros:

Adicionar, listar, atualizar e remover livros.
Controle de disponibilidade dos livros.
Gerenciamento de Membros:

Adicionar, listar, atualizar e remover membros.
Gerenciamento de Empréstimos:

Realizar empréstimos de livros.
Registrar devoluções.
Listar empréstimos ativos e histórico completo.
Persistência de Dados:

Os dados são armazenados em arquivos JSON para garantir a persistência.
Testes Automatizados:

Testes implementados com Jest para validar as funcionalidades dos gerenciadores de livros e membros.
Tecnologias Utilizadas
Linguagem: TypeScript
Execução: Node.js
Persistência: Arquivos JSON
Testes: Jest
Interface: CLI (Command Line Interface)
Como Executar o Projeto
Pré-requisitos:

Node.js instalado.
Gerenciador de pacotes npm.
Instalação:

Clone o repositório:

git clone <>
Instale as dependências:

npm install
Execução:

Para iniciar o sistema, execute:

npm start
Executar Testes:

Para rodar os testes automatizados, execute:

npx jest
Estrutura do Projeto
src: Contém o código-fonte do sistema.
cli/: Implementação da interface de linha de comando.
data: Classe de persistência e arquivos JSON para armazenamento.
servicos/: Gerenciadores de livros, membros e empréstimos.
biblioteca/: Modelos de dados (Livro, Membro, Emprestimo, etc.).
__tests__/: Testes automatizados para validação das funcionalidades.
Oportunidades de Melhoria
Implementar validações mais robustas para entradas do usuário.
Adicionar suporte a banco de dados para maior escalabilidade.
Criar uma interface gráfica (GUI) ou aplicação web.
Adicionar controle de prazos e cálculo de multas para devoluções atrasadas.
Expandir os testes automatizados para cobrir mais cenários.
Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

Licença
Este projeto está licenciado sob a licença ISC.
