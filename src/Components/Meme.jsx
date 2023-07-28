import "./Meme.sass";
import html2canvas from "html2canvas";
import Optiones from "./Optiones";
import { useState, useEffect } from "react";
import baby from "../assets/imgs/baby.webp";
import buzz from "../assets/imgs/buzz.webp";
import fire from "../assets/imgs/fire.webp";
import homis from "../assets/imgs/homis.webp";
import int from "../assets/imgs/int.webp";
import phi from "../assets/imgs/phi.webp";
import sponge from "../assets/imgs/sponge.webp";

function Meme() {
  const [texttop, setTextTop] = useState("TEXTO SUPERIOR");
  const [textbot, setTextBot] = useState("TEXTO INFERIOR");

  const [topStyles, setTopStyles] = useState({
    fontSize: "25px",
    color: "#000",
    background: "#fff",
  });
  const [botStyles, setBotStyles] = useState({
    fontSize: "25px",
    color: "#000",
    background: "#fff",
  });

  let arrayImgLocal = [sponge, baby, buzz, fire, homis, int, phi];

  function downloadImage() {
    let canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    a.href = dataURL;
    a.download = "canvas-download.jpeg";
    a.click();
  }
  const [imgACTUAL, setImgACTUAL] = useState();

  function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }

  
  function imprimirAArchivo(div) {
    html2canvas(div).then(function (canvas) {
      let miImagen = canvas.toDataURL("image/png");
      downloadURI("data:" + miImagen, "tu-meme.png");
    });
  }

  const [memeADescargar, setmemeADescargar] = useState();
  useEffect(() => {
    let momazo = document.getElementById("meme-descargar");
    setmemeADescargar(momazo);
  }, []);

  useEffect(()=>{
    console.log(imgACTUAL)
  })
  const checarImg=()=>{
    if(imgACTUAL==undefined){
      return(<span className="no-imgs">Selecciona una plantilla</span>)
    }
  }
  
  return (
    <div className="meme-container">
      <div id="meme-descargar" className="meme-creado">
        <h3 className="meme-text text-top" style={topStyles}>
          {texttop}
        </h3>
        <div
          className="meme-img"
          style={{
            backgroundImage: `${imgACTUAL}`,
          }}
          alt="meme-img"
        >{
          checarImg()
        }</div>
        <h3 className="meme-text text-bottom" style={botStyles}>
          {textbot}
        </h3>
      </div>
      <input
        onClick={() => {
          imprimirAArchivo(memeADescargar);
        }}
        type="button"
        id="descarga-btn"
        value="Descargar Meme"
      ></input>
      <Optiones
        setTextTop={setTextTop}
        setTopStyles={setTopStyles}
        topStyles={topStyles}
        baby={baby}
        setTextBot={setTextBot}
        setBotStyles={setBotStyles}
        botStyles={botStyles}
        arrayImgLocal={arrayImgLocal}
        setImgACTUAL={setImgACTUAL}
      />
    </div>
  );
}

export default Meme;
