import EventEmitter from 'events'
import Api from './Api'
import User from './models/User'

export default class AppCore extends EventEmitter {
  public api: Api
  public currentUser: User

  public async load(): Promise<void> {
    this.api = new Api('http://localhost:3000', 'v1')
    const token = this.getAuthToken()

    if (token) {
      const user = await this.api.logIn(null, null, token)

      if (user) {
        const token = `${user.id}`
        this.saveAuthToken(token)
        this.api.setAuthToken(token)

        this.currentUser = user
      }
    }

    this.emit('loaded')
  }

  public getAuthToken(): string {
    return localStorage.getItem('auth')
  }

  public saveAuthToken(token: string): void {
    localStorage.setItem('auth', token)
  }
}
