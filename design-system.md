# Design System — Texas Hold’em

**Origem:** o ícone do app (cartas A♠ K♥ sobre fichas vermelhas, fundo roxo, título “Texas” branco e “Hold’em” amarelo). Tudo no jogo segue essa peça: roxo vibrante, contornos grossos azul-marinho, amarelo-ouro como destaque, vermelho das fichas, cartas creme.

**Princípios:** divertido, tátil, legível. Contorno grosso escuro em tudo que é peça, sombra “dura” (sem blur), cantos arredondados, movimento com quique. Nada de informação extra na mesa: só o essencial.

## 1. Marca
- **Nome:** Texas Hold’em (curto: Hold’em).
- **Logo:** o ícone do app (embutido nos arquivos). Aparece inteiro na tela inicial, com as bordas esmaecidas no fundo roxo. Dentro do jogo, o topo só tem o botão Menu, sem ícone nem título.
- **Fonte do título:** a do ícone, letras grossas e arredondadas. Usamos **Baloo 2 ExtraBold (800)**, com contorno `--ink` (stroke atrás do preenchimento), nos títulos das telas (Nova partida, Opções etc.).
- **Fonte de interface:** **Fredoka** 500/600/700. Fallback: `'Trebuchet MS', system-ui, sans-serif`.

## 2. Cores
| Token | HEX | Uso |
|---|---|---|
| `--ink` | `#1B0B3F` | Contornos (3–4 px) e sombra dura |
| `--grape` | `#4B0A92` | Fundo do app |
| roxo brilho | `#8A14DB` | Centro do gradiente de fundo e da tela inicial |
| roxo tema | `#5A0FA6` | `theme-color` do navegador |
| `--sun` | `#FFD60A` | Destaque: botão primário, raise, vez de jogar, dealer |
| `--cream` | `#FBF7F2` | Cartas, pílulas de jogador, modais, caixa de valor |
| vermelho ficha | `#E8182D` | Verso das cartas, all-in |
| naipes | ♠♣ `#2B2250` · ♥♦ `#FF3B5C` (4 cores: ♦ `#2F8CFF`, ♣ `#19B36B`) | Cartas |

**Feltro (3 temas):** Menta `#22D18B → #0E9F68` · Oceano `#35B8F5 → #1C7FD0` · Uva `#C77DFF → #8A3FD8`. Borda da mesa em ouro `#FFC21A`, com bolinhas brancas a 14% como textura.

**Ações:** Correr `#8E9BFF` · Mesa/Cobrir `#2EE59D` · Apostar/Aumentar `#FFD60A` · All-in `#E8182D` (texto branco).

**Fichas:** 1 `#FFFFFF` · 5 `#F03A47` · 25 `#22C55E` · 100 `#3B82F6` · 500 `#A855F7` · 1000 `#FFD60A`.

## 3. Mesa
- **Formato:** estádio (cantos totalmente arredondados), desenhado como fundo separado; os jogadores ficam sobre a borda, nunca cortados.
- **Board:** 5 espaços tracejados fixos, centralizados na mesa. Flop em cima (3), turn e river embaixo (2), com os rótulos FLOP, TURN e RIVER. Cartas de 40 px.
- **Pote:** texto `POTE: 90` acima do board (branco, 20 px, peso 600, sombra leve). Fichas empilhadas abaixo do board, uma coluna por valor, no máximo 8 por coluna.
- **Ficha:** borda com listras brancas, miolo da cor da ficha com anel branco e o valor, lateral escura que dá espessura. Pote 24 px; fichas de aposta 16 px.

## 4. Jogadores
- **Perfil (igual em todas as posições):** pílula horizontal creme, foto/emoji à esquerda (42 px, contorno 3 px) e à direita nome (14 px) e fichas (17 px, verde `#0B7A4E`). Altura ≈ 52 px.
- **Selos:** círculos de 27 px no canto inferior da foto: **SB** roxo-claro `#8E9BFF`, **BB** amarelo `#FFD60A`, **D** amarelo com contorno. Heads-up pode mostrar SB e D juntos.
- **Cartas:** as suas ao lado do perfil (46 px); as dos bots saindo por trás do perfil (26 px).
- **Aposta da rodada:** fichas pequenas com o valor, do lado do perfil voltado para o centro. Estado: “pensando…”, “Cobriu 20”, “Mesa”, “Correu”, “Aumentou 120”.
- **Vez de jogar:** anel amarelo ao redor da pílula. **Desistiu:** perfil cinza dessaturado.

## 5. Controles de aposta
Sempre visíveis na sua vez, como nos apps de poker brasileiros:
1. Linha: **−** · slider · **+** · caixa **V$ +40** (editável; mostra quanto você coloca agora).
2. Botões: **Correr** · **Mesa** (ou **Cobrir +20**) · **Apostar/Aumentar +40**.
3. Com o slider no máximo, o botão vira **All-in +1.000** (vermelho). Não há atalhos de pote.
O botão de aposta mostra sempre o valor que será colocado, e muda enquanto o slider se move.

## 6. Forma e movimento
- Contorno `3px solid var(--ink)` (cartas 2.5 px, modais 4 px). Sombra dura `0 4px 0 var(--ink)`.
- Raios: botão 14–16 · pílula 99 · mensagem 22 · modal 26 · carta 11%.
- Botão pressionado: desce 3 px, escala .97.
- Carta sai do baralho girando e assenta com balanço (450 ms). Flip com overshoot (500 ms).
- Fichas voam do perfil para a aposta, da aposta para o pote e do pote para quem ganhou. Fichas novas caem na pilha do pote com quique.
- Mensagem de fim de mão: balão creme na base da tela, com “Próxima mão”.
- `prefers-reduced-motion` encurta as animações de carta e desliga o voo das fichas.

## 7. PWA
- `manifest.webmanifest`: nome “Texas Hold’em”, `display: standalone`, `orientation: portrait`, fundo `#4B0A92`, tema `#5A0FA6`.
- Ícones embutidos nos arquivos (sem pasta de imagens): no `manifest.webmanifest` ficam 192, 512 e uma versão maskable de 512 (logo a 82% com bordas esmaecidas, para recortes circulares); no `index.html` ficam o `apple-touch-icon` (180) e o favicon (48). A logo da tela inicial também está embutida.
- `sw.js`: guarda o app na primeira visita e abre offline. Atualiza em segundo plano; para forçar nova versão, troque `holdem-v1` por `holdem-v2`. As fontes do Google também ficam em cache.
- Precisa ser servido por **HTTPS** (ou `localhost`). Abrir o `index.html` direto do arquivo funciona como jogo, mas não instala.

## 8. Checklist
Contorno `--ink` em toda peça · sombra dura, sem blur · um só formato de perfil · naipe identificável sem cor (símbolo + índice) · alvos ≥ 44 px · texto ≥ 4,5:1 de contraste · títulos de tela em Baloo 2 800 com contorno · amarelo só para o que é destaque.
