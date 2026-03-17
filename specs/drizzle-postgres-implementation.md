# Devroast: Drizzle ORM + PostgreSQL Implementation Specification

## 📋 Overview
This document specifies the implementation of Drizzle ORM with PostgreSQL for the Devroast application, replacing any existing data storage solution.

## 🎯 Goals
- Implement robust data persistence using PostgreSQL
- Use Drizzle ORM for type-safe database interactions
- Set up development environment with Docker Compose
- Maintain compatibility with existing Next.js 16 + React 19 stack

## 🖥️ Screens Requiring Data Persistence

Based on the design analysis in `devroast.pen`, these screens require database integration:

1. **Screen 1 - Code Input** (`9qwc9`)
   - Store submitted code snippets
   - Track submission metadata (timestamp, language, etc.)

2. **Screen 2 - Roast Results** (`8pCh0`)
   - Store AI-generated roast analysis
   - Store scoring data (0-10 scale)
   - Store detailed feedback categories

3. **Screen 3 - Shame Leaderboard** (`5iseT`)
   - Store leaderboard rankings
   - Track historical scores
   - Store code previews for leaderboard entries

4. **Component Library** (`Wbm4d`)
   - Store reusable UI component metadata (for future dynamic component system)

## 🗃️ Database Schema Design

### Enums
```sql
-- Programming languages supported
CREATE TYPE language_enum AS ENUM (
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'c',
  'rust',
  'go',
  'ruby',
  'php',
  'html',
  'css',
  'sql',
  'bash',
  'other'
);

-- Roast verdict categories
CREATE TYPE verdict_enum AS ENUM (
  'needs_serious_help',
  'critical',
  'warning',
  'good',
  'excellent'
);

-- Code submission status
CREATE TYPE submission_status_enum AS ENUM (
  'pending',
  'processing',
  'completed',
  'failed'
);
```

### Tables

#### code_submissions
```sql
Table: code_submissions
Columns:
- id: UUID (Primary Key)
- code: TEXT (NOT NULL)
- language: language_enum (NOT NULL)
- status: submission_status_enum (DEFAULT 'pending')
- submitted_at: TIMESTAMP WITH TIME ZONE (DEFAULT NOW())
- processed_at: TIMESTAMP WITH TIME ZONE (NULL)
- user_id: UUID (NULLABLE, for future auth)
- ip_address: INET (NULLABLE)
```

#### roast_results
```sql
Table: roast_results
Columns:
- id: UUID (Primary Key)
- submission_id: UUID (Foreign Key -> code_submissions.id, NOT NULL)
- score: DECIMAL(2,1) (NOT NULL, range 0.0-10.0)
- verdict: verdict_enum (NOT NULL)
- summary: TEXT (NOT NULL)
- detailed_analysis: JSONB (NOT NULL)
- suggestions: TEXT[] (NULLABLE)
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT NOW())
```

#### leaderboard_entries
```sql
Table: leaderboard_entries
Columns:
- id: UUID (Primary Key)
- submission_id: UUID (Foreign Key -> code_submissions.id, NOT NULL)
- rank: INTEGER (NOT NULL)
- score: DECIMAL(2,1) (NOT NULL)
- code_preview: TEXT (NOT NULL, first 100 chars)
- language: language_enum (NOT NULL)
- submitted_at: TIMESTAMP WITH TIME ZONE (NOT NULL)
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT NOW())
```

#### code_tags (for future enhancement)
```sql
Table: code_tags
Columns:
- id: UUID (Primary Key)
- submission_id: UUID (Foreign Key -> code_submissions.id, NOT NULL)
- tag: VARCHAR(50) (NOT NULL)
- created_at: TIMESTAMP WITH TIME ZONE (DEFAULT NOW())
```

### Indexes
- Index on `code_submissions.submitted_at DESC` for recent submissions
- Index on `roast_results.score DESC` for scoring queries
- Index on `leaderboard_entries.rank` for leaderboard display
- Composite index on `(code_submissions.language, code_submissions.submitted_at)` for language-filtered feeds

## 📝 To-Dos

### Phase 1: Infrastructure Setup
- [ ] Install required dependencies: `drizzle-orm`, `pg`, `dotenv`
- [ ] Install Dev dependencies: `drizzle-kit`, `@types/pg`
- [ ] Create `docker-compose.yml` for PostgreSQL service
- [ ] Set up environment variables (.env.example)
- [ ] Configure Drizzle ORM with PostgreSQL connection

### Phase 2: Database Schema Implementation
- [ ] Create Drizzle schema files in `src/db/schema.ts`
- [ ] Implement migration scripts with Drizzle Kit
- [ ] Create database connection utility in `src/db/client.ts`
- [ ] Run initial migration to create tables

### Phase 3: Data Access Layer
- [ ] Create repository pattern for data access
- [ ] Implement submission repository (CRUD operations)
- [ ] Implement roast results repository
- [ ] Implement leaderboard repository
- [ ] Add utility functions for common queries

### Phase 4: API Integration
- [ ] Modify existing API routes to use Drizzle ORM
- [ ] Update `/app/api/roast/route.ts` to store submissions
- [ ] Update `/app/api/leaderboard/route.ts` to fetch from DB
- [ ] Ensure proper error handling and validation
- [ ] Add database health check endpoint

### Phase 5: Testing & Validation
- [ ] Write unit tests for repository functions
- [ ] Test Docker Compose setup locally
- [ ] Verify data persistence across restarts
- [ ] Validate API responses match expected formats
- [ ] Performance testing with sample data

### Phase 6: Documentation & Cleanup
- [ ] Update README with Docker setup instructions
- [ ] Document environment variables
- [ ] Add database migration guidelines
- [ ] Clean up any temporary files
- [ ] Ensure .gitignore excludes sensitive files

## 🐳 Docker Compose Configuration

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    container_name: devroast-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: devroast
      POSTGRES_USER: devroast_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-secure_password}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "devroast_user"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

## 🔧 Environment Variables

```env
# Database Connection
DATABASE_URL=postgresql://devroast_user:secure_password@localhost:5432/devroast?schema=public

# Optional: For connection pooling
DB_POOL_MIN=2
DB_POOL_MAX=10

# Migration Settings
MIGRATION_DIR=src/db/migrations
```

## 📦 Dependencies

### Production
- `drizzle-orm@^0.29.0`
- `pg@^8.11.0`

### Development
- `drizzle-kit@^0.20.0`
- `@types/pg@^8.10.0`

## 🔄 Development Workflow

1. Start development environment:
   ```bash
   docker-compose up -d
   ```

2. Generate migrations:
   ```bash
   npx drizzle-kit generate:pg
   ```

3. Apply migrations:
   ```bash
   npx drizzle-kit migrate:pg
   ```

4. Studio (optional GUI):
   ```bash
   npx drizzle-kit studio:pg
   ```

## 🛡️ Security Considerations

- Use environment variables for database credentials
- Implement proper SQL injection prevention (Drizzle ORM provides protection)
- Consider row-level security for multi-user scenarios
- Regularly update PostgreSQL and dependencies
- Log database errors appropriately (without exposing sensitive info)

## 📈 Future Enhancements

- Add user authentication and associate submissions with users
- Implement code tagging system for better categorization
- Add analytics dashboard for submission trends
- Implement caching layer for frequently accessed leaderboard data
- Add backup and recovery procedures for production