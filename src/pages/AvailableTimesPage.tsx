import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import type UnparsedBooking from '../interfaces/UnparsedBooking.ts';
import type ParsedBooking from '../interfaces/ParsedBooking.ts';
AvailableTimesPage.route = {
    path: '/available-times',
    menuLabel: 'Available timeslots',
    index: 5
};

export default function AvailableTimesPage() {

    const locale = 'SE-sv'
    const timeMarginHours: number = 2
    const [bookings, setBookings] = useState<ParsedBooking[]>([])
    // Date formatting: YYYY-MM-DDTHH:mm:ss (even if seconds are never used)
    // Example of url string that returns all bookings after time given.
    // api/bookings?WHERE=startTime>2025-09-12 12:00:00


    function parseBooking(item: UnparsedBooking): ParsedBooking {
        return {
            id: item.id,
            userId: item.userId,
            startTime: new Date(item.startTime.replace(" ", "T")),
            endTime: new Date(item.endTime.replace(" ", "T")),
            partySize: item.partySize
        }
    }

    function parseBookingList(items: UnparsedBooking[]): ParsedBooking[] {
        return items.map(parseBooking)
    }

    const currentDateTime = new Date()

    const bookableTime = new Date(currentDateTime.getTime());
    bookableTime.setHours(bookableTime.getHours() + timeMarginHours);
    const timeString = bookableTime.toLocaleString(locale)


    // Fetches all booked times that starts after current time + 2 hours, sets it to bookings <Booking[]>.
    useEffect(() => {
        fetch(`/api/bookings?WHERE=startTime>${timeString}`)
            .then((res) => res.json())
            .then((data: UnparsedBooking[]) => {
                setBookings(parseBookingList(data))
            })
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
                            <li key={booking.id}> Userid:{booking.userId} | Start time: {booking.startTime.toLocaleString(locale)}</li>
                        ))
                        : <h3>No available bookings</h3>
                    }
                </ul>
            </Col>
        </Row>

        {/* weekly view */}
        <Row>
            <Col>


            </Col>
        </Row>
    </>;
}