# This is a restaurant

This is a site for a school project. The plan is to make a fairly fancy website for booking tables and general information.
Some stuff has been provided for me, such as the whole backend in C# and a sqlite database, since that is not the focus of the course.
The site will use React and React Bootstrap to make a responsive design.

# API documentation

For more, see the ACL table.

To log in: POST to /api/login
To create new user: POST to /api/users

Example body:
{
"email": "maria@nodehill.com",
"password": "12345678"
}

To create booking:
While logged in, POST to /api/bookings
{
"startTime" : "2025-10-13 20:15",
"endTime" : "2025-10-13 22:15",
"partySize" : "10",
"userId": "5"
}

To get all bookings:
GET to /api/bookings will get you everything.

## Todo

- General layout
  - Main page
  - Booking
  - rest lol
- Booking
  - update + delete actions
  - Frontend form validation
    - dates
- login component

## Done

- Database tables
- Pretty pictures from pexels.com
- svg icons from https://www.svgrepo.com/author/wishforge.games/
- Booking create and read actions
- Dummy booking form
