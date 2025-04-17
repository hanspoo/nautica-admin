import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'libs/lib-graphql/schema.graphql',
  generates: {
    'libs/api/src/lib/generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
export default config;
