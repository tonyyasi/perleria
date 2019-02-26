import * as React from 'react';
import {Header} from '../Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const pStyle = {
  textAlign: 'justify',
  marginBottom: '20px'
};

const h2Style = {
  textAlign: 'center',
  marginBottom: '30px',
  marginTop: '20px'
};

export const About= () => (
        <div >
        <Header />
        <h2 style={h2Style}>¿Quienes Somos?</h2>
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <p style={pStyle}>
            Somos madre e hija, amantes de las perlas y las joyas. Juntas elegimos cuidadosamente nuestros productos y nos divertimos mucho en el proceso.
            Vendemos hilos de perlas para hacer joyería, broches finos, aretes para armar y tenemos una pequeña colección de joyería en perlas hechas por nosotras.
            Contamos con la certificación como valuadoras de perlas, curso impartido por el GIA (Gemological Institute of America).
            </p>

            <p style={pStyle}>
            Contamos con un amplio inventario, las fotos que encuentras en nuestra página es sólo un pequeño muestrario. Acerca de nuestros productos:
            </p>

            <p style={pStyle}>
            <text style={{fontWeight: "bold"}}>Perlas facetadas:</text>
            Pasan por un proceso de cortes y púlido que les brindan un brillo hermoso, parecido al cristal.
            </p>

            <p style={pStyle}>
            <text style={{fontWeight: "bold"}}>Perlas estilo Kasumi:</text>
            Asemejan en su apariencia a las finisímas perlas japonesas Kasumi.
            </p>
            <p style={pStyle}>
            <text style={{fontWeight: "bold"}}>Perlas barrocas:</text>
            Tienen formas irregulares lo que las hace únicas.
            </p>
            </Col>
          </Row>
        </Container>;
        </div>
)