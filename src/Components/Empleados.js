import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import preloader from '../assets/loader.gif';
export default class Empleados extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaEmpleados: [],
            cargando: true
        }
    }
    componentDidMount(){
        const rutaServicio =  ApiWebUrl + "servicioempleados.php";

        fetch(rutaServicio)
        .then(
            res => res.json()
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result) => {
                console.log(result);
                //La variable result contiene los datos que envia el servicio web
                this.setState({
                    listaEmpleados: result,
                    cargando: false
                })
            }
        )
    }

    dibujarCuadricula(datosTabla){
        return(
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {datosTabla.map(itemEmpleado =>
                    <div className="col"  key={itemEmpleado.idempleado}>
                        <div className="card">
                        <img src={ApiWebUrl + "fotos/" + itemEmpleado.foto} className="card-img-top" alt= {itemEmpleado.nombres}/>
                        <div className="card-body">
                            <h5 className="card-title">{itemEmpleado.tratamiento} {itemEmpleado.nombres} {itemEmpleado.apellidos}</h5>
                            <h6 className="card-title">{itemEmpleado.cargo}</h6>
                            <p className="card-text">{itemEmpleado.pais} / {itemEmpleado.ciudad} / {itemEmpleado.direccion} / {itemEmpleado.telefono}</p>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    render() {
        let contenidoCuadricula = this.state.cargando ?
            <img src={preloader} alt=""/>
            :this.dibujarCuadricula(this.state.listaEmpleados)
        return (
            <section id="envios" className="padded">
            <div className="container">
                <div className="row">
                    <h2>Empleados</h2>
                    {contenidoCuadricula}                        
                </div>
            </div>
        </section>
        );
    }
}