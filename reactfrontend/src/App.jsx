import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <form className="sign-up-form">
        <FormTitle className="sign-up-form__title" text="Login" />
        <Field
          className="sign-up-form__email"
          placeholder="Enter Email"
          name="email"
          type="email"
          title="Email"
          component={FormInput}
        />
        <Field
          className="sign-up-form__password"
          placeholder="Enter Password"
          name="password"
          type="password"
          title="Password"
          component={FormInput}
        />
        <Field
          className="sign-up-form__login"
          name="login"
          type="submit"
          title="Login"
          component={FormButton}
        />
        <div className='sign-up-form__text-links'>
            <TextLink to='/forgot' text='Forgot Password'/>
            <TextLink to='/signup' text='Not a member? Register here'/>
        </div>

      </form>
    </>
  )
}

export default App
