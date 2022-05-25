import '../styles/globals.css'
import NavMenu from '../src/components/Nav'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <div className='App-container'>
    <Head>
        <title>App Fisio</title>
        <meta name="description" content="App Físio de fisioterapeuta para fisioterapeuta" />
        <link rel="icon" href="/assets/exercicios.png" />
    </Head>
    <NavMenu />
    <div className='Page-container'>
    <Component {...pageProps} />
    </div>
  </div>  
}

export default MyApp
