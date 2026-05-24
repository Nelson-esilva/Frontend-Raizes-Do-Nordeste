# Raízes do Nordeste — Front-end

Interface para pedidos e fidelização da Rede Raízes do Nordeste (projeto acadêmico Front-End).

## Canais

Na abertura, escolha o canal:

- **APP MOBILE / WEB** — login, fidelidade, promoções, fluxo completo
- **TOTEM** — autoatendimento na loja, botões amplos, login opcional

Use **Canal** no header para voltar à seleção.

## Rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Demo

| Perfil | Credenciais |
|--------|-------------|
| Cliente | `cliente@email.com` / `Senha@123` |
| Gerente (RF13) | `gerente@raizes.com` / `Gerente@123` |
| Cupom | `NORDESTE10` |

## Fluxo principal

1. Escolher canal em `/`
2. **Cadastro** ou **login** (opcional no totem)
3. **Unidade** → **cardápio** → **carrinho** → **checkout**
4. Status em `/pedido/:id` · pontos em **fidelidade** e **perfil**

## Prints (multicanalidade no trabalho)

| Canal | Largura DevTools | Tela |
|-------|------------------|------|
| App / Web | 375px, 1280px | Início, cardápio, checkout |
| Totem | 1024px paisagem | Seleção totem, unidades, cardápio |

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — produção (`dist/`)
- `npm run preview` — testar build

## Deploy

Repositório Git público + Vercel (Vite, build `npm run build`, output `dist`).
