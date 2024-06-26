import React from 'react';
import ilustracion from '/Ilustracionsobrenosotros.png';
import './../css/quienesSomos.css'

function QuienesSomos() {
  return (
    <>
      <section>
        <div className="contenedor-tarjeta2">
          <div className="tarjeta-grilla2">
            <div className="texto-sn">
              <div className="contenedor-texto">
                <h1>Quiénes somos</h1>
                <p className="parrafo">Somos un grupo de estudiantes de Desarrollo Web dedicados a innovar en el sector hotelero. Nuestra formación técnica y creativa nos impulsa a diseñar experiencias digitales intuitivas y atractivas, que invitan a los usuarios a comenzar su viaje hacia una estadía memorable.
                <br />
                <br />
                En nuestra plataforma, la funcionalidad se une con la hospitalidad, reflejando nuestro compromiso con la calidad y la atención al detalle. Como narradores digitales, ofrecemos un espacio donde cada reserva es el inicio de una experiencia única y personalizada.</p>
              </div>
            </div>
            <div className="contenedor-ilustracion">
              <img src={ilustracion} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default QuienesSomos;