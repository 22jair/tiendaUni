import React, { Component } from "react";
import Swal from "sweetalert2";
import { ApiWebUrl } from "./../utils/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//Context: 1
import { GlobalContext } from "./../context/GlobalContext";

export default class Carrito extends Component {
  //Context: 2
  static contextType = GlobalContext;

  componentDidMount() {}

  vaciarCarrito = () => this.context.vaciarCarrito();

  removerProducto = (producto) => this.context.removerProducto(producto);

  handleSumTotal = () => {
    const carrito = this.context.carrito;
    let sum = 0;
    for (let i in carrito) {
      sum += parseInt(carrito[i].precio) * carrito[i].cantidad;
    }
    return sum;
  };

  dibujarCarrito(datosCarrito) {
    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>CodProducto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datosCarrito.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-5">
                  ππ’π°π₯Ίπ­βΉοΈπ
                  <br />
                  Agrege productos al carrito.
                </td>
              </tr>
            ) : (
              datosCarrito.map((item) => (
                <tr key={item.idproducto}>
                  <td>{item.idproducto}</td>
                  <td>{item.nombre}</td>
                  <td>{item.precio}</td>
                  <td>{item.cantidad}</td>
                  <td>{(item.precio * item.cantidad).toFixed(2)}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="producto_icon-trash"
                      style={{ cursor: "pointer" }}
                      onClick={() => this.removerProducto(item)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => this.vaciarCarrito()}
        >
          Vaciar carrito
        </button>
      </>
    );
  }

  dibujarPagoTotal() {
    let sumaPagoTotal = this.handleSumTotal();

    return (
      <div className="card text-center">
        <div className="card-header">Pago Total</div>
        <div className="card-body">
          {/*  muestra una maskara de 00 para el bolean */}
          <h5 className="card-title" style={{ fontFamily: "Monospace" }}>
            {/* S/. {this.state.pagoTotal.toFixed(2)}{" "} */}
            {sumaPagoTotal}
          </h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>

          {sumaPagoTotal > 0 ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.validarProcesoPago()}
            >
              Procesar Pago
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  validarProcesoPago() {
    if (!this.context.usuario)
      return Swal.fire({
        title: "Error:",
        text: "Por favor inicie sesiΓ³n.",
        confirmButtonText: "Ok",
        icon: "error",
      });

    const pedidosDetalles = [];
    //arreglamos los datos para el json
    this.context.carrito.forEach((producto) => {
      pedidosDetalles.push({
        idproducto: producto.idproducto,
        precio: producto.precio,
        cantidad: producto.cantidad,
      });
    });
    //guardamos el dato en la bd
    this.procesarPago(10, this.context.usuario.idcliente, pedidosDetalles);
  }

  procesarPago(idempleado, idcliente, pedidosDetalles) {
    const ruta = ApiWebUrl + "insertarpedidostodo.php";

    var formData = new FormData();
    formData.append("idempleado", idempleado);
    formData.append("idcliente", idcliente);
    formData.append("pedidosdetalles", JSON.stringify(pedidosDetalles));

    fetch(ruta, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        //obtenemos el id tipo nΓΊmero
        if (typeof response === "number") {
          //limpiamos el carrito
          this.context.vaciarCarrito();
          Swal.fire({
            title: "Mensaje:",
            text: "Se grabo el pedido exitosamente: #" + response,
            confirmButtonText: "Ok",
            icon: "success",
          });
        } else {
          alert("Error con el pedido");
        }
      });
  }

  render() {
    return (
      <section id="carrito" className="padded">
        <div className="container">
          <h2>Carrito</h2>
          <div className="row">
            <div className="col-md-8" >{this.dibujarCarrito(this.context.carrito)}</div>
            <div className="col-md-4">{this.dibujarPagoTotal()}</div>
          </div>
        </div>
      </section>
    );
  }
}
