import React, { Component } from "react";
import { ApiWebUrl } from "./../utils";
import Swal from "sweetalert2";

//Context: 1
import { GlobalContext } from "./../context/GlobalContext";

export default class InicioSesion extends Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);
    this.state = {
      usuario: "ALFKI",
      clave: "12209",
    };
  }

  componentDidMount() {
    console.log(this.context.usuario);
    // if(!this.context.usuario) this.props.history.push('/tienda')
  }

  iniciarSesion = () => {
    if (this.state.usuario === "") return alert("Ingrese Usuario");
    if (this.state.clave === "") return alert("Ingrese Clave");

    const ruta = ApiWebUrl + "iniciarsesion.php";

    var formData = new FormData();
    formData.append("usuario", this.state.usuario);
    formData.append("clave", this.state.clave);

    fetch(ruta, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => this.verificarIncioSesion(response));
  };

  verificarIncioSesion =  (response) => {
    if (response === -1) return alert("Usuario Incorrecto");
    if (response === -2) return alert("Clave Incorrecta");

    // console.log(response);
    this.context.iniciarSesion(response[0]);
    Swal.fire({
      title: `Bienvenido: ${response[0].nombres}`,
      html: "Será redirigido en 2 segundos",
      timer: 2000,
      timerProgressBar: true,
    }).then((result) => {
      this.props.history.push("/tienda");
    });
  };

  render() {
    return (
      <section id="inicioSesion" className="padded">
        <div className="container">
          <div className="w-50 m-auto">
            <h2>Inicio Sesión</h2>

            <form>
              <div className="mb-3">
                <label>Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.usuario}
                  onChange={(e) => this.setState({ usuario: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Clave</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={this.state.clave}
                  onChange={(e) => this.setState({ clave: e.target.value })}
                />
              </div>

              <button
                type="button"
                className="btn btn-dark"
                onClick={this.iniciarSesion}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
