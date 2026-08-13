---
layout: page
title: Editor Markdown WYSIWYG com Pré-visualização
description: Escreva e formate Markdown online nos modos visual, código, dividido ou pré-visualização. O documento fica na sessão atual do navegador.
footer: false
---

<main class="playground-page" aria-labelledby="playground-title">
  <section class="practice-seo-copy practice-seo-copy--intro">
    <h1 id="playground-title">Editor Markdown WYSIWYG com Pré-visualização</h1>
    <p>Escreva Markdown da maneira mais adequada à sua tarefa. Use a formatação visual, edite o código diretamente ou compare o código com o resultado lado a lado.</p>
    <ul class="practice-seo-highlights">
      <li><strong>Quatro modos:</strong> visual, código, dividido e somente pré-visualização.</li>
      <li><strong>Markdown completo:</strong> tabelas, tarefas, código, fórmulas, diagramas Mermaid e notação musical.</li>
      <li><strong>No navegador:</strong> não exige conta nem instalação.</li>
    </ul>
  </section>

  <MarkdownEditor id="playground-md-editor" :text="text" :options="editorOptions" />

  <section class="practice-seo-copy practice-seo-copy--after">
    <h2>Como usar o editor Markdown online</h2>
    <ol>
      <li>Escolha o modo visual para formatar com botões ou o modo código para escrever a sintaxe diretamente.</li>
      <li>Use a visualização dividida para comparar o código com o resultado renderizado.</li>
      <li>Copie o Markdown pronto antes de sair ou atualizar a página.</li>
    </ol>

    <h2>Aprenda e consulte Markdown</h2>
    <p>Se você está começando, faça o <a href="/pt/tutorial/">tutorial interativo de Markdown</a>. Para consultas rápidas, abra a <a href="/pt/reference/cheatsheet/">folha de dicas</a> e veja <a href="/pt/showcase/">exemplos de diagramas e fórmulas</a>.</p>

    <h2>Perguntas frequentes</h2>
    <details>
      <summary>O editor envia meu documento?</summary>
      <p>O editor foi projetado para processar o texto no navegador. Ele não oferece armazenamento em nuvem, então copie seu trabalho antes de sair.</p>
    </details>
    <details>
      <summary>Qual é a diferença entre o modo visual e o modo código?</summary>
      <p>O modo visual oferece controles de formatação conhecidos; o modo código mostra os caracteres Markdown diretamente.</p>
    </details>
    <details>
      <summary>Posso usar o editor no celular?</summary>
      <p>Sim. A interface se adapta a telas menores, embora o modo dividido seja mais confortável em uma tela larga.</p>
    </details>
  </section>
</main>

<script setup>
import MarkdownEditor from '/component/MarkdownEditor.vue'
import text from '../guide/index.md?raw'

const editorOptions = { mode: 'wysiwyg' }
</script>

<style>
.playground-page {
  width: 100%;
  max-width: 1500px;
  padding: 24px 28px 36px;
  margin: 0 auto;
}
@media (max-width: 767px) {
  .playground-page { padding: 18px 12px 28px; }
}
</style>
