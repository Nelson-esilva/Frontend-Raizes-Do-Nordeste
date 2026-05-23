# Raízes do Nordeste — Front-end

Interface responsiva (mobile-first) para pedidos e fidelização da Rede Raízes do Nordeste.

Uma única aplicação adapta-se a **app** e **web** por meio de breakpoints. Para documentar multicanalidade, use prints do DevTools (ex.: 375px, 768px, 1280px).

## Rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

## Demo

- E-mail: `cliente@email.com`
- Senha: `Senha@123`
- Cupom: `NORDESTE10`

## Fluxo principal

1. **Cadastro** (`/cadastro`) ou **login** (`/login`)
2. Escolher **unidade** → **cardápio** → **carrinho** → **checkout**
3. Acompanhar pedido e pontos em **perfil** e **fidelidade**

## Sugestão de prints (multicanalidade)

| Canal   | Largura no DevTools | Tela sugerida      |
|---------|---------------------|--------------------|
| App     | 375px (iPhone)      | Home, login, cardápio |
| Tablet  | 768px               | Cardápio, carrinho |
| Web     | 1280px              | Home, cardápio     |

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — produção (`dist/`)
- `npm run preview` — testar build

## Deploy

GitHub (público) + Vercel: framework Vite, build `npm run build`, output `dist`.

## Estrutura

```
src/
  layouts/AppLayout.tsx   layout único responsivo
  pages/mobile/           telas do fluxo
  components/             UI reutilizável
  context/                sessão, unidade, carrinho
  mocks/                  dados simulados
  services/               regras mock (auth, pedido, pagamento)
```

Rotas antigas `/app/*` e `/web/*` redirecionam automaticamente para a rota equivalente na raiz.
