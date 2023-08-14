// local data cache -- cheap and easy, not exactly redis, but yeah...
const data = []

const getExpiresTime = () => Date.now() + 1000 * 60 * 60
type CacheData = {
  options: string[]
  expires: number
  attempts: number
}

export const getData = (key: string): CacheData => {
  if (data[key]) {
    data[key].expires = getExpiresTime()
    return data[key]
  }

  throw new Error("Data not found")
}

export const setData = (key: string, options: string[], attempts: number) => {
  data[key] = { options, expires: getExpiresTime(), attempts }
}

export const purgeExpiredData = () => {
  data.forEach((value, key) => {
    if (Date.now() > value.expires) {
      delete data[key]
    }
  })
}
