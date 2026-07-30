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
- **Atalhos de teclado** — `Enter` copia o resultado, `Esc` limpa o campo
- **Histórico** das últimas 20 conversões, salvo no navegador (localStorage)
- **Formatação automática** — entrada `3:5` é exibida como `03:05`
- **Validação estrita** — recusa entradas como `3:9x` ou `225abc`, com mensagem de erro clara
- **Responsivo** — funciona em desktop, tablet e celular

## Como usar

Acesse a aplicação online — sem instalação, direto no navegador:

<div align="center">

### [Acessar o TimeConvert](https://gabrielmendessdev.github.io/TimeConvert/)

</div>

Ou, se preferir rodar localmente:

1. Clone o repositório:
   ```bash
   git clone https://github.com/GabrielMendessDev/TimeConvert.git
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

Interface com estética tech/HUD, construída só com CSS — sem imagens externas nem bibliotecas:

- Tema escuro profundo com gradiente ciano → índigo → roxo
- Fundo em camadas: malha em grid com fade radial, orbs de luz em movimento, linha de varredura e ruído sutil (SVG inline)
- Cards em glassmorphism (`backdrop-filter`) com borda de gradiente rotativo animado
- Painel de resultado em estilo HUD, com cantos em bracket e varredura interna
- Seletor de modo com indicador deslizante
- Fonte monospace nos valores, micro-labels em caixa alta com tracking largo
- Histórico numerado (`01`, `02`, ...) via contador CSS
- Respeita `prefers-reduced-motion`

## Autor

Feito por **Gabriel Mendes**

[Instagram](https://www.instagram.com/gabrielmenndess/) &middot; [LinkedIn](https://www.linkedin.com/in/gabriel-mendes-bb5571264/) &middot; [GitHub](https://github.com/GabrielMendessDev)

## Licença

Este projeto está sob a licença [MIT](LICENSE).
