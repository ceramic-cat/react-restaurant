import { useEffect, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import type UnparsedBooking from '../interfaces/UnparsedBooking.ts';
import type ParsedBooking from '../interfaces/ParsedBooking.ts';
AvailableTimesPage.route = {
    path: '/available-times',
    menuLabel: 'Available timeslots',
    index: 5
};

export default function AvailableTimesPage() {

    const locale = 'SV-se'
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

    const today = new Date()

    const bookableTime = new Date(today.getTime());
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

    // -- Making weeks --
    const currentWeekday = today.getDay()
    const daysToMonday = (currentWeekday + 6) % 7
    const monday = new Date(today)
    monday.setDate(today.getDate() - daysToMonday)

    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        return date
    })

    const currentWeek = false

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
                <Container>
                    <Row>
                        {
                            // dagsiffra från getDay() 0: sön, 6 lördag
                            // hitta resten av veckans dagar
                            // foreach -> kolla ifall i=1 är datum siffra. (bryr mig inte om söndag, det får vara default)
                            // Om mindre än idags siffra, generera datum
                            // -> ex dag 6/6 är tisdag -> dag 1 5/6 -> setDay(date.getday - i)

                            weekDates.map((date, id) => (
                                <Col key={id}>{date.toLocaleDateString(locale, {
                                    weekday: 'narrow',
                                    day: 'numeric',
                                    month: 'numeric'
                                })}</Col>
                            ))
                        }

                    </Row>
                </Container>

            </Col>
        </Row>

        <Row>
            <Col>
                <Container>

                    {[...Array(7)].map((_, i) => (
                        <Card key={i}>{i + 1}</Card>
                    ))}

                </Container>
            </Col>
        </Row>
    </>;
}