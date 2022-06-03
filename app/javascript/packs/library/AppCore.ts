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

      if (user) this.setAuth(user)
    }

    this.emit('loaded')
  }

  public async logIn(email?: string, password?: string, token?: string): Promise<boolean> {
    const user = await this.api.logIn(email, password, token)

    if (user) {
      this.setAuth(user)

      return true
    }

    return false
  }

  public async signUp(name: string, email: string, password: string): Promise<boolean> {
    const user = await this.api.signUp(name, email, password)

    if (user) {
      this.setAuth(user)

      return true
    }

    return false
  }

  public logOut(): void {
    this.removeAuthToken()
    this.currentUser = null
    this.emit('auth', false)
  }

  private setAuth(user: User): void {
    const token = `${user.id}`
    this.saveAuthToken(token)
    this.api.setAuthToken(token)
    this.currentUser = user

    this.emit('auth', true)
  }

  private getAuthToken(): string {
    return localStorage.getItem('auth')
  }

  private saveAuthToken(token: string): void {
    localStorage.setItem('auth', token)
  }

  private removeAuthToken(): void {
    localStorage.removeItem('auth')
  }
}
