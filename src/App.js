import './App.css';
import Envios from './Inicio/Envios';
import MainBanner from './Inicio/MainBanner';
import Mensaje from './Inicio/Mensaje';
import Noticias from './Inicio/Noticias';
import Oficinas from './Inicio/Oficinas';

function App() {
  return (
    <div>
      <MainBanner/>
      <Mensaje/>
      <Noticias/>
      <Oficinas/>
      <Envios/>
    </div>
  );
}

export default App;
