---
title: Política de Privacidade
description: Saiba como o MarkdownCanDo trata o texto do editor, armazenamento no navegador, dados de análise, serviços externos e pedidos de privacidade.
---

# Política de Privacidade

Última atualização: 29 de agosto de 2026.

Esta política explica como o MarkdownCanDo trata informações quando você usa o site e suas ferramentas de Markdown no navegador.

## Conteúdo do editor

O editor processa no navegador o texto que você digita. O MarkdownCanDo não oferece contas nem armazenamento de documentos na nuvem. Copie e salve seu trabalho antes de fechar ou atualizar a página.

Não insira informações confidenciais ou sensíveis em uma ferramenta online sem avaliar se esse uso é adequado para você ou sua organização.

## Envio de imagens

Quando você escolhe, cola ou arrasta uma imagem para o editor, ela é enviada ao Cloudflare R2 e armazenada temporariamente para aparecer na pré-visualização. O nome original do arquivo não é mantido no endereço do objeto. O site deixa de servir a imagem 24 horas após o envio; a regra de ciclo de vida do R2 pode levar aproximadamente mais 24 horas para remover o objeto subjacente.

Para aplicar limites por visitante e um orçamento de armazenamento móvel sem guardar o endereço IP completo, o serviço mantém um identificador pseudônimo protegido por uma chave secreta e derivado do endereço da conexão e da data UTC, junto com as contagens diárias de arquivos e bytes. O identificador muda todos os dias, não pode ser reproduzido sem a chave do serviço e os registros de cota são apagados automaticamente após cerca de três dias. A Cloudflare também pode processar dados de solicitação e segurança ao fornecer a infraestrutura do site.

Os endereços possuem proteção contra hotlink comum, mas as imagens ainda devem ser tratadas como conteúdo publicamente recuperável, e não como armazenamento privado. Não envie imagens confidenciais, pessoais ou que violem direitos de terceiros.

## Análise de uso

O MarkdownCanDo usa o Google Analytics para entender o uso agregado do site, como páginas visitadas, informações do dispositivo e navegador, localização aproximada e interações. O Google pode processar esses dados conforme seus próprios termos e políticas.

## Armazenamento no navegador

O site pode usar armazenamento local para preferências da interface e recursos do cliente, como tema ou busca. Esses dados podem ser apagados nas configurações do navegador.

## Serviços e links externos

Algumas páginas apontam ou exibem recursos de terceiros, como GitHub e sites de documentação. Esses serviços possuem práticas próprias de privacidade. Ao seguir um link externo, você deixa o MarkdownCanDo.

Esta política pode mudar junto com os recursos do site ou requisitos legais. Para dúvidas, consulte a <a href="/pt/contact">página de contato</a>. Veja também os <a href="/pt/terms">termos de uso</a> e a página <a href="/pt/about">sobre o projeto</a>.
