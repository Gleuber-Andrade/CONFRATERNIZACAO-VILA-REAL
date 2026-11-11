# Confraternização Vila Real Futsal – formulário de confirmação

Página de confirmação de presença (GitHub Pages) que grava cada resposta numa planilha do Google.

## 1. Criar a planilha e o script (uma vez só)

1. Crie uma planilha nova no Google Sheets, por exemplo "Confraternização Vila Real 2026".
2. Menu **Extensões → Apps Script**.
3. Apague o conteúdo do editor, cole todo o arquivo `Code.gs` e salve.
4. Clique em **Implantar → Nova implantação**.
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize o acesso quando o Google pedir. Se aparecer o aviso "app não verificado", clique em **Avançado → Acessar (não seguro)**. O script é seu.
6. Copie a **URL do App da Web** (termina em `/exec`).

## 2. Colocar a URL na página

Abra o `index.html`, procure a linha:

```js
const SCRIPT_URL = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';
```

e troque pelo endereço copiado, mantendo as aspas.

## 3. Publicar no GitHub Pages

1. No GitHub, crie um repositório público, por exemplo `confraternizacao-vila-real`.
2. **Add file → Upload files** e envie o `index.html` (pode enviar este LEIA-ME também; o `Code.gs` não precisa).
3. **Settings → Pages**: em "Branch", escolha `main` e pasta `/ (root)`, depois **Save**.
4. Depois de 1 ou 2 minutos o link fica pronto:
   `https://gleuber-andrade.github.io/confraternizacao-vila-real/`

Esse é o link para mandar aos pais.

## 4. A lista de confirmações

Cada envio cria uma linha na aba **Confirmações** da planilha:

| Data/hora | Responsáveis | Alunos | Presença | Qtd. adultos | Valor PIX (R$) | PIX recebido? |

- O valor é calculado pelo script (R$ 30 por adulto), não pela página.
- A coluna **PIX recebido?** começa como "Não". Troque para "Sim" quando o comprovante chegar.
- Para ver os totais, use filtros ou fórmulas como `=SOMA(E:E)` (adultos) e `=SOMA(F:F)` (valor).

## Teste

Antes de divulgar, faça uma confirmação de teste pelo link e veja se a linha apareceu na planilha. Depois apague essa linha.

## Se mudar o script

Depois de editar o `Code.gs`, use **Implantar → Gerenciar implantações → Editar (lápis) → Versão: Nova versão → Implantar**. Assim a URL continua a mesma.
