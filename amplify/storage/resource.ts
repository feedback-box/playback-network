import { defineFunction, defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'medias',
  access: (allow) => ({
    'submitted/*': [
      // anyone can submit files:
      allow.guest.to(['read', 'write']),
    ],
  }),
  triggers: {
    onUpload: defineFunction({
      entry: './on-upload-handler.ts',
    }),
  },
});
