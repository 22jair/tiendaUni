import React, { Component } from 'react'
import { ApiWebUrl } from './../utils';

import Swal from 'sweetalert2'

export default class InicioSesion extends Component {

    constructor(props){
        super(props)
        this.state = {
            usuario: "ALFKI",
            clave: "12209"
        }
  
    }

    componentDidMount(){
        console.log(this.context.usuario)
        // if(!this.context.usuario) this.props.history.push('/tienda')
    }

    iniciarSesion = () => {
        
        if( this.state.usuario === "" ) return alert("Ingrese Usuario")
        if( this.state.clave === "" ) return alert("Ingrese Clave")
        
        const ruta = ApiWebUrl+"iniciarsesion.php";

        var formData = new FormData();
        formData.append('usuario', this.state.usuario);
        formData.append('clave', this.state.clave);

        fetch(ruta,{
            method: 'POST', 
            body: formData,
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => this.verificarIncioSesion(response));


     }

     verificarIncioSesion = (response) =>{

        if(response === -1) return alert("Usuario Incorrecto")
        if(response === -2) return alert("Clave Incorrecta")

        // si existe guardamos
        localStorage.setItem('TRUsuario',JSON.stringify(response[0]));      

          Swal.fire({
            title: `Bienvenido: ${response[0].nombres}`,
            html: 'Será redirigido en 2 segundos',
            timer: 2000,
            timerProgressBar: true,        
          }).then((result) => {                    
                
                //Relogeamos la pagina, como ya existe un usuario lo enviara a catalogo
                window.location.reload(false);
              }
        )


     }

    
    render() {
        
        return (
            <section id="inicioSesion" className="padded">
                <div className="container">
                    
                    <div className="w-50 m-auto">
                    <h2>Inicio Sesión</h2>

                        <form>
                        <div class="mb-3">
                            <label>Usuario</label>
                            <input type="text" className="form-control" required
                                    value={this.state.usuario}
                                    onChange={ (e) => this.setState({ usuario: e.target.value }) }
                            />
                            
                        </div>
                        <div class="mb-3">
                            <label>Clave</label>
                            <input type="password" className="form-control" required
                                    value={this.state.clave}
                                    onChange={ (e) => this.setState({ clave: e.target.value }) }
                            />
                        </div>

                        <button type="button"  className="btn btn-dark" onClick={this.iniciarSesion}>Submit</button>
                        </form>

                    </div>
                    
                </div>
            </section>
        )
    }
}
