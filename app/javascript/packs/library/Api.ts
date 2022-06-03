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
    const data = await this.commonFetch('POST', 'log_in', { email, password, token })

    return new User(data.user)
  }

  protected async commonFetch(method: string, path: string, body: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/api/${this.version}/${path}`, {
      method: method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Goffy ${this.token}`
      },
      body: JSON.stringify(body)
    })

    return await response.json()
  }
}
