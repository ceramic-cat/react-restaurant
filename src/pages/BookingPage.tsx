import { Row, Col } from 'react-bootstrap';

BookingPage.route = {
    path: '/booking',
    menuLabel: 'Booking',
    index: 5
};


export default function BookingPage() {

    // interface Booking {
    //     id: number;
    //     user_id: number;
    //     start_time: Date;
    //     end_time: Date;
    //     party_size: number;

    // }


    return <Row>
        <Col>
            <h2>Book</h2>

            <p>Booking will be available here soon.</p>

        </Col>
    </Row>
}