# Creator Flow

Test assessment showcasing a flow for creating Gleans built with Next.js.

## Screencast

<https://github.com/DanylKab/creator-flow/assets/138477122/a96c7852-3c5c-4111-98df-bbea17fdcd05>

## Get Started

1. Install dependencies: `npm install`.
2. Add the `.env` file and add variables. You can use `.env.template` as a template.
   - Note that you need to specify two connection strings for PostgreSQL database, one is a direct one, and the second is for Pooling. [Learn More](https://supabase.com/docs/guides/integrations/prisma#connection-pooling-with-supabase) why is this needed.
3. After adding `.env` variables, run a Prisma migration so that database schema is in sync with Prisma: `npx prisma migrate dev`
4. Generate Prisma client: `npx prisma generate`
5. Run `npm run dev` and visit <https://localhost:3000>.

## Linting

- `npm run lint` - checks for eslint, prettier, and TS errors

CI/CD pipeline automatically runs linter checks on push.
