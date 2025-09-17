import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
BookingPage.route = {
    path: '/booking',
    menuLabel: 'Booking',
    index: 5
};

export default function BookingPage() {

    const [userId, setId] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [partySize, setPartySize] = useState('')
    const [requestIsPending, setRequestIsPending] = useState(false)


    const handleSubmit = (e: any) => {
        e.preventDefault() // prevent that the page refreshes (default behaviour)
        const request = { userId, startTime, endTime, partySize }
        setRequestIsPending(true)
        fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(request)
        }).then(() => {
            console.log('post request finished')
            setRequestIsPending(false)
        })
    }

    return <Row>
        <Col>
            <h2>Faux booking with a form</h2>
            <form onSubmit={handleSubmit}>
                <label>userId&nbsp;
                    <input
                        type="number"
                        value={userId}
                        required
                        placeholder='5'
                        onChange={(a) => setId(a.target.value)} />
                </label>
                <label>Start time
                    <input
                        type="text"
                        value={startTime}
                        required
                        placeholder='2025-10-13 17:15'
                        onChange={(a) => setStartTime(a.target.value)} />
                </label>
                <label>End time
                    <input type="text"
                        value={endTime}
                        required
                        placeholder='2025-10-13 19:15'
                        onChange={(a) => setEndTime(a.target.value)} />
                </label>
                <label>Number of guests
                    <input type="number"
                        value={partySize}
                        required
                        placeholder='2'
                        onChange={(a) => setPartySize(a.target.value)} />
                </label>
                {/* Displays a loading button if the request is loading... 
                Might remove, since the load seems to be very fast */}
                {!requestIsPending && <button>Send request</button>}
                {requestIsPending && <button disabled>Loading</button>}


            </form>
        </Col>
    </Row>
}