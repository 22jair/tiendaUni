import React, { Component } from 'react';
import { ApiWebUrl } from '../../utils';
import './Categorias.css';
import $ from "jquery/dist/jquery";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { bootstrap } from 'bootstrap/dist/js/bootstrap.bundle';

class Categorias extends Component {
    constructor(props){
        super(props)
        this.state = {
            listaCategorias: [],
            nombre: "",
            descripcion: ""
        }
    }

    componentDidMount(){
        this.leerCategorias();
    }
    leerCategorias(){
        const rutaServicio =  ApiWebUrl + "serviciocategorias.php";

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
                    listaCategorias: result
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
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemCategoria =>
                    <tr key={itemCategoria.idcategoria}>
                        <td>{itemCategoria.idcategoria}</td>
                        <td>{itemCategoria.nombre}</td>
                        <td>{itemCategoria.descripcion}</td>
                        <td><FontAwesomeIcon className="fa-pen" icon={faPen} 
                            onClick={() => this.mostrarFormularioActualizar(itemCategoria)}/></td>
                        <td><FontAwesomeIcon className="fa-times" icon={faTimes}/></td>
                    </tr>
                    )}    
                </tbody>
            </table>
        )
    }

    mostrarFormularioActualizar(itemCategoria){
        console.log(itemCategoria)
        var myModal = new bootstrap.Modal(document.getElementById('modalActualizar'))
        myModal.show()
    }

    dibujarModal(){
        return(
            <div className="modal fade" id="modalActualizar" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    dibujarFormularioAgregar(){
        return(
            <div id="formulario-agregar">
                <form onSubmit={this.categoriasInsertar}>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Nombre" id="txtNombre"
                        onChange = { (e) => this.setState({ nombre: e.target.value}) }
                        required minLength="3" maxLength="15"/>
                    </div>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Descripción" id="txtDescripcion"
                        onChange = { (e) => this.setState({ descripcion: e.target.value}) }
                        required minLength="3"/>
                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                        <button type="button" className="btn btn-primary" onClick={this.ocultarFormularioAgregar}>Cerrar</button>
                    </div>
                </form>
            </div>
        )
    }
    categoriasInsertar = (e) =>{
        e.preventDefault();

        const rutaServicio =  ApiWebUrl + "registrarcategorias.php";

        var formData = new FormData();
        formData.append("nombre", this.state.nombre)
        formData.append("descripcion", this.state.descripcion)

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        } )
        .then(
            res => res.text()
            //Asi se indica que los valores que devuelve el servicio estarán en formato JSON
        )
        .then(
            (result) => {
                console.log(result);
                //La variable result contiene los datos que envia el servicio web
                alert("Se ha agregado una nueva categoría con el id: " + result);
                this.ocultarFormularioAgregar();
                this.leerCategorias();
                this.setState({ nombre: "" });
                this.setState({ descripcion: "" }); 
                document.getElementById("txtNombre").value = ""
                document.getElementById("txtDescripcion").value = ""
            }
        ) 

    }
    ocultarFormularioAgregar = () => {
        //document.getElementById("formulario-agregar").style.display = "none";
        $("#formulario-agregar").slideUp('fast')
    }
    mostrarFormularioAgregar = () => {
        //document.getElementById("formulario-agregar").style.display = "block";
        $("#formulario-agregar").slideDown('fast')
    }
    render() {
        let contenidoCategorias = this.dibujarTabla(this.state.listaCategorias)
        let contenidoFormularioAgregar = this.dibujarFormularioAgregar();
        let contenidoModal = this.dibujarModal();
        return (
            <section id="tabla-categorias" className="padded">
                <div className="container">
                    <h2>Tabla Categorías</h2>
                    <div className="mb-2">
                        <button type="button" className="btn btn-primary" onClick={this.mostrarFormularioAgregar}>Nueva categoría</button>
                    </div>
                    {contenidoFormularioAgregar}                   
                    {contenidoCategorias}
                </div>
                {contenidoModal}
            </section>
        );
    }
}





export default Categorias;