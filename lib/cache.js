import Redis from 'ioredis'

const { REDIS_URL, REDIS_EXPIRY } = process.env

const redis = new Redis(REDIS_URL)

const cache = {
  get: async key => {
    console.log('READING from cache: ', key)
    return JSON.parse(await redis.get(key))
  },
  set: async (key, data, expireAfter = REDIS_EXPIRY || 86400) => {
    console.log('WRITING to cache: ', key)
    await redis.set(key, JSON.stringify(data), 'EX', expireAfter)
  },
  delete: async key => await redis.del([key])
}

export default cache
