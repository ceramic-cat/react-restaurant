import { useEffect, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import type UnparsedBooking from '../interfaces/UnparsedBooking.ts';
import type ParsedBooking from '../interfaces/ParsedBooking.ts';
import type OperatingHours from '../interfaces/OpeningHours.ts';
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


    function generateDayOperatingTimes(date: Date): OperatingHours {
        const startTime = new Date(date)
        startTime.setHours(17, 0, 0)
        const endTime = new Date(date)
        endTime.setHours(23, 0, 0)
        return { openingTime: startTime, closingTime: endTime }
    }

    // generate a weeks worth of operating hours for a given first day of week
    function generateWeekOperatingTImes(monday: Date): OperatingHours[] {
        const weekOperatingHours: OperatingHours[] = []

        let dateChecked = new Date(monday);
        for (let i = 1; i <= 7; i++) {
            const dailyOperatingHours = generateDayOperatingTimes(dateChecked)
            weekOperatingHours.push(dailyOperatingHours)
            dateChecked.setDate(dateChecked.getDate() + 1)
        }
        return weekOperatingHours
    }


    function parseBooking(item: UnparsedBooking): ParsedBooking {
        return {
            id: item.id,
            userId: item.userId,
            startTime: new Date(item.startTime),
            endTime: new Date(item.endTime),
            partySize: item.partySize
        }
    }

    function parseBookingList(items: UnparsedBooking[]): ParsedBooking[] {
        return items.map(parseBooking)
    }

    const today = new Date()

    const bookableTime = new Date(today.getTime());
    bookableTime.setHours(bookableTime.getHours() + timeMarginHours);
    const timeString = bookableTime.toISOString().split('.')[0]

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

    // Fetches all booked times that starts after current time + 2 hours, sets it to bookings <Booking[]>.
    useEffect(() => {
        fetch(`/api/bookings?WHERE=startTime>${timeString}`)
            .then((res) => res.json())
            .then((data: UnparsedBooking[]) => {
                setBookings(parseBookingList(data))
            })
    }, [])

    function filterBookingsForWeek(monday: Date, allBookings: ParsedBooking[]): ParsedBooking[] {
        monday.setHours(17, 0, 0)
        const sunday = new Date(monday)
        sunday.setDate(monday.getDate() + 6)
        sunday.setHours(21, 0, 0)

        return allBookings.filter((x) => x.startTime.toISOString() >= monday.toISOString() && x.startTime.toISOString() <= sunday.toISOString())
    }
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