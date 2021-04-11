import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./../context/GlobalContext";

function MainBar(props) {

  const { carrito, usuario, cerrarSesion } = useContext(GlobalContext);

  const sesionUsuario = () => {
    return usuario ? (
      <>
        <li className="nav-item d-flex align-items-center mr-2">
          <h3 className="m-0">Hola!, {usuario.nombres}</h3>
        </li>
        <li className="nav-item">
          <button
            onClick={() => cerrarSesion()}
            className="btn btn-outline-dark"
          >
            Salir
          </button>
        </li>
      </>
    ) : (
      <li className="nav-item">
        <Link to="/inicioSesion" className="btn btn-outline-info">
          Iniciar Sesion
        </Link>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          Tienda UNI
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="/#noticias">Noticias</a></li>
            <li className="nav-item"><a className="nav-link" href="/#oficinas">Oficinas</a></li>
            <li className="nav-item"><a className="nav-link" href="/#envios">Envíos</a></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/colaboradores">Colaboradores</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/empleados">Empleados</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/tienda">Tienda</Link></li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                Carrito <span className="badge bg-light text-dark">{carrito.length}</span>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tablas
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/categorias">Categorías</Link></li>
                <li><a className="dropdown-item" href="/">Proveedores</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Empresas envíos</a></li>
                <li><a className="dropdown-item" href="/">Empleados</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/">Clientes</a></li>
              </ul>
            </li>
            
            {sesionUsuario()}
            
          </ul>
       
        

        </div>
      </div>
    </nav>
  );
}

export default MainBar;
