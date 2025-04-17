import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/server/src/assets/schema.graphql',
  generates: {
    'libs/api/src/lib/generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
export default config;
