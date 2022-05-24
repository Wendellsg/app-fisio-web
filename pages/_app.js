import '../styles/globals.css'
import NavMenu from '../src/components/Nav'

function MyApp({ Component, pageProps }) {
  return <div>
    <NavMenu />
    <Component {...pageProps} />
  </div>  
  
}

export default MyApp
