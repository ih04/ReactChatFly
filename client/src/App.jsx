import soc from 'socket.io-client'
import {useState, useEffect, useRef} from 'react'
import { collection, addDoc, serverTimestamp,doc, setDoc, updateDoc,getDocs } from "firebase/firestore";
import { db } from "./firebase";

const socket = soc("/")
const docRef = doc(db,"documentos","mensajes");
// const mensajesRef = collection(db, "documentos","mensajes","mensajes");

function App() {
  console.log("Firestore db:", db);
  const [getMensaje,setMensaje] = useState('')
  const [getMensajes,setMensajes] = useState([])
  const endRef = useRef(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const Recibir =async (e) => {
    // e.preventDefault();
    try {
      const querySnapshot = await  getDocs(collection(db, "mensajes"));
      // await addDoc(collection(db, "documentos"), {
      //   texto: "hola"
      const mensajesRecibidos = querySnapshot.docs.map(doc => doc.data());
      
      // });
      
      console.log("Mensajes:", mensajesRecibidos[0]['fecha'].toDate().toString());
      
      // mensajesRecibidos.forEach(m => {
        
      //   let txt = [m["texto"]];
      //   console.log(txt);
      //   setMensajes([...getMensajes,"hola"]);
        
      // });

      // setMensajes(mensajesRecibidos);
      // console.log(mensajesRecibidos[0]);
      console.log(mensajesRecibidos);
      mensajesRecibidos.sort((a,b) => a.fecha.toDate()-b.fecha.toDate());
      const mensajesFormateados = mensajesRecibidos.map(m => ({
        cuerpo: m.texto,
        // from: "Firebase",
        fecha: m.fecha.toDate().getHours().toString() +":"+ m.fecha.toDate().getMinutes().toString(),
        fechaRecibido: (m.fecha.toDate().getDate())+"/"+(m.fecha.toDate().getMonth()+1)+"/"+(m.fecha.toDate().getFullYear())
      }));
      
      setMensajes(mensajesFormateados);
      
      console.log(getMensajes);
    } catch (error) {
      console.error("Error al enviar mensaje: ", error);
    }
  }


  const Enviar =async (e) => {
    e.preventDefault();
    const fecha = new Date();
    const MensajeNuevo = {
      cuerpo: getMensaje,

      from: 'Yo',
      fecha: fecha.getHours().toString() +":"+ fecha.getMinutes().toString(),

    }
    setMensajes([...getMensajes,MensajeNuevo])
    socket.emit('message',getMensaje)
    
    try {
      await addDoc(collection(db, "mensajes"), {
        texto: getMensaje,
        id: MensajeNuevo.from,
        fecha: fecha
      });
      // await addDoc(collection(db, "documentos"), {
      //   texto: "hola"
        
      // });

      
      
      setMensaje("");
    } catch (error) {
      console.error("Error al enviar mensaje: ", error);
    }
  };

  

  useEffect(() => {
    Recibir();
    socket.on('message', RecibirMensaje);

    return () => {
      socket.off('message', RecibirMensaje);
    }
  },[])

  useEffect(() => {
    scrollToBottom();
  }, [getMensajes]);

  const RecibirMensaje = (m) => setMensajes(state => [...state, m]);

  return (
    <div className="bg-zinc-800 text-white flex items-center justify-center ">
      <form onSubmit={Enviar} className="bg-zinc-400 items-center pb-10   w-full  flex flex-col ">
      
      <ul className="h-auto   mb-2 overflow-y-auto w-[90%]"> 
        {
          getMensajes.map((m, i) => (
           
            <>
            
            <li key={i} className={
              `my-2 p-2 rounded-[10px] flex  w-min  text-sm  ${m.from === 'Yo' ? 'bg-sky-700 ml-auto':'bg-black'}`
              }>
              <span className="w-min  flex items-center inline-flex h-[30px]">{m.cuerpo}</span>  
              <span className=" w-min  inline-block  h-fit mt-auto ml-3">{m.fecha}</span>
            </li></>
          ))
        }
        <div ref={endRef}></div>
      </ul>
        <input type="text" className="border-2 rounded-[10px] bg-gray-700  border-zinc-500  p-2 w-[90%] fixed bottom-0 mb-1" placeholder='write message'  onChange={(e)=> setMensaje(e.target.value)} value={getMensaje}/>
        
      </form>

      
    </div>
  )
}

export default App
