import React, { Component } from 'react';
import { ColaboradesData } from '../dataLocal';

class Colaboradores extends Component {

    constructor(props){
        super(props)
        this.state = {
            listaColaboradores: [],
            ganadorSorteo: "",
            colaboradorSeleccionado: ""
        }
    }

    componentDidMount(){
        let aleatorio = Math.floor(Math.random()*ColaboradesData.length)
        console.log(aleatorio)
        this.setState({
            listaColaboradores: ColaboradesData,
            ganadorSorteo: ColaboradesData[aleatorio]
        })
        console.log(ColaboradesData)
    }

    mensajeColaborador(){
        return(
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus nihil reprehenderit velit, maxime culpa atque autem cumque aliquid libero porro eos odit eius accusantium quasi. Earum eius, id quibusdam velit illum facilis maxime voluptas quas ea numquam, eveniet commodi saepe, eos fuga ipsa distinctio laborum quia quos exercitationem est aspernatur illo eligendi. Beatae quam accusamus dolorum tempore rerum minima, velit, laborum unde doloribus delectus a excepturi officiis fugiat quisquam ipsa impedit nisi corrupti minus sit atque quos deserunt, neque vel itaque. Nam natus perferendis laudantium delectus dignissimos doloremque adipisci, dicta explicabo, sit quod, ad recusandae aperiam? Aut veniam nam voluptatum!
            </p>
        )
    }
    dibujarTabla(datosTabla){
        return(
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Nombres</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemColaborador =>
                    <tr key={itemColaborador.id} id={"tr-colaborador-" + itemColaborador.id}
                        onClick={() => this.seleccionarColaborador(itemColaborador)}>
                        <td>{itemColaborador.id}</td>
                        <td>{itemColaborador.nombres}</td>
                        <td>{itemColaborador.cargo}</td>
                    </tr>
                    )}    
                </tbody>
            </table>
        )
    }
    seleccionarColaborador(itemColaborador){
        console.log(itemColaborador)
        if(this.state.colaboradorSeleccionado !== ""){    
            document.getElementById("tr-colaborador-" + this.state.colaboradorSeleccionado.id).classList.remove("table-info");
        }
        this.setState({
            colaboradorSeleccionado: itemColaborador
        })
        document.getElementById("tr-colaborador-" + itemColaborador.id).classList.add("table-info");
        //classList.add se añade al objeto la clase que se indica
    }

    mostrarColaborador(){
        var colaborador = this.state.colaboradorSeleccionado
        console.log('../' + colaborador.foto)
        return(
            <div>
                <img src={require('./../' + colaborador.foto).default} className="img-fluid" alt={colaborador.nombres}/>
                <h4>{colaborador.nombres}</h4>
                <p>{colaborador.cargo}<br/>
                {colaborador.ciudad}</p>
            </div>
        )
    }
    render() {
        let titulo = <h2>Colaboradores</h2>
        let contenido = this.mensajeColaborador()
        let contenidoTabla = this.dibujarTabla(this.state.listaColaboradores)
        let nombreGanador = this.state.ganadorSorteo.nombres
        let contenidoColaborador = this.state.colaboradorSeleccionado !== ""
            ? this.mostrarColaborador()
            :null
        return (
            <section id="colaboradores" className="padded">
                <div className="container">
                    {titulo}                    
                    {contenido}
                    <div className="row">
                        <div className="col-md-8">
                            {contenidoTabla}
                            El sorteo lo gano <strong>{nombreGanador}</strong>&nbsp; 
                            ({this.state.ganadorSorteo.cargo})
                        </div>
                        <div className="col-md-4">
                            {contenidoColaborador}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Colaboradores;