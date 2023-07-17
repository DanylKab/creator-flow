# Creator Flow

Test assessment showcasing a flow for creating Gleans built with Next.js.

## Get Started

1. Install dependencies: `npm install`.
2. Add the `.env` file and add variables. You can use `.env.template` as a template.
   - Note that you need to specify two connection strings for PostgreSQL database, one is a direct one, and the second is for Pooling. [Learn More](https://supabase.com/docs/guides/integrations/prisma#connection-pooling-with-supabase) why is this needed.
3. Run `npm run dev` and visit <https://localhost:3000>.

## Linting

- `npm run lint` - checks for eslint, prettier, and TS errors

CI/CD pipeline automatically runs linter checks on push.
