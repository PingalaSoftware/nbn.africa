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

const year = 2024; // Start year
const monthsToDisplay = [10, 11, 0]; // Indices of months to display (November, December, January)

// Example events
const events = {
    '2024-11-09': {
        title: 'Online Seminar',
        time: '11:00 AM - 3:30 PM',
        description: 'Topic: Advanced Web Technologies'
    },
    '2024-11-11': {
        title: 'Online Seminar',
        time: '11:00 AM - 3:30 PM',
        description: 'Topic: Advanced Web Technologies'
    },
    '2024-11-16': {
        title: 'Online Seminar',
        time: '11:00 AM - 3:30 PM',
        description: 'Topic: Advanced Web Technologies'
    },
    '2024-11-21': {
        title: 'Online Seminar',
        time: '11:00 AM - 3:30 PM',
        description: 'Topic: Advanced Web Technologies'
    },
    '2024-11-26': {
        title: 'Online Seminar',
        time: '11:00 AM - 3:30 PM',
        description: 'Topic: Advanced Web Technologies'
    },
    '2024-12-09': {
        title: 'Fundamentals of WEB 3.0',
        time: '11:00 AM - 3:00 PM'
    },
    '2024-12-16': {
        title: 'Fundamentals of NFT',
        time: '11:00 AM - 3:00 PM'
    },
    '2025-01-16': {
        title: 'Fundamentals of NFT',
        time: '11:00 AM - 3:00 PM'
    }
};

// Colors for special events
const specialColors = ['#35B1BA', '#BA8035', '#6535BA', '#BA3535', '#BA3580'];

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
    let colorIndex = 0; // To cycle through special colors

    while (date.getMonth() === month) {
        const week = [];

        // Determine the day of the week for the first day of the month
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth; // Adjust Sunday (0) to 7

        // Fill empty cells for the days before the first day of the month
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
            const event = events[dateKey]; // Check if there are events for this date

            if (event) {
                const bgColor =
                    specialColors[colorIndex % specialColors.length]; // Cycle through colors
                colorIndex++; // Increment color index for next event
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

        // Fill empty cells for the end of the week
        while (week.length < 7) {
            week.push('<div class="col"></div>');
        }

        html += `<div class="row">${week.join('')}</div>`;
    }

    return html;
}

// Adjust year dynamically when crossing December
const calendarsContainer = document.getElementById('calendars-container');
monthsToDisplay.forEach((monthIndex) => {
    const adjustedYear = monthIndex < 10 ? year + 1 : year; // If month is January or later, increment year
    calendarsContainer.appendChild(createCalendar(monthIndex, adjustedYear));
});
