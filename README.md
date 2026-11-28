# Texas Hold’em

Jogo de poker **Texas Hold’em** para celular, em um único arquivo HTML, que funciona offline e pode ser instalado como app (PWA). Você joga contra bots, com visual cartunesco inspirado no ícone do app.

## Como jogar

1. Abra o `index.html` no navegador (ou instale o app, veja abaixo).
2. Toque em **Jogar**, escolha a mesa e toque em **Começar partida**.
3. Na sua vez, use os botões:
   - **Correr**: sai da mão.
   - **Mesa**: segue sem apostar (quando não há nada a pagar).
   - **Cobrir +X**: iguala a aposta.
   - **Apostar / Aumentar +X**: arraste o slider, use **−** e **+** ou digite o valor na caixa **V$**. O botão mostra quanto você coloca. Com o slider no máximo, ele vira **All-in**.
4. Vence a melhor combinação de 5 cartas entre as suas 2 e as 5 da mesa. A tela **Como jogar** (no menu) resume as regras e a ordem das mãos.

### Configurações

- **Nova partida:** de 1 a 3 bots, fichas iniciais (500, 1.000 ou 2.000), blinds (10/20, 25/50 ou 50/100) e dificuldade dos bots (Fácil, Normal ou Difícil).
- **Opções:** volume e som, velocidade do jogo (1× ou 2×), baralho de 2 ou 4 cores, cor do feltro (Menta, Oceano ou Uva) e dicas do tutorial.
- O modo multijogador ainda não existe (aparece como “em breve”).

## Rodar e instalar

Para jogar, basta abrir o `index.html`. Para **instalar como app**, o arquivo precisa estar em **HTTPS** (ou em `localhost`):

- Hospede esta pasta em qualquer serviço estático (GitHub Pages, Netlify, Cloudflare Pages etc.).
- Teste local: `python3 -m http.server 8000` dentro da pasta e abra `http://localhost:8000`.
- No celular, abra o endereço e use **Instalar app** / **Adicionar à tela inicial**.

Depois da primeira visita online o jogo abre sem internet. A fonte do título (Baloo 2) e a de interface (Fredoka) vêm do Google Fonts e também ficam guardadas; sem elas o jogo usa uma fonte parecida.

## Estrutura

```
index.html              o jogo inteiro, com detalhes de Natal (HTML, CSS e JavaScript)
index.txt               cópia do index.html original (sem o tema de Natal)
manifest.webmanifest    dados do PWA (nome, cores e ícones embutidos)
sw.js                   service worker (cache e modo offline)
design-system.md        design system: cores, tipografia, componentes e movimento
LICENSE                 licença
supabase/schema.sql     banco de dados completo (um único SQL)
supabase/functions/game motor do jogo (Edge Function)
```

## Atualizar uma versão publicada

O `sw.js` guarda o app em cache. Depois de mudar o `index.html`, troque o nome do cache (`holdem-v1` para `holdem-v2`, e assim por diante) para os aparelhos pegarem a versão nova.

## Design

As cores, a fonte do título, os componentes e as animações estão descritos em [`design-system.md`](design-system.md). O visual segue o ícone do app: roxo vibrante, contornos azul-marinho grossos, amarelo de destaque e vermelho das fichas.

## Créditos

Criado por **[Lucas Ravelli](https://github.com/lucasravelli)**.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [`LICENSE`](LICENSE).

## Multiplayer online (v1.0)

Salas online com moedas, usando **Supabase** (Auth + Postgres + Realtime + Edge Functions).
O servidor decide tudo: baralho, cartas ocultas, validação das jogadas, potes e carteira.

- **Moedas:** bônus inicial ao criar a conta + bônus diário (valores em `app_config`).
  Ao entrar numa sala o jogador troca moedas por fichas (buy-in); ao sair, as fichas voltam como moedas.
- **Salas:** o anfitrião cria a sala, os amigos entram pelo código; ao começar, as vagas vazias são preenchidas por bots.
- **Estrutura:** `supabase/schema.sql` (banco, perfil, ranking e RLS, tudo em um só arquivo), `supabase/functions/game/` (motor e Edge Function),
  `supabase/tests/simulate.ts` (simulação de 300 partidas conferindo que nenhuma ficha some ou aparece).

Passo a passo de instalação em **[SETUP.md](SETUP.md)**. O modo offline (contra bots) continua funcionando sem Supabase.
