import { Row, Col } from 'react-bootstrap';

BookingPage.route = {
    path: '/booking',
    menuLabel: 'Booking',
    index: 5
};


export default function BookingPage() {
    return <Row>
        <Col>
            <h2>Book</h2>

            <p>Booking will be available here soon.</p>
        </Col>
    </Row>
}