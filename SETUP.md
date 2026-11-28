# Instalação do multiplayer (≈ 10 minutos)

O `index.html` já está completo. Falta só criar as tabelas, publicar a função do servidor e colar **2 valores** no começo do `<script>`.

## 1. Banco de dados
Supabase → **SQL Editor** → New query → cole o conteúdo de `supabase/schema.sql` → **Run**.
(Rode uma vez só. Cria carteira, perfil, salas, assentos, regras de segurança RLS, bucket `avatars`, ranking e funções.)

## 2. Autenticação
Supabase → **Authentication**:
- **Providers → Email**: ligado. Para testar sem confirmar e-mail, desligue **Confirm email**.
- **Sign In / Providers → Allow anonymous sign-ins**: ligue (para o botão "Jogar como convidado").
- **URL Configuration → Site URL**: coloque o endereço onde o jogo ficará hospedado.

## 3. Publicar a função do servidor
No terminal, dentro desta pasta:
```bash
npx supabase login
npx supabase link --project-ref SEU_PROJECT_REF      # o código na URL do painel
npx supabase functions deploy game
```
Não precisa configurar chaves: `SUPABASE_URL` e `SERVICE_ROLE_KEY` já existem dentro das Edge Functions.

## 4. Preencher o index.html
Abra `index.html`, procure `CONFIGURAÇÃO DO SUPABASE` (logo no começo do `<script>`) e troque:
```js
const SUPABASE_URL='COLE_AQUI_A_PROJECT_URL';
const SUPABASE_ANON_KEY='COLE_AQUI_A_ANON_KEY';
```
Os dois valores estão em **Project Settings → API** (Project URL e chave *anon public*). Nunca use a `service_role` aqui.

## 5. Testar
Abra o jogo em duas abas/navegadores → **Salas online** → crie uma conta em cada → uma cria a sala, a outra entra pelo código → o anfitrião toca em **Começar**.
Hospede os arquivos em qualquer site estático (GitHub Pages, Netlify, Vercel…) ou rode `npx serve .`.

## Ajustes
- Moedas iniciais e bônus diário: tabela `app_config` (`starting_coins`, `daily_coins`).
- Tempo por jogada: `TURN_MS` em `supabase/functions/game/engine.ts` (30 s). Depois de 3 jogadas estouradas seguidas, o jogador é retirado e recebe as fichas de volta.
- Simulação do motor: `node --experimental-strip-types supabase/tests/simulate.ts`.

## Regras de moedas
- Entrar: moedas → fichas (buy-in dentro do limite da sala). Sair: fichas → moedas.
- Saiu no meio da mão: corre, o que já apostou fica no pote, o resto volta ao fim da mão.
- Fim da partida (resta um jogador ou só bots): o servidor paga as fichas de todos.
- As fichas dos bots vêm da "casa": ganhar de bots cria moedas novas.
- Quem zera as fichas fica de fora até o fim da partida (não há recompra ainda).
