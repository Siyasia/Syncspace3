import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/**
 * SyncSpace data schema for tasks
 */
const schema = a.schema({
  Task: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
