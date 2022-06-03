import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import appCore from '../../appCore'

export default function SignUpPage(): React.ReactElement {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value)
        break
      case 'email':
        setEmail(event.target.value)
        break
      case 'password':
        setPassword(event.target.value)
        break
    }
  }

  const handleSubmit = async (): Promise<void> => {
    const signedUp = await appCore.signUp(name, email, password)

    if (signedUp) {
      navigate('/')
    } else {
      setPassword('')
    }
  }

  return (
    <div className="auth-page">
      <div className="form">
        <h2>Create a "Twitter" account</h2>
        <span>Name</span>
        <input type="text" name="name" value={name} onChange={onChange}></input>
        <span>Email</span>
        <input type="email" name="email" value={email} onChange={onChange}></input>
        <span>Password</span>
        <input type="password" name="password" value={password} onChange={onChange}></input>
        <button onClick={handleSubmit}>Sign up</button>
        <div className="bottom">
          <Link to="/authentication/login">Log in</Link>
        </div>
      </div>
    </div>
  )
}
