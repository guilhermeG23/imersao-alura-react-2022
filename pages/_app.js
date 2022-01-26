import '../styles/globals.css'
//Roda em todas as paginas -> Usado para generalistas 
function MyApp({ Component, pageProps }) {
  console.log("Passa em todas as paginas");
  return <Component {...pageProps} />
}

export default MyApp
