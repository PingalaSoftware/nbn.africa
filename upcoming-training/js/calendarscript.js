const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const year = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const monthsToDisplay = [currentMonth, (currentMonth + 1) % 12];

const specialColors = ["#35B1BA", "#BA8035", "#6535BA", "#BA3535", "#BA3580"];
let events = {};

function isWithin24Hours(dateString) {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    const twentyFourHoursBefore = new Date(
        targetDate.getTime() - 24 * 60 * 60 * 1000
    );

    return currentDate >= twentyFourHoursBefore;
}

fetch("./events.json")
    .then((response) => response.json())
    .then((data) => {
        events = data;

        const calendarsContainer = document.getElementById("calendars-container");
        monthsToDisplay.forEach((monthIndex) => {
            const adjustedYear = monthIndex < currentMonth ? year + 1 : year;
            calendarsContainer.appendChild(createCalendar(monthIndex, adjustedYear));
        });

        attachMobileViewToggle();
    });

function createCalendar(month, year) {
    const calendar = document.createElement("div");
    calendar.className = "calendar";

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
    let html = "";
    let colorIndex = 0;

    while (date.getMonth() === month) {
        const week = [];

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

        if (date.getDate() === 1 && adjustedFirstDay !== 1) {
            for (let i = 1; i < adjustedFirstDay; i++) {
                week.push('<div class="col"></div>');
            }
        }

        while (date.getMonth() === month && week.length < 7) {
            const dateKey = `${date.getFullYear()}-${String(
                date.getMonth() + 1
            ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
            const event = events[dateKey];

            if (event) {
                const isRegStoped = isWithin24Hours(event.startTime);

                const bgColor = specialColors[colorIndex % specialColors.length];
                colorIndex++;
                week.push(
                    `<div class="col">
                        <span id="${dateKey}"  class="date special ${isRegStoped ? "disabled" : ""
                    }" style="background-color: ${isRegStoped ? "#d3d3d3" : bgColor}">
                            <span class="date-number">${date.getDate()}</span>
                            <span class="event-title link ${isRegStoped ? "even-reg-stoped" : ""
                    }" ${isRegStoped ? "" : `data-link="${event.link}"`
                    }>
                                ${event.title}
                            </span>
                            <span class="event-sub-title link ${isRegStoped ? "even-reg-stoped" : ""
                    }" ${isRegStoped ? "" : `data-link="${event.link}"`
                    }>
                                ${event.title2}
                            </span>
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

        while (week.length < 7) {
            week.push('<div class="col"></div>');
        }

        html += `<div class="row">${week.join("")}</div>`;
    }

    return html;
}

function attachMobileViewToggle() {
    const specialDates = document.querySelectorAll(".date.special");

    specialDates.forEach((dateElement) => {
        const infoIcon = document.createElement("i");
        infoIcon.className = "info-icon material-icons mobile-only";
        infoIcon.textContent = "info";
        dateElement.appendChild(infoIcon);

        dateElement.addEventListener("click", (event) => {
            if (!event.target.classList.contains("link")) {
                dateElement.classList.toggle("expanded");
            }
        });

        dateElement.querySelectorAll(".link").forEach((linkElement) => {
            linkElement.addEventListener("click", (e) => {
                e.stopPropagation();
                const link = linkElement.dataset.link;
                if (link) {
                    window.open(link, "_blank");
                }
            });
        });
    });
}

setInterval(() => {
    window.location.reload();
}, 600000);

document.addEventListener("DOMContentLoaded", fetchEventsAndRenderCalendars);
