import User from './User'

interface QuotedTweet {
  id: number
  content: string
  reteets: number
  likes: number
  createdAt: Date
  user: User
}

export default class Tweet {
  public id: number
  public content: string
  public retweets: number
  public retweeted: boolean
  public likes: number
  public liked: boolean
  public createdAt: Date
  public quotedTweet: QuotedTweet
  public user: User

  public constructor(fromApi: any) {
    this.id = fromApi.id
    this.content = fromApi.content
    this.retweets = fromApi.retweets
    this.retweeted = fromApi.retweeted
    this.likes = fromApi.likes
    this.liked = fromApi.liked
    this.createdAt = new Date(fromApi['created_at'])
    this.quotedTweet = fromApi['quoted_tweet']
    this.user = new User(fromApi.user)
  }
}
