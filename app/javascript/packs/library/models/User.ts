export default class User {
  public id: number
  public name: string
  public email: string
  public createdAt: Date

  public constructor(fromApi: any) {
    this.id = fromApi.id
    this.name = fromApi.name
    this.email = fromApi.email
    this.createdAt = new Date(fromApi['created_at'])
  }
}
