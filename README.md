# TimeConvert

Conversor de tempo moderno e minimalista, feito com HTML, CSS e JavaScript puro — sem frameworks, sem dependências.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Sobre

O TimeConvert nasceu de uma necessidade real do dia a dia. Trabalhando com páginas de vendas, eu preciso constantemente converter os timestamps de pitch de VSLs (Video Sales Letters) da VTurb para valores em segundos, que são usados como delay no código das páginas — por exemplo, para controlar quando um botão de CTA aparece, quando um elemento é revelado ou quando uma oferta é liberada.

Fazer essa conversão manualmente toda vez (abrir calculadora, multiplicar minutos por 60, somar os segundos...) era repetitivo e tomava tempo. O TimeConvert resolve isso: basta digitar o timestamp e o valor convertido aparece na hora, pronto para copiar e colar direto no código.

A conversão acontece em tempo real enquanto você digita, sem necessidade de recarregar a página ou clicar em botões.

## Funcionalidades

- **2 modos de conversão**
  - `min → segundos` (ex: 3:45 → 225)
  - `segundos → min` (ex: 225 → 03:45)

- **Conversão em tempo real** — o resultado atualiza enquanto você digita
- **Copiar resultado** com um clique e feedback visual
- **Histórico** das últimas 20 conversões, salvo no navegador (localStorage)
- **Formatação automática** — entrada `3:5` é exibida como `03:05`
- **Validação de entrada** com mensagens de erro claras
- **Responsivo** — funciona em desktop, tablet e celular

## Como usar

Acesse a aplicação online — sem instalação, direto no navegador:

<div align="center">

### [Acessar o TimeConvert](https://gabrielmendessdev.github.io/TimeConvert/)

</div>

Ou, se preferir rodar localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielMendessDev/TimeConvvert.git
   ```
2. Abra o arquivo `index.html` no navegador.

Não precisa de servidor, instalação ou build.

## Estrutura do projeto

```
├── index.html   # Estrutura da página
├── style.css    # Estilos e tema escuro
├── script.js    # Lógica de conversão e interatividade
└── README.md
```

## Tecnologias

- **HTML5** — estrutura semântica
- **CSS3** — variáveis CSS, grid, flexbox, gradientes, animações
- **JavaScript (ES6+)** — Clipboard API, localStorage, template literals

## Layout

- Tema escuro com detalhes em azul e roxo
- Fonte monospace para valores numéricos
- Bordas arredondadas e sombras suaves
- Animações em hover, foco e inserção de itens no histórico
- Fundo com gradientes radiais sutis

## Licença

Este projeto está sob a licença [MIT](LICENSE).
