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
  public reteets: number
  public likes: number
  public createdAt: Date
  public quotedTweet: QuotedTweet
  public user: User

  public constructor(fromApi: any) {
    this.id = fromApi.id
    this.content = fromApi.content
    this.reteets = fromApi.reteets
    this.likes = fromApi.likes
    this.createdAt = new Date(fromApi['created_at'])
    this.quotedTweet = fromApi.quotedTweet
    this.user = new User(fromApi.user)
  }
}
