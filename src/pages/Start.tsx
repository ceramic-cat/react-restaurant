import { Row, Col } from 'react-bootstrap';
import Image from '../parts/Image';

Start.route = {
  path: '/',
  menuLabel: 'Start',
  index: 1
}

export default function Start() {
  return <Row>
    <Col>
      <h2>React Restaurant</h2>
      <Image
        src="/images/kitchen.jpg"
        alt="A runner's legs and hands at the starting line of a track race."
      />
      <p>The start page of my application. Change soon.</p>
    </Col>
  </Row>
}