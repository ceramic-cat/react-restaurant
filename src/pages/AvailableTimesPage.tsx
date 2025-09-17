import { Row, Col } from 'react-bootstrap';

AvailableTimesPage.route = {
    path: '/available-times',
    menuLabel: 'Available timeslots',
    index: 5
};

export default function AvailableTimesPage() {
    return <>
        <Row>
            <Col>
                <h2 className="text-primary">Available times</h2>
                <p>More here soon!</p>

                {/* 
                fetch bookings for after today
                render all the day in the current week, with different times depending on the availability
                create timeslots based on https://stackoverflow.com/questions/8856266/linq-aggregate-and-group-by-periods-of-time , but in typescript.
            
            consider using regex for datetime to ensure formatting for creating and reading from database.


            */}
            </Col>
        </Row>
    </>;
}