import React, { Component } from 'react';
import { ApiWebUrl } from '../utils';
import './Envios.css';
class Envios extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaEnvios: []
        }
    }

    componentDidMount(){
        const rutaServicio = ApiWebUrl + "servicioenvios.php";

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
                    listaEnvios: result
                })
            }
        )
    }

    dibujarTabla(datosTabla){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemEnvio =>
                    <tr key={itemEnvio.idempresaenvio}>
                        <td>{itemEnvio.idempresaenvio}</td>
                        <td>{itemEnvio.nombre}</td>
                        <td>{itemEnvio.telefono}</td>
                    </tr>
                    )}    
                </tbody>
            </table>
        )
    }
    render() {
        let contenidoTabla = this.dibujarTabla(this.state.listaEnvios)
        return (
            <section id="envios" className="padded">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Empresas de envío</h2>                        
                    </div>
                    <div className="col-md-8">
                        {contenidoTabla}
                    </div>
                </div>
            </div>
        </section>
        );
    }
}

export default Envios;