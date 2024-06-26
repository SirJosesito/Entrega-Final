import React from 'react';
import contacto from '/ilustracioncontacto.png';
import './../css/contacto.css'

function Contacto() {
    return ( <>
    <div className="contenedor-tarjeta">
        <div className="tarjeta-contacto">
          <div>
            <h1>Suscribite a nuestro newsletter</h1>
          </div>
          <div className="tarjeta-grilla">

            <div className="contenedor-ilustracion">
              <img src={contacto} />
            </div>

            <div className="contenedor-formulario">
              <form>
                <label className="titulares">Nombre</label>
                <input className="cajas1" type="text" placeholder="Ingrese su nombre" />

                <label className="titulares">Email</label>
                <input className="cajas1" type="email" placeholder="Ingrese su email" />

                <label className="titulares">Teléfono</label>
                <input className="cajas1" type="text" placeholder="Ingrese su número de teléfono" />

                <label className="titulares">Comentario</label>
                <textarea className="textarea-fija" rows="6" cols="50" placeholder="Ingrese su duda"></textarea>

                <div id="checkbox">
                  <input className="cajas1" type="checkbox" />
                  <label>Acepto los términos y condiciones.</label>
                </div>

                <input type="submit" className="btn" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </> );
}

export default Contacto;