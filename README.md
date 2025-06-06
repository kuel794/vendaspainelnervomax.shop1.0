# NERVOMAX Dashboard

Dashboard de vendas e desempenho integrado com Google Sheets para sincronização automática de dados.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visualização completa de vendas, lucros e métricas
- **Gráficos Avançados**: Linha, barras e pizza com dados em tempo real
- **Integração Google Sheets**: Sincronização automática de dados
- **Multi-usuário**: Cada usuário tem seus próprios dados
- **Responsivo**: Funciona em desktop e mobile
- **Tema Escuro/Claro**: Interface adaptável

## 📊 Integração com Google Sheets

O sistema sincroniza automaticamente com uma planilha do Google Sheets:

### Aba "Usuários"
- ID_Usuario (email)
- Email
- Nome
- Data_Cadastro
- Outras_Infos

### Aba "Dados Diários de Vendas"
- ID_Usuario
- Data
- Vendas_Realizadas
- Investimento
- Vendas_Agendadas
- Lucro_Liquido
- Margem_Lucro
- Vendas_Pagas
- Remarketing
- Primeiro_Contato
- Outras_Metricas_Diarias

## ⚙️ Configuração

### 1. Configurar Google Sheets API

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google Sheets
4. Crie credenciais (API Key)
5. Copie a chave da API

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`
2. Adicione sua chave da API do Google Sheets:

```env
VITE_GOOGLE_SHEETS_API_KEY=sua_chave_da_api_aqui
```

### 3. Configurar Planilha

1. Acesse a planilha: [NERVOMAX Dashboard](https://docs.google.com/spreadsheets/d/1QYsmTW8YyUgXDM7UO_ntp5coBabqLLEk747ac8hA4z0/edit)
2. Certifique-se de que tem permissão de edição
3. Verifique se as abas "Usuários" e "Dados Diários de Vendas" existem

## 🛠️ Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📱 Como Usar

1. **Registro**: Crie uma conta com seu email
2. **Login**: Acesse com suas credenciais
3. **Dashboard**: Visualize seus dados de vendas
4. **Edição**: Clique nos dados da tabela para editar
5. **Sincronização**: Dados são salvos automaticamente na planilha

## 🔧 Tecnologias

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Gráficos**: Recharts
- **Integração**: Google Sheets API
- **Estado**: Context API + Local Storage

## 📈 Métricas Disponíveis

- Receita Total
- Lucro Líquido
- Investimento
- Vendas Agendadas (R$)
- Lucro Projetado
- Margem de Lucro
- Vendas Pagas
- Remarketing
- Primeiro Contato

## 🔒 Segurança

- Dados isolados por usuário
- API Key protegida por variáveis de ambiente
- Validação de dados no frontend
- Sincronização segura com Google Sheets

## 📞 Suporte

Para dúvidas ou problemas, verifique:
1. Se a API Key está configurada corretamente
2. Se a planilha tem as permissões necessárias
3. Se as abas da planilha estão nomeadas corretamente
4. O status de conexão no dashboard