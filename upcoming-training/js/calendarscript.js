const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const year = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const monthsToDisplay = [
    currentMonth,
    (currentMonth + 1) % 12,
    (currentMonth + 2) % 12
];

// Colors for special events
const specialColors = ['#35B1BA', '#BA8035', '#6535BA', '#BA3535', '#BA3580'];

// Fetch events from JSON
let events = {};
fetch('./events.json')
    .then((response) => response.json())
    .then((data) => {
        events = data;

        // Generate calendars after events are loaded
        const calendarsContainer = document.getElementById(
            'calendars-container'
        );
        monthsToDisplay.forEach((monthIndex) => {
            const adjustedYear = monthIndex < currentMonth ? year + 1 : year; // Adjust year for next January
            calendarsContainer.appendChild(
                createCalendar(monthIndex, adjustedYear)
            );
        });
    });

function createCalendar(month, year) {
    const calendar = document.createElement('div');
    calendar.className = 'calendar';

    calendar.innerHTML = `
        <div class="container py-5">
            <div class="text-left mb-3">
                <h2>${months[month]} ${year}</h2>
            </div>
            <div class="row text-center font-weight-bold">
                <div class="col">Mon</div>
                <div class="col">Tue</div>
                <div class="col">Wed</div>
                <div class="col">Thu</div>
                <div class="col">Fri</div>
                <div class="col">Sat</div>
                <div class="col">Sun</div>
            </div>
            <div class="date-container">
                ${generateMonthDates(month, year)}
            </div>
        </div>
    `;
    return calendar;
}

function generateMonthDates(month, year) {
    const date = new Date(year, month, 1);
    let html = '';
    let colorIndex = 0;

    while (date.getMonth() === month) {
        const week = [];

        // Adjust Sunday (0) to 7 for Monday-start weeks
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

        // Add empty cells before the first day of the month
        if (date.getDate() === 1 && adjustedFirstDay !== 1) {
            for (let i = 1; i < adjustedFirstDay; i++) {
                week.push('<div class="col"></div>');
            }
        }

        // Add day cells
        while (date.getMonth() === month && week.length < 7) {
            const dateKey = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const event = events[dateKey];

            if (event) {
                const bgColor =
                    specialColors[colorIndex % specialColors.length];
                colorIndex++;
                week.push(
                    `<div class="col">
                        <span class="date special" style="background-color: ${bgColor}">
                            <span class="date-number">${date.getDate()}</span>
                            <span class="event-time">${event.time}</span>
                            <span class="event-title">${event.title}</span>
                        </span>
                    </div>`
                );
            } else {
                week.push(
                    `<div class="col">
                        <span class="date">
                            <span class="date-number">${date.getDate()}</span>
                        </span>
                    </div>`
                );
            }
            date.setDate(date.getDate() + 1);
        }

        // Fill remaining cells
        while (week.length < 7) {
            week.push('<div class="col"></div>');
        }

        html += `<div class="row">${week.join('')}</div>`;
    }

    return html;
}
