import React from "react";
import { useEffect } from "react";
import { createClient } from '@supabase/supabase-js'
import { useRouter } from "next/router";

function TextArea() {
    return (
        <>
            <textarea>
            </textarea>
        </>
    )
}

function CorpoChat(props) {
    return (
        <>
            <div>
                teste: {props.children}
            </div>
        </>
    )
}

//Chave subpabase
const chave_supabase = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQyNTkyMiwiZXhwIjoxOTU5MDAxOTIyfQ.bTUMBOB3hFGqxn3NQ29o0pDh30p0Lm819PN-76VhBfk";
const url_supabase = "https://veezuhhdajwmglyvdqgt.supabase.co";
const supabase_client = createClient(url_supabase, chave_supabase);


//Para fazer isso funcionar, tem que habilitar no supabae
function pegaMensagensTempoReal(adicionaMensagem) {
    return supabase_client
        .from('mensanges')
        .on("INSERT", ({ retorno_mensagens }) => {
            //console.log("teste:" + retorno_mensagens);
            adicionaMensagem(retorno_mensagens);
    }).subscribe();
}

function ChatGeral() {

    const [mensagem, setMensagem] = React.useState('');
    const [listaMensagens, setlistaMensagens] = React.useState([]);

    const roteamento = useRouter();

    const userLogado = roteamento.query.username;
   

    //Usando um efeito
    //So roda quando a pagina carregar ou quando foi feita alguma alteração no gatilho
    useEffect(() => {
        supabase_client.from("mensagens").select('*').then(({ data }) => {
            //console.log(data);
            setlistaMensagens(data);
        });

        //pegaMensagensTempoReal((mensagem_nova) => {
        //    //handleNewMsg(mensagem_nova);
        //    supabase_client.from("mensagens").select('*').then(({ data }) => {
        //        //console.log(data);
        //        setlistaMensagens(data);
        //    });
        //});
    }, []);

    //let contador = 0;

    //user pag
    //let x = document.cookie || 'teste';
    //console.log(x);

    //console.log(listaMensagens);

    function handleNewMsg(mensagem_teste) {
        const  mensagem_entrada = {
            //id: '',
            user: userLogado,
            mensagem: mensagem_teste,
        };

        supabase_client
        .from('mensanges')
        .on("INSERT", ({ mensagem_entrada }) => {
            //console.log("teste:" + retorno_mensagens);
            //adicionaMensagem(retorno_mensagens);
            setlistaMensagens([
                ...listaMensagens, 
                data[0],
            ]);
        }).subscribe();

        //supabase_client.from("mensagens").insert([mensagem_entrada])
        //.then(({data}) => {
        //    console.log(data);
        //    setlistaMensagens([
        //        ...listaMensagens, 
        //        data[0],
        //    ]);
        //    
        //    //supabase_client.from("mensagens").select('*').then(({ data }) => {
        //    //    //console.log(data);
        //    //    setlistaMensagens(data);
        //    //});
        //    //pegaMensagensTempoReal((data) => {
        //    //    handleNewMsg(data[0]);
        //    //    console.log(data[0]);
        //    //    setlistaMensagens(() => {
        //    //        return [
        //    //        ...listaMensagens, 
        //    //        data[0],
        //    //    ]});
        //    //});
        //});
        //console.log(mensagem_teste);


        //setlistaMensagens([
        //    ...listaMensagens, 
        //    mensagem_teste
        //]);
        setMensagem('');
    }

    //Faz a requisicao
    //O then so responde quando terminar de fazer a operacao 
    //Operacao tem que ser assincrona 
    //fetch("").then(async (respota_quando_receber) =>{
    //    //Espera a resposta
    //    const valor = await respota_quando_receber.json()
    //    console.log(valor);
    //})



    return (
        <>
            Hello!
            <br />
            <textarea
                value={mensagem}
                onChange={function (event) {
                    //console.log(event.target.value);
                    setMensagem(event.target.value);
                }}
                onKeyPress={function (event) {
                    //Adicionando mensagem dentro de uma array quando aperta enter
                    //console.log(event);
                    if (event.key == "Enter") {
                        event.preventDefault();
                        //console.log(event.key);
                        handleNewMsg(mensagem);
                    }
                }}
            >
            </textarea>
            <button onClick={function () {
                handleNewMsg(mensagem);
            }}>OK</button>
            <br />
            {listaMensagens.map((msg_atual) => {
                //console.log(msg_atual.mensagem);
                const cormsg = {
                    id: msg_atual.id,
                    user: msg_atual.user, //document.cookie,
                    mensagem: msg_atual.mensagem,
                }
                return (
                    <div key={cormsg.id} id={`display`+cormsg.id}>
                        <button onClick={function(){
                            listaMensagens.splice(0, cormsg.id);
                            //delete listaMensagens[cormsg.id];
                            setlistaMensagens(listaMensagens);
                            //Deletando as mensagens
                            supabase_client.from("mensagens").delete().match({ id: cormsg.id })
                            .then(({ data }) => {
                                console.log(data);
                            });
                            document.getElementById(`display`+cormsg.id).style.display="none";
                            //console.log(listaMensagens);
                        }}
                        >Delete</button>
                        {cormsg.user} == {cormsg.mensagem}
                    </div>
                )
            })}
        </>
    )
}

export default ChatGeral