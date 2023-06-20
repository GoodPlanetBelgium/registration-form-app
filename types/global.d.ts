export {}

declare global {
  interface Array<T> {
    findLastIndex(
      predicate: (value: T, index: number, obj: T[]) => unknown,
      thisArg?: any
    ): number
  }

  namespace NodeJS {
    interface ProcessEnv {
      SALESFORCE_API_HOST: string
      SALESFORCE_CONSUMER_KEY: string
      SALESFORCE_CONSUMER_SECRET: string
      REDIS_URL: string
      REDIS_EXPIRY: number
      SCHOOL_CONTACT_RECORD_TYPE_ID: string
      SCHOOL_ACCOUNT_RECORD_TYPE_ID: string
      MICROSOFT_GRAPH_HOST: string
      MICROSOFT_TENANT_ID: string
      MICROSOFT_CLIENT_ID: string
      MICROSOFT_CLIENT_SECRET: string
    }
  }
}
