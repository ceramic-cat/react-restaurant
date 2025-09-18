import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import type Booking from '../interfaces/Booking.ts'
AvailableTimesPage.route = {
    path: '/available-times',
    menuLabel: 'Available timeslots',
    index: 5
};

export default function AvailableTimesPage() {

    const locale = 'SV-se'
    const timeMarginHours = 2
    const [bookings, setBookings] = useState<Booking[]>([])
    // Date formatting: YYYY-MM-DD
    // Time formatting: HH:mm:ss (even if seconds are never used)
    // Example of url string that returns all bookings after time given.
    // api/bookings?WHERE=startTime>2025-09-12 12:00:00

    const currentDateTime = new Date()
    // add time margin to not overwhelm the restaurant
    const bookableTime = currentDateTime.setHours(currentDateTime.getHours() + timeMarginHours).toLocaleString(locale)

    // Fetches all booked times that starts after current time + 2 hours, sets it to bookings <Booking[]>.
    useEffect(() => {
        fetch(`/api/bookings?WHERE=startTime>${bookableTime}`)
            .then((res) => res.json())
            .then(data => setBookings(data))
    }, [])

    return <>
        <Row>
            <Col>
                <h2 className="text-primary">Available times</h2>
                <p>More here soon!</p>
                <ul>
                    {/* Testing to ensure filtering of dates work by rendering them to the page. */}
                    {bookings.length > 0 ?
                        bookings.map(booking => (
                            <li key={booking.id}> Userid:{booking.userId} | Start time: {booking.startTime}</li>
                        ))
                        : <h3>No available bookings</h3>
                    }
                </ul>
            </Col>
        </Row>
    </>;
}