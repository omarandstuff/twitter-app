import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import appCore from '../../appCore'

export default function LogInPage(): React.ReactElement {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
    }
  }

  const handleSubmit = async (): Promise<void> => {
    const logedIn = await appCore.logIn(email, password)

    if (logedIn) {
      navigate('/')
    } else {
      setPassword('')
    }
  }

  return (
    <div className="auth-page">
      <div className="form">
        <h2>Log In to "Twitter"</h2>
        <span>Email</span>
        <input type="email" name="email" value={email} onChange={onChange}></input>
        <span>Password</span>
        <input type="password" name="password" value={password} onChange={onChange}></input>
        <button onClick={handleSubmit}>Log in</button>
        <div className="bottom">
          <Link to="/authentication/signup">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
