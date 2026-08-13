---
layout: page
page: true
title: Tutorial Interativo de Markdown para Iniciantes
description: Aprenda Markdown passo a passo com explicações curtas, exemplos editáveis, dicas e pré-visualização imediata no navegador.
aside: false
footer: false
returnToTop: false
published: true
---

[//]: # (// first version of this file copy from: https://github.com/vuejs/docs/blob/main/src/tutorial/)

<section class="practice-seo-copy practice-seo-copy--intro">
  <h1>Tutorial Interativo de Markdown para Iniciantes</h1>
  <p>Aprenda Markdown editando exemplos reais. Cada etapa apresenta uma ideia, permite alterar o código e mostra o resultado imediatamente no navegador.</p>
  <ul class="practice-seo-highlights">
    <li><strong>Passo a passo:</strong> comece com títulos e texto e avance para links, listas, tabelas e outros recursos.</li>
    <li><strong>Prática direta:</strong> altere cada exemplo em vez de apenas memorizar a sintaxe.</li>
    <li><strong>Privacidade:</strong> suas alterações ficam na sessão atual do navegador.</li>
  </ul>
  <h2>Comece o tutorial</h2>
</section>

<script>
import { defineAsyncComponent } from 'vue';
import ReplLoading from '@theme/components/ReplLoading.vue';
import { data } from './tutorial.data';

export default {
  components: {
    TutorialRepl: defineAsyncComponent({
      loader: () => import('/component/TutorialRepl.vue'),
      loadingComponent: ReplLoading
    })
  },
  data () {
    return {
      data
    };
  }
}
</script>

<ClientOnly>
    <TutorialRepl :data="data" hintText="Mostre-me!" resetText="Resetar" previousButtonText="Anterior" nextButtonText="Próximo"/>
</ClientOnly>

<section class="practice-seo-copy practice-seo-copy--after">
  <h2>Como usar este tutorial de Markdown</h2>
  <ol>
    <li>Leia a instrução da etapa atual.</li>
    <li>Edite o Markdown no painel prático e compare com a pré-visualização.</li>
    <li>Use a dica quando precisar e depois avance para a próxima etapa.</li>
  </ol>

  <h2>O que aprender depois</h2>
  <p>Consulte a <a href="/pt/reference/cheatsheet/">folha de dicas do Markdown</a>, escreva um documento maior no <a href="/pt/playground/">editor Markdown WYSIWYG</a> ou explore <a href="/pt/showcase/">exemplos práticos de Markdown</a>.</p>

  <h2>Perguntas frequentes</h2>
  <details>
    <summary>Preciso instalar alguma coisa?</summary>
    <p>Não. O tutorial funciona em um navegador moderno e não exige uma conta.</p>
  </details>
  <details>
    <summary>O tutorial serve para quem nunca usou Markdown?</summary>
    <p>Sim. Ele começa pela formatação básica e apresenta um conceito de cada vez.</p>
  </details>
  <details>
    <summary>Onde posso consultar uma sintaxe rapidamente?</summary>
    <p>Use a <a href="/pt/reference/cheatsheet/">folha de dicas completa do Markdown</a> como referência.</p>
  </details>
</section>
