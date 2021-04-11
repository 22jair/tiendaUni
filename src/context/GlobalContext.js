import { createContext, Component } from "react";

export const GlobalContext = createContext();

export class GlobalProvider extends Component {

  state = {
    carrito: [],
    usuario: null
  };

  // CARRITO
  buscarProductoIndex = (producto) => {
    let carrito = this.state.carrito;
    //findIndex() si no encuentra retorna: -1
    return carrito.findIndex( (p) => p.idproducto === producto.idproducto );
  };

  agregarProducto = (producto) => {

    let carrito = this.state.carrito;
    const pIndex = this.buscarProductoIndex(producto);
    
    if (pIndex !== -1) {
      carrito[pIndex].cantidad += 1
      alert("El producto ya existe, se aumento +1:\n Cantidad actual: " + carrito[pIndex].cantidad)
    } else {
      carrito = [ ...carrito, { ...producto, cantidad: 1 }  ]
    }

    this.setState({...this.state, carrito });
  };

  removerProducto = (producto) => {
    let carrito = this.state.carrito
    this.setState({
      ...this.state,
      // con filter seteamos todos los productos diefente al producto.idproducto
      carrito: carrito.filter( p => p.idproducto !== producto.idproducto )
    })
  }
  
  vaciarCarrito = () => {
    this.setState({ carrito: [] });
  };

  // USUARIO
  iniciarSesion = (usuario) => {
    this.setState({
      ...this.state,
      usuario: usuario
    })
  }

  cerrarSesion = () => {
    this.setState({
      ...this.state,
      usuario: null
    })
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{          
          // Carrito ******
          carrito: this.state.carrito,
          agregarProducto: this.agregarProducto,
          vaciarCarrito: this.vaciarCarrito,
          removerProducto: this.removerProducto,
          // Usuario ******
          usuario: this.state.usuario,
          iniciarSesion: this.iniciarSesion,
          cerrarSesion: this.cerrarSesion
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
