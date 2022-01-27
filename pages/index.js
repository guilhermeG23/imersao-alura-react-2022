import { useState } from "react";
//Gancho de roteamento
import { useRouter } from "next/router";

function Title(props) {
  const TagTitle = props.tag;
  return (
    <>
      <TagTitle>{props.children}</TagTitle>
    </>
  )
}



function ImgUser(props) {
  
  const ImgSrc = props.img;
  return(
    <>
    <style jsx>{`
    img {
      width: 120px;
    }
    `}</style>
    {ImgSrc.length > 2 && 
      <div>
        <img src={`https://github.com/${ImgSrc}.png`}></img>
        <p>{ImgSrc}</p>
      </div>
    }
    </>
  )
}

//Estilo está limitado ao componente
function Home() {
  //const UserGit = "guilhermeG23";


  //Trabalha com um array de valores, o primeiro é o valor o segundo 
  //e a funcao que o requisitada
  //Fica alternando o estado da pagina
  const [username, setUsername] = useState('');
  
  //Funcao de gacho
  const roteamento = useRouter();

  return (
    <>
      <Title tag="h1">Titulo de teste</Title>
      <form onSubmit={function(informacoesEvento){
        informacoesEvento.preventDefault();
        //Vai enviar voce para a pagina do chat -> So falta os valores irem juntos
        document.cookie="";
        document.cookie = username; 
        roteamento.push("/chat");
      }}>
        <input value={username} onChange={function(event) {
            console.log(event.target.value);
            setUsername(event.target.value);
        }}></input>
        <button type="submit">Click Me</button>
      </form>
      <br/>
      <ImgUser img={username}></ImgUser>
    </>
)
}

export default Home