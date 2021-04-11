import React from 'react';
import arequipa from '../assets/oficinas/arequipa.jpg';
import bogota from '../assets/oficinas/bogota.jpg';
import chile from '../assets/oficinas/chile.jpg';
import lima from '../assets/oficinas/lima.jpg';
import mexico from '../assets/oficinas/mexico.jpg';
import piura from '../assets/oficinas/piura.jpg';

function Oficinas(props) {
    return (
        <section id="oficinas" className="padded">
            <div className="container">
                <h2>Oficinas</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae explicabo amet nam minus accusamus reiciendis sit atque saepe veritatis id reprehenderit eum hic adipisci, modi optio ab ratione dolore quaerat!</p>
                <div className="row">    
                    <div className="col-lg-4">
                        <h3>Arequipa</h3>
                        <img src={arequipa} alt="" className="img-fluid"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, illum quod fuga assumenda tempora aliquid.</p>
                    </div>
                    <div className="col-lg-4">
                        <h3>Bogotá</h3>
                        <img src={bogota} alt="" className="img-fluid"/>
                        <p>Atque soluta, impedit sed culpa, voluptas sit non perferendis debitis similique quod animi veniam earum.</p>
                    </div>
                    <div className="col-lg-4">
                        <h3>Santiago</h3>
                        <img src={chile} alt="" className="img-fluid"/>
                        <p>Totam beatae amet est ut aperiam esse odit assumenda pariatur, animi non, fugiat minus praesentium!</p>
                    </div>
                    <div className="col-lg-4">
                        <h3>Lima</h3>
                        <img src={lima} alt="" className="img-fluid"/>
                        <p>Assumenda et sunt dolor officia ex a inventore possimus, eius, quia blanditiis earum iste praesentium?</p>
                    </div>
                    <div className="col-lg-4">
                        <h3>Mexico DF</h3>
                        <img src={mexico} alt="" className="img-fluid"/>
                        <p>Explicabo, sint hic sapiente praesentium aliquid at ipsam, consequatur deserunt dicta blanditiis mollitia quia temporibus!</p>
                    </div>
                    <div className="col-lg-4">
                        <h3>Piura</h3>
                        <img src={piura} alt="" className="img-fluid"/>
                        <p>Itaque tenetur sapiente dolorum consectetur. Placeat officiis delectus odio libero voluptatum minus qui quam dolor.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Oficinas;