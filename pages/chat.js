import { getDisplayName } from "next/dist/shared/lib/utils";
import { useState } from "react";

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

function ChatGeral() {

    const [mensagem, setMensagem] = useState('');
    const [listaMensagens, setlistaMensagens] = useState([]);

    let contador = 0;

    //user pag
    //let x = document.cookie || 'teste';
    //console.log(x);

    function handleNewMsg(mensagem_teste) {
        setlistaMensagens([
            ...listaMensagens, 
            mensagem_teste
        ])
        setMensagem('');
    }

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
                const cormsg = {
                    id: contador++,
                    message: msg_atual,
                    user: document.cookie,
                }
                return (
                    <div key={cormsg.id} id={`display`+cormsg.id}>
                        <button onClick={function(){
                            listaMensagens.splice(0, cormsg.id);
                            //delete listaMensagens[cormsg.id];
                            setlistaMensagens(listaMensagens);
                            document.getElementById(`display`+cormsg.id).style.display="none";
                            console.log(listaMensagens);
                        }}
                        >Delete</button>
                        {cormsg.user} == {cormsg.message}
                    </div>
                )
            })}
        </>
    )
}

export default ChatGeral