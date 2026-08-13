---
layout: page
title: Exemplos de Markdown com Diagramas, Fórmulas e Mais
description: Explore exemplos editáveis de Markdown com fluxogramas Mermaid, linhas do tempo, mapas mentais, gráficos de Gantt, fórmulas e notas de rodapé.
aside: false
footer: false
outline: false
---

<section class="practice-seo-copy practice-seo-copy--intro">
  <h1>Exemplos de Markdown com Diagramas, Fórmulas e Mais</h1>
  <p>Explore exemplos completos que vão além de negrito e listas. Escolha um exemplo, examine o código Markdown, edite-o e compare a pré-visualização.</p>
  <ul class="practice-seo-highlights">
    <li><strong>Diagramas:</strong> fluxogramas, linhas do tempo, mapas mentais e gráficos de Gantt com Mermaid.</li>
    <li><strong>Conteúdo técnico:</strong> fórmulas, código, tabelas e notas de rodapé.</li>
    <li><strong>Código reutilizável:</strong> adapte os exemplos para documentação, anotações e READMEs.</li>
  </ul>
  <h2>Explore os exemplos editáveis</h2>
</section>

<script>
import { defineAsyncComponent } from 'vue';
import ReplLoading from '@theme/components/ReplLoading.vue';
import {data} from "./showcases.data";

export default {
  components: {
    ShowCaseRepl: defineAsyncComponent({
      loader: () => import('/component/ShowCaseRepl.vue'),
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
  <ShowCaseRepl :data="data"/>
</ClientOnly>

<section class="practice-seo-copy practice-seo-copy--after">
  <h2>Como reutilizar um exemplo</h2>
  <ol>
    <li>Escolha um exemplo e compare o código com a pré-visualização.</li>
    <li>Altere textos, valores ou a estrutura até obter o resultado desejado.</li>
    <li>Copie o Markdown para um editor compatível com a extensão utilizada.</li>
  </ol>

  <h2>Continue aprendendo</h2>
  <p>Consulte a <a href="/pt/reference/cheatsheet/">folha de dicas do Markdown</a>, pratique desde o início no <a href="/pt/tutorial/">tutorial interativo</a> ou crie seu documento no <a href="/pt/playground/">editor Markdown online</a>.</p>

  <h2>Perguntas frequentes</h2>
  <details>
    <summary>Todos os editores de Markdown aceitam estes exemplos?</summary>
    <p>Não. A sintaxe básica tem amplo suporte, mas Mermaid, fórmulas e notas de rodapé dependem do editor ou da plataforma.</p>
  </details>
  <details>
    <summary>Posso alterar os exemplos?</summary>
    <p>Sim. A página foi feita para experimentar, e as alterações ficam na sessão atual do navegador.</p>
  </details>
</section>
