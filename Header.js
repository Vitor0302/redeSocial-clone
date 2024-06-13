import {useEffect, useState} from 'react';
import firebase from "firebase";
import {auth,storage,db} from "./firebase.js";


function Header(props){
    
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    useEffect(()=>{
        
    },[]);

    function criarConta(e){
        e.preventDefault();
        let email = document.getElementById("email-cadastro").value;
        let username = document.getElementById("username-cadastro").value;
        let senha = document.getElementById("senha-cadastro").value;
        auth.createUserWithEmailAndPassword(email,senha)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:username
            })
            alert("Conta criada com sucesso!");
            let modal = document.querySelector(".modalCriarConta");
            modal.style.display = "none";
        }).catch((error)=>{
            alert(error.message);
        
        });

    }

    function logar(e){
        e.preventDefault();
        let email = document.getElementById("email-login").value;
        let senha = document.getElementById("senha-login").value;

        auth.signInWithEmailAndPassword(email,senha)
        .then((authUser)=>{
            props.setUser(authUser.user.displayName);
        }).catch((err)=>{
            alert(err.message);
        });
    }

    function abrirModalCriarConta(e){
        e.preventDefault();

        let modal = document.querySelector(".modalCriarConta");
        modal.style.display = "block";
        
    }

    function abrirModalUpload(e){
        e.preventDefault();
        let modal = document.querySelector(".modalUpload");
        modal.style.display = "block";
    }

    function fecharModalUpload(){
        let modal = document.querySelector(".modalUpload");
        modal.style.display = "none";
    }

    function uploadPost(e){
        e.preventDefault();
        let tituloPost = document.getElementById("titulo-upload").value;
        let progressEl = document.getElementById("progress-upload");

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on("state_changed",(snapshot)=>{
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        },function(error){

        },function(){
            
            storage.ref("images").child(file.name).getDownloadURL()
            .then((url)=>{
                db.collection("posts").add({
                    titulo:tituloPost,
                    image:url,
                    userName:props.user,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                setProgress(0);
                setFile(null);

                document.getElementById("form-upload").reset();
            })

        })

    }

    function fecharModalCriar(){
        let modal = document.querySelector(".modalCriarConta");
        modal.style.display = "none";
    }
    
    return(

        <div className = "header">

            <div className = "modalCriarConta">
                <div className = "formCriarConta">
                    <div onClick={()=>fecharModalCriar()} className = "close-modal-criar">X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e)=>criarConta(e)}>
                        <input id="email-cadastro" type="text" placeholder = "Seu E-Mail..."/>
                        <input id="username-cadastro" type="text" placeholder = "Seu User Name..."/>
                        <input id="senha-cadastro" type="password" placeholder = "Sua Senha..."/>
                        <input type="submit" value = "Criar Conta"/>
                    </form>
                </div>
            </div>

            <div className = "modalUpload">
                <div className = "formUpload">
                    <div onClick={()=>fecharModalUpload()} className = "close-modal-criar">X</div>
                    <h2>Fazer Upload</h2>
                    <form onSubmit={(e)=>uploadPost(e)}>
                        <progress id="progress-upload" value={progress}></progress>
                        <input id="titulo-upload" type="text" placeholder = "Nome da sua foto..."/>
                        <input onChange= {(e)=>setFile(e.target.files[0])} type="file" name="file"/>
                        <input type="submit" value = "Postar no instagram"/>
                    </form>
                </div>
            </div>




            <div className = "center">
                <div className = "header__logo">
                    <a href=""><img src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt = "instagram logo"/></a>
                </div>

                {
                    (props.user)?
                    <div className="header__logadoInfo">
                        <span>Olá, <b>{props.user}</b></span>
                        <a onClick={(e)=>abrirModalUpload(e)} href="#">Postar!</a>
                        <a onClick={(e)=>auth.signOut(e)} href="#">Sair</a>
                    </div>
                    :
                    <div className = "header__loginForm">
                        <form onSubmit={(e)=> logar(e)}>
                            <input id="email-login" type="text" placeholder = "Login..."/>
                            <input id="senha-login" type="password" placeholder = "Senha..."/>
                            <input type="submit" value = "Logar"/>
                        </form>
                        <div className="btn__criarConta">
                            <a onClick={(e)=>abrirModalCriarConta(e)} href="#">Criar conta!</a>
                        </div>
                    </div>
                }

            </div>
        </div>


    )
}

export default Header;