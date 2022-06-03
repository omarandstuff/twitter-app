import Tweet from './models/Tweet'
import User from './models/User'

export default class Api {
  public readonly baseUrl: string
  public readonly version: string
  public token: string

  public constructor(baseUrl: string, version: 'v1') {
    this.baseUrl = baseUrl
    this.version = version
  }

  public setAuthToken(token: string): void {
    this.token = token
  }

  public async logIn(email?: string, password?: string, token?: string): Promise<User> {
    try {
      const data = await this.commonFetch('POST', 'log_in', { authentication: { email, password, token } })
      return new User(data.user)
    } catch {}
  }

  public async signUp(name: string, email: string, password: string): Promise<User> {
    try {
      const data = await this.commonFetch('POST', 'sign_up', { authentication: { name, email, password } })
      return new User(data.user)
    } catch {}
  }

  public async getTweets(): Promise<Tweet[]> {
    try {
      const data = await this.commonFetch('GET', 'tweets')
      return data.tweets.map((rawTweet: any): Tweet => new Tweet(rawTweet))
    } catch {}
  }

  public async createTweet(content?: string, quotedTweetId?: number): Promise<Tweet> {
    try {
      const data = await this.commonFetch('POST', 'tweets', { content, quoted_tweet_id: quotedTweetId })
      return new Tweet(data.tweet)
    } catch {}
  }

  public async destroyTweet(id: number): Promise<void> {
    try {
      await this.commonFetch('DELETE', `tweets/${id}`)
    } catch {}
  }

  public async likeTweet(id: number): Promise<void> {
    try {
      await this.commonFetch('POST', `likes/${id}`)
    } catch {}
  }

  public async unlikeTweet(id: number): Promise<void> {
    try {
      await this.commonFetch('DELETE', `likes/${id}`)
    } catch {}
  }

  protected async commonFetch(method: string, path: string, body?: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/${this.version}/${path}`, {
      method: method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Goffy ${this.token}`
      },
      body: body ? JSON.stringify(body) : undefined
    })

    return await response.json()
  }
}
