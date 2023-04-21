import Redis from 'ioredis'

const { REDIS_URL, REDIS_EXPIRY } = process.env

const redis = new Redis(REDIS_URL)

const cache = {
  get: async (key: string) => {
    console.log('READING from cache: ', key)
    const result = await redis.get(key)
    return result ? JSON.parse(result) : null
  },
  set: async (key: string, data: any, expireAfter = REDIS_EXPIRY || 86400) => {
    console.log('WRITING to cache: ', key)
    await redis.set(key, JSON.stringify(data), 'EX', expireAfter)
  },
  delete: async (key: string) => await redis.del([key])
}

export default cache
