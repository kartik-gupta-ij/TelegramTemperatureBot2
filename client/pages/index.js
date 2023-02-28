import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default Signin;

function Signin() {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = 'http://localhost:3001/users/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
    const response = await fetch(endpoint, options)
    const result = await response.json()
    console.log(result)
    if (result) {
      localStorage.setItem('token', result.token);
    }
    if (result.success) {
      window.location.href = "/subscribers"
    }
  }
  return (
    <>
      <section class="xsection">
        <div class="card">
          <div class="card-body">
            <form onSubmit={handleSubmit}>
              <h2 class="xh2">Welcome</h2>
              <div class="input-box">
                <input class="xinput" type="text" placeholder="Username" name='username' defaultValue='Admin'/>
              </div>
              <div class="input-box">
                <input class="xinput" type="password" placeholder="Password" name='password' defaultValue='password'/>
              </div>
              <button type="submit" id="log-button">
                Login
              </button>
              <p class="xp">Dont have an account ? <a class="xa" href="#">Sign up here</a></p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
