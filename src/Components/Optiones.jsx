import { v4 as randomId } from 'uuid';
import { useState,useEffect} from "react";
function Optiones({
  setTextBot,
  setBotStyles,
  botStyles,
  setTextTop,
  setTopStyles,
  topStyles,
  arrayImgLocal,
  setImgACTUAL
  
}) {
  
  const [plantillaAMostrar,setPlantillaAMostrar] = useState(true)
  const [localeState, setLocaleState] = useState([])

  const eliminarPlantilla =(id)=>{
    const plantillas = JSON.parse(localStorage.getItem('images'))
    const plantillasUpdated = plantillas.filter((planta)=>planta.id !== id)
    localStorage.setItem('images',JSON.stringify(plantillasUpdated))
    setLocaleState(plantillasUpdated)
    
  }

  const imagenesLocal =(e)=>{
    const imagenes = e.target.files
    for(const imagen of imagenes){
      const reader = new FileReader()

      reader.readAsDataURL(imagen)

      reader.addEventListener('load',()=>{
        const imgArray = localStorage.getItem('images')
        let images = []

        if(imgArray){
          images = [...JSON.parse(imgArray)]
          let resultado = reader.result
          let id = randomId()
          images.push({resultado,id})
        }else{
          let resultado = reader.result
          let id = randomId()
          images.push({resultado,id})
        }
        localStorage.setItem('images',JSON.stringify(images))
        setLocaleState(images)
      })
    }
  }
  let arrayDeImgs
  
  arrayDeImgs = JSON.parse(localStorage.getItem('images'))
  const crearDiv=()=>{
    if(localStorage.getItem('images')){
      
      if(localStorage.getItem('images').length>2){
        return arrayDeImgs.map((img,i)=>{
    
          return<div onClick={(e)=>{
            setImgACTUAL(e.target.style.backgroundImage)
      
          }}
          
          key={img.id} style={{
            backgroundImage: `url(${img.resultado})`,
            cursor: 'pointer'
          }} className="img-plantilla">
            <button onClick={()=>{
              eliminarPlantilla(img.id)
            }} className="plantilla-btn">X</button>
          </div>
          })
      }else{
        return <h1 className='no-plantas'>Sube tus plantillas para verlas aquí</h1>
      }
  }
}

  useEffect(()=>{
    crearDiv()
  },[localeState])
  
 
 
  const [menuAbrir, setMenu] = useState(false);

  
  return (
    <div className="options-container">
      <div className="seccion-option">
        <h3 className="seccion-title">Seccion Superior</h3>
        <div className="inputs">
          <span>Texto</span>
          <input
            onChange={(e) => {
              setTextTop(e.target.value);
            }}
            type="text"
          ></input>
          <span>Tamaño de letra</span>
          <input
            onChange={(e) => {
              setTopStyles({
                ...topStyles,
                fontSize: e.target.value + "px",
              });
            }}
            name="fontSize"
            min={12}
            max={40}
            type="range"
          ></input>
          <span>Color de letra</span>
          <input
            onChange={(e) => {
              setTopStyles({
                ...topStyles,
                color: e.target.value,
              });
            }}
            name="color"
            type="color"
          ></input>
          <span>Color de fondo</span>
          <input
            onChange={(e) => {
              setTopStyles({
                ...topStyles,
                background: e.target.value,
              });
            }}
            name="background"
            type="color"
          ></input>
        </div>
      </div>
      <div className="seccion-option seccion-img">
        <h3 className="seccion-title">Seccion Imagen</h3>
        <label className="plantilas-btn" htmlFor="menu">
          Plantillas
        </label>
        <input
          id="menu"
          name="menu"
          style={{
            display: "none",
          }}
          className="plantilas-btn"
          type="button"
          onClick={(e) => {
            
            setMenu(true);
            
          }}
        ></input>

        <span
          style={{
            display: "block",
          }}
        >
          Sube tu plantilla
        </span>
        <input
          className="sube-file"
          accept="image/png, image/jpeg, image/webp, image/jpg"
          onChange={(e) => {
            
            imagenesLocal(e)
          }}
          type="file"
          multiple
        ></input>

        <div className="plantillas-container"
        style={{
          position: 'relative',
          top: '-205px',
          transform: menuAbrir ? "scale(1)" : "scale(0)"
        }}>
          <input
            onClick={() => {
              setMenu(false);
            }}
            value={"X"}
            id="menu-cerrar"
            type="button"
          ></input>
          <div className="plantas-botones">
            <button style={{
              background: plantillaAMostrar ?'#a57987' :'#dbabbb'
            }}
            className="plantas-btn local-btn" onClick={()=>{
              setPlantillaAMostrar(true)
            }}>Locales</button>
            <button style={{
              background: !plantillaAMostrar ?'#a57987' :'#dbabbb'
            }}
             className="plantas-btn user-btn" onClick={()=>{
              setPlantillaAMostrar(false)
            }}>Usuario</button>
          </div>
          
          <div className="plantas-locales">
            <div style={{
              zIndex: plantillaAMostrar ?'1':'-1',
              overflow: 'hidden',
              gridTemplateColumns: 'repeat(3,92px)'
              
            }} className="plantillas">
              {
                arrayImgLocal.map((img,i)=>{
                  return(<div onClick={(e)=>{
                    setImgACTUAL(e.target.style.backgroundImage)
                    
                  }}
                    
                    key={i} style={{
                      backgroundImage: `url(${img})`,
                      cursor: 'pointer'
                    }} className="img-plantilla"></div>
                  )
                })
              }
            </div>
          </div>
          <div className="plantas-user">
              <div className="plantillas">
              {
               crearDiv()
              }
              </div>
          </div>
          
        </div>
      </div>
      <div className="seccion-option">
        <h3 className="seccion-title">Seccion Inferior</h3>
        <div className="inputs">
          <span>Texto</span>
          <input
            onChange={(e) => {
              setTextBot(e.target.value);
            }}
            type="text"
          ></input>
          <span>Tamaño de letra</span>
          <input
            onChange={(e) => {
              setBotStyles({
                ...botStyles,
                fontSize: e.target.value + "px",
              });
            }}
            name="fontSize"
            min={12}
            max={40}
            type="range"
          ></input>
          <span>Color de letra</span>
          <input
            onChange={(e) => {
              setBotStyles({
                ...botStyles,
                color: e.target.value,
              });
            }}
            name="color"
            type="color"
          ></input>
          <span>Color de fondo</span>
          <input
            onChange={(e) => {
              setBotStyles({
                ...botStyles,
                background: e.target.value,
              });
            }}
            name="background"
            type="color"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Optiones;

