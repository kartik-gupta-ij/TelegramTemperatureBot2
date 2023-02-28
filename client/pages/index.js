import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export function getServerSideProps(){
  const base_url=process.env.REACT_APP_LOCAL_SERVER
  console.log(base_url)
  return {
    props:{
      base_url:base_url
    }
  }
}
export default Signin;

function Signin(props) {

  const base_url=props.base_url
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    }
    const JSONdata = JSON.stringify(data)
    const endpoint = base_url+'/users/login' 
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
      <section className="xsection">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h2 className="xh2">Welcome</h2>
              <div className="input-box">
                <input className="xinput" type="text" placeholder="Username" name='username' defaultValue='Admin'/>
              </div>
              <div className="input-box">
                <input className="xinput" type="password" placeholder="Password" name='password' defaultValue='password'/>
              </div>
              <button type="submit" id="log-button">
                Login
              </button>
              <p className="xp">Dont have an account ? <a className="xa" href="#">Sign up here</a></p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
