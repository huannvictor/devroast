# Code Editor Component Specification

## Context
Refatoração do componente "Code Editor" na home page (`@devroast/src/app/page.tsx`). O objetivo é substituir o `<textarea>` atual por um editor de código com syntax highlighting que:
- Identifica automaticamente a linguagem do código
- Permite ao usuário alterar a linguagem manualmente
- Renderiza o código com highlighting apropriado
- Mantém o visual e comportamento consistentes com o design existente

## Pesquisa de Soluções

### 1. Solução Baseada em Shiki (Raycast ray.so)
**Descrição**: Implementação customizada semelhante ao editor usado no [ray.so](https://ray.so) da Raycast, que utiliza a biblioteca Shiki para syntax highlighting em uma camada de exibição, mantendo um textarea oculto para a edição real.

**Prós**:
- Já é uma dependência do projeto (`shiki`: "^4.0.2")
- Alta performance e qualidade de highlighting
- Suporte extensivo a linguagens e temas
- Integração bem-sucedida com Tailwind CSS (como visto no ray.so)
- Permite controle total sobre UI e comportamento
- Funcionalidades avançadas como line highlighting, line numbers, etc.
- Abordagem comprovada e utilizada em produção

**Contras**:
- Requer desenvolvimento de componente customizado com duas camadas (edição e exibição)
- Necessita sincronização entre textarea de edição e div de highlighting
- Mais complexo que um simples textarea, mas menos complexo que editores completos

**Exemplo de Implementação (como no ray.so)**:
- Textarea oculto para captura real de input do usuário
- Div visível que recebe o HTML destacado do Shiki
- Ambos elementos posicionados exatamente um sobre o outro
- Estado gerenciado com React useState
- Controles para seleção de linguagem e tema
- Uso de `getSingletonHighlighter` ou `getHighlighterCore` do Shiki para performance

### 2. Monaco Editor (@monaco-editor/react)
**Descrição**: Wrapper React para o editor usado no VS Code.

**Prós**:
- Experiência de editor completa (autocomplete, linting, etc.)
- Altamente customizável
- Bom suporte a linguagens
- Mature e amplamente adotado

**Contras**:
- Bundle size grande (~MB)
- Pode ser overkill para um editor simples de colagem
- Menor integração com Tailwind CSS
- Adiciona nova dependência significativa

### 3. CodeMirror 6 (@uiw/react-codemirror ou @codemirror/react)
**Descrição**: Sistema de editor modular e moderno.

**Prós**:
- Bundle size menor que Monaco
- API moderna e flexível
- Boa performance
- Suporte a extensões
- Integração razoável com CSS

**Contras**:
- Requer aprendizado de nova API
- Ainda adiciona dependência significativa
- Menos características "out-of-the-box" que Monaco

### 4. Prism.js + react-syntax-highlighter
**Descrição**: Solução de highlighting estático com possibilidade de tornar editável.

**Prós**:
- Bundle size pequeno
- Simples de implementar para highlighting básico
- Boa documentação

**Contras**:
- Não é um editor verdadeiro (precisaria combinar com contenteditable ou simili)
- Limitações em recursos avançados de editor
- Highlighting menos preciso que Shiki/Monaco

### 5. Highlight.js + react-highlight.js
**Descrição**: Similar ao Prism.js, outra opção de highlighting estático.

**Prós**:
- Bundle size razoável
- Suporte a muitas linguagens

**Contras**:
- Mesmas limitações do Prism.js para edição
- Menos ativo que Prism.js atualmente

## Recomendação

**Solução Recomendada**: Implementação customizada baseada em Shiki (similar ao ray.so) com duas camadas

**Justificativa**:
1. **Integração existente**: O projeto já depende do Shiki, evitando adicionar novas dependências pesadas
2. **Performance**: Shiki é conhecido por excelente performance e qualidade de highlighting
3. **Flexibilidade**: Permite criar um editor que se encaixe perfeitamente no visual existente do Devroast
4. **Controle total**: Possibilidade de implementar exatamente os recursos necessários (sem excesso)
5. **Consistência visual**: Mais fácil de alinhar com o design system existente usando Tailwind CSS
6. **Experiência do usuário**: Pode manter a simplicidade do textarea atual enquanto adiciona highlighting
7. **Abordagem comprovada**: Usada com sucesso no ray.so da Raycast

Esta abordagem também aproveita o investimento existente na dependência Shiki e segue o padrão de componentes customizados já estabelecido no projeto (como visto em `src/components/ui/code-block.tsx`).

## Especificação Técnica

### Componentes Necessários
1. **CodeEditor.tsx** - Componente principal do editor (com duas camadas: edição e exibição)
2. **LanguageSelector.tsx** - Controle para seleção de linguagem (reutilizar ou adaptar existente)
3. Possivelmente: **ThemeSelector.tsx** - Se quiser permitir alteração de tema

### Funcionalidades do CodeEditor
- **Dupla camada**: Textarea oculto para edição + div visível para highlighting
- Área de edição de código (textarea sintética oculto que captura input real)
- Syntax highlighting em tempo real usando Shiki na camada de exibição
- Detecção automática de linguagem (opcional)
- Seletor de linguagem manual
- Números de linha (opcional, conforme design)
- Suporte a temas claro/escuro
- Integração com estado global da aplicação (se necessário)
- Manter compatibilidade com o estado existente `code` e `isRoastMode`

### Integração com Shiki
- Utilizar `getSingletonHighlighter` ou `getHighlighterCore` para performance
- Carregar linguagens dinamicamente conforme necessário
- Usar tema compatível com o design Devroast (possivelmente adaptar tema "vesper" ou criar custom)
- Implementar caching adequado para evitar reprocessamento desnecessário
- Atualizar a camada de exibição sempre que o texto no textarea mudar

### Considerações de Design
- Manter o visual atual do container de código (borda, header com dots, etc.)
- Posicionar exatamente a textarea de edição sobre a div de highlighting (ou vice-versa)
- Preservar o comportamento do placeholder e estilos de foco
- Garantir responsividade e acesso adequado em dispositivos móveis
- Seguir os padrões de componentes UI estabelecidos (tailwind-variants, tv function)
- Acessibilidade: labels adequados, navegação por teclado, contraste de cores
- Garantir que a experiência de edição seja idêntica à de um textarea normal

### Dependências
- Nenhuma nova dependência necessária (Shiki já está instalado)
- Pode considerar `@shikijs/twoslash` se quiser recursos adicionais (já instalado)

## To-Dos para Implementação

### Fase 1: Pesquisa e Planejamento
- [x] Avaliar soluções disponíveis para editor de código com syntax highlighting
- [x] Analisar implementação existente de code-block.tsx no projeto
- [x] Investigar como o ray.so implementa seu editor (dupla camada)
- [ ] Definir requisitos específicos para o caso de uso do Devroast
- [ ] Criar protótipo visual baseado no design existente

### Fase 2: Arquitetura do Componente
- [ ] Criar estrutura básica do CodeEditor.tsx seguindo padrão de UI components
- [ ] Implementar padrão de dupla camada (textarea oculto + div de highlighting)
- [ ] Definir interface de props (value, onChange, language, etc.)
- [ ] Implementar gerenciamento de estado local para código e linguagem
- [ ] Integrar com Shiki para highlighting em tempo real na camada de exibição
- [ ] Criar componente LanguageSelector se necessário

### Fase 3: Integração e Estilização
- [ ] Adaptar visual para corresponder ao design existente do container de código
- [ ] Implementar detecção automática de linguagem (opcional)
- [ ] Garantir compatibilidade com temas claro/escuro do Tailwind
- [ ] Ajustar espaçamento, tipografia e cores conforme devroast.pen
- [ ] Implementar números de linha se fizer parte do design
- [ ] Garantir posicionamento exato entre as duas camadas de edição e exibição

### Fase 4: Experiência do Usuário
- [ ] Implementar comportamento de tabulação e identação
- [ ] Adicionar suporte a atalhos de teclado comuns (se relevantes)
- [ ] Garantir funcionamento adequado em diferentes navegadores
- [ ] Testar com amostras de código em várias linguagens
- [ ] Validar acessibilidade (contraste, navegação por teclado, labels)
- [ ] Verificar que a experiência de edição seja idêntica à de um textarea normal

### Fase 5: Integração com Página Inicial
- [ ] Substituir textarea atual pelo CodeEditor em src/app/page.tsx
- [ ] Adaptar lógica de estado existente (hook useState para code)
- [ ] Garantir que o botão de submission continue funcionando
- [ ] Testar fluxo completo: colagem de código → highlighting → submission
- [ ] Verificar compatibilidade com modo "roast" existente

### Fase 6: Qualidade e Revisão
- [ ] Executar linting e type checking
- [ ] Verificar desempenho com códigos grandes
- [ ] Testar em diferentes tamanhos de tela
- [ ] Revisar consistência com padrões de componentes UI
- [ ] Documentar uso e API do novo componente

## Perguntas para Esclarecimento
1. O editor deve suportar apenas as linguagens atualmente usadas nos exemplos do leaderboard ou ser mais geral?
2. Há preferência por detecção automática de linguagem ou seleção manual explícita?
3. O editor deve incluir recursos como números de linha, highlight de linha ativa, ou dobramento de código?
4. Há restrições específicas de bundle size que devemos considerar?
5. O editor deve ser apenas para visualização com highlighting ou precisa ser totalmente editável com todos os recursos de um editor de código?

## Respostas
1. O editor deve suportar apenas as linguagens atualmente usadas nos exemplos do leaderboard
2. os dois. Assim que o usuário cola o código no componente a linguagem é detectada, mas tem algum recurso pra mudar caso o usuário deseje, como um select
3. sim para todas as opções
4. não sei responder a esta pergunta
5. Meio termo. Nem apenas para visualização, mas com algumas funcionalidades de um editor, como alterar o texto, copiar, colar etc.