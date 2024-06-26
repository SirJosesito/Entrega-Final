import React from 'react';
import  AddHotelForm from '../componentes-de-admin/addHotelForm';
import AddTipoAlojamiento from '../componentes-de-admin/addTipoAlojamiento';
import AdminImagenes from '../componentes-de-admin/adminImagenes';
import AdminServicios from '../componentes-de-admin/adminServicios';
// import TablaAlojamientos from '../componentes-de-admin/tablaAlojamientos';
import TablaAlojamientosCopy from '../componentes-de-admin/tablaAlojamientoscopy';

function Administracion() {
    return ( <>
        <AddTipoAlojamiento></AddTipoAlojamiento>
        <AddHotelForm></AddHotelForm>
        <TablaAlojamientosCopy/> 
        {/* <TablaAlojamientos/> */}
        <AdminImagenes/>
        <AdminServicios/>
    </> );
}

export default Administracion;