import { Knex } from "knex";
import { title } from "process";

export async function seed(knex: Knex): Promise<void> {
  await knex("tasks").insert([
    {
      title: "Estudar JavaScript",
      description:
        "Revisar os principais conceitos de JavaScript, incluindo variáveis, funções e objetos.",
    },
    {
      title: "Criar portfólio online",
      description:
        "Desenvolver uma página web pessoal para exibir seus projetos e habilidades.",
    },
    {
      title: "Organizar a mesa de trabalho",
      description:
        "Limpar e organizar a mesa para melhorar a produtividade e o foco.",
    },
    {
      title: "Fazer backup dos arquivos",
      description:
        "Realizar o backup dos documentos importantes no Google Drive ou HD externo.",
    },
    {
      title: "Praticar inglês por 30 minutos",
      description:
        "Assistir a um vídeo em inglês e anotar 10 palavras novas com seus significados.",
    },
    {
      title: "Ir ao supermercado",
      description:
        "Comprar itens essenciais como leite, pão, frutas e produtos de limpeza.",
    },
    {
      title: "Planejar a semana",
      description:
        "Criar uma lista com as principais metas e compromissos da semana.",
    },
    {
      title: "Ler um capítulo de um livro",
      description:
        "Ler pelo menos um capítulo do livro atual para manter o hábito da leitura.",
    },
    {
      title: "Fazer exercícios físicos",
      description:
        "Realizar uma atividade física leve, como caminhada ou alongamento, por 30 minutos.",
    },
    {
      title: "Responder e-mails pendentes",
      description:
        "Organizar a caixa de entrada e responder todas as mensagens importantes.",
    },
  ]);
}
