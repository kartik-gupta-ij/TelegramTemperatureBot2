import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/subscribers.module.css'
import { useState, useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })


export default function Home(props) {

  const [subscribers, setsubscribers] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const[errorMessage,setErrorMessage]=useState(null)

  const baseUrl = 'http://localhost:3001/';
 useEffect(() => {
    setLoading(true)
    const bearer='Bearer ' + window.localStorage.getItem('token');
    console.log(bearer)
    fetch(baseUrl + 'subscribers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      credentials: 'same-origin'
    })
    .then((res) => res.json())
      .then((subscribers) => {
      setsubscribers(subscribers)
      setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        setError(true)
        setErrorMessage("Unauthorized")
      });
  }, [])
  
  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>pages/index.js</code>
          </p>
          <div>
            <button >logout</button>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={inter.className}>
              User Name
            </h2>
          </div>
          <div className={styles.card}>
            <h2 className={inter.className}>
              Name
            </h2>
          </div>
          <div className={styles.card}>
            <h2 className={inter.className}>
              Chat ID
            </h2>
          </div>
          <div className={styles.card}>
            <h2 className={inter.className}>
              City
            </h2>
          </div>
          {isError && (<p> Error : {errorMessage}</p>)}
          {subscribers &&
            subscribers.map((item, i) => (
              <>
                <div className={styles.card}>
                  <p className={inter.className}>
                    {item.username}
                  </p>
                </div>
                <div className={styles.card}>
                  <p className={inter.className}>
                    {item.firstName} {item.lastName}
                  </p>
                </div>
                <div className={styles.card}>
                  <p className={inter.className}>
                    {item.chatId}
                  </p>
                </div>
                <div className={styles.card}>
                  <p className={inter.className}>
                    {item.city}
                  </p>
                </div>
              </>
            ))
          }

        </div>
      </main>
    </>
  )
}
