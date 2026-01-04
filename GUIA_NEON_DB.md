# Guia: Configurando Neon DB no Projeto Aparatus

Este guia explica como migrar de um banco de dados PostgreSQL local (Docker) para o Neon DB, um serviço de PostgreSQL serverless na nuvem.

## O que é Neon DB?

O Neon DB é um serviço de PostgreSQL serverless que oferece:
- Banco de dados gerenciado na nuvem
- Escalabilidade automática
- Backups automáticos
- Interface web para gerenciamento
- Plano gratuito generoso para desenvolvimento

## Passo 1: Criar Conta no Neon DB

1. Acesse [https://neon.tech](https://neon.tech)
2. Clique em "Sign Up" e crie uma conta (pode usar GitHub, Google, etc.)
3. Faça login na plataforma

## Passo 2: Criar um Novo Projeto

1. No dashboard do Neon, clique em **"Create Project"**
2. Configure o projeto:
   - **Project name**: `aparatus` (ou o nome que preferir)
   - **Region**: Escolha a região mais próxima (ex: `us-east-1`, `sa-east-1` para Brasil)
   - **PostgreSQL version**: Selecione `15` (para manter compatibilidade com seu docker-compose)
3. Clique em **"Create Project"******

## Passo 3: Obter a String de Conexão

Após criar o projeto, você verá a string de conexão na tela. Ela terá o formato:

```
postgres://usuario:senha@host.neon.tech/nome_do_banco?sslmode=require
```

**Importante**: O Neon DB fornece duas strings de conexão:
- **Connection string**: Para uso geral (não pooling)
- **Pooled connection string**: Para uso com Prisma (recomendado)

Para o Prisma, use a **Pooled connection string** que geralmente contém `pooler.neon.tech` no host.

## Passo 4: Configurar o Arquivo .env

1. Crie um arquivo `.env` na raiz do projeto (se ainda não existir)
2. Adicione a variável `DATABASE_URL` com a string de conexão do Neon:

```env
DATABASE_URL="postgres://usuario:senha@host.pooler.neon.tech/nome_do_banco?sslmode=require"
```

**Exemplo real:**
```env
DATABASE_URL="postgres://aparatus_owner:senha123@ep-cool-darkness-123456.pooler.us-east-1.aws.neon.tech/aparatus?sslmode=require"
```

## Passo 5: Atualizar o schema.prisma (Opcional)

O arquivo `prisma/schema.prisma` já está configurado corretamente para PostgreSQL. Se necessário, você pode adicionar a URL diretamente no schema (mas é melhor usar variável de ambiente):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Nota**: Seu schema já está correto, não precisa alterar nada!

## Passo 6: Executar as Migrações

Agora você precisa criar as tabelas no banco remoto:

1. **Gerar o Prisma Client:**
```bash
npx prisma generate
```

2. **Executar as migrações:**
```bash
npx prisma migrate deploy
```

Ou, se você ainda não tem migrações criadas:
```bash
npx prisma migrate dev --name init
```

3. **Popular o banco (opcional):**
```bash
npx prisma db seed
```

## Passo 7: Verificar a Conexão

Você pode verificar se a conexão está funcionando de algumas formas:

### Opção 1: Via Prisma Studio
```bash
npx prisma studio
```
Isso abrirá uma interface web onde você pode visualizar e editar os dados.

### Opção 2: Via código de teste
Crie um arquivo temporário para testar:

```typescript
// test-connection.ts
import { prisma } from './lib/prisma'

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Conexão com Neon DB estabelecida com sucesso!')
    
    // Teste uma query simples
    const count = await prisma.barbershop.count()
    console.log(`📊 Total de barbershops: ${count}`)
    
    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Erro ao conectar:', error)
  }
}

testConnection()
```

Execute:
```bash
npx tsx test-connection.ts
```

## Passo 8: Atualizar Variáveis de Ambiente por Ambiente

### Desenvolvimento Local
No arquivo `.env`:
```env
DATABASE_URL="sua-string-de-conexao-neon"
```

### Produção (Vercel, Netlify, etc.)
Configure a variável `DATABASE_URL` nas configurações de ambiente da sua plataforma de deploy.

## Diferenças entre Docker Local e Neon DB

| Aspecto | Docker Local | Neon DB |
|---------|-------------|---------|
| **Acesso** | `localhost:5432` | URL remota via internet |
| **SSL** | Não necessário | Obrigatório (`sslmode=require`) |
| **Pooling** | Não necessário | Recomendado usar pooled connection |
| **Backup** | Manual | Automático |
| **Escalabilidade** | Limitada | Automática |

## Troubleshooting

### Erro: "SSL connection required"
- Certifique-se de que a string de conexão inclui `?sslmode=require`
- Use a **pooled connection string** do Neon

### Erro: "Connection timeout"
- Verifique se o firewall não está bloqueando a conexão
- Confirme que está usando a região correta do Neon

### Erro: "Database does not exist"
- O Neon cria o banco automaticamente, mas verifique o nome na string de conexão
- Certifique-se de que está usando a string de conexão correta do projeto

## Próximos Passos

1. ✅ Configure o `.env` com a string de conexão do Neon
2. ✅ Execute as migrações
3. ✅ Teste a conexão
4. ✅ Configure variáveis de ambiente na plataforma de deploy (se aplicável)
5. ✅ Considere remover ou comentar o `docker-compose.yaml` se não for mais usar localmente

## Recursos Adicionais

- [Documentação do Neon DB](https://neon.tech/docs)
- [Prisma com Neon DB](https://neon.tech/docs/guides/prisma)
- [Connection Pooling no Neon](https://neon.tech/docs/connect/connection-pooling)

---

**Dica**: Mantenha o `docker-compose.yaml` para desenvolvimento local se preferir, mas use o Neon DB para produção e testes em equipe.

