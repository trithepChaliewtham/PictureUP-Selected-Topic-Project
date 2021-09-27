import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'

function MyApp({ Component, pageProps }: AppProps) {
  axios({
    method: 'get',
    url: 'http://localhost:8000/'
  })
    .then(response => {
      console.log("response: ", response)
      // do something about response
    })
    .catch(err => {
      console.error(err)
    })
  return <div><Component {...pageProps} /></div>
}
export default MyApp
