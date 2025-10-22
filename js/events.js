// Events Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize events page
    initEventsPage();
    loadEventData();
});

function initEventsPage() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function loadEventData() {
    // Sample event data - replace with actual API calls
    const eventData = {
        upcoming: [
            {
                id: 1,
                title: 'IEEE Day 2025 - Error 404',
                date: 'October 7, 2025',
                description: '"Logic will get you from A to B. Imagination will take you everywhere." - Albert Einstein. As part of IEEE Day 2025, IEEE SB CEV presents 🚫 Error 404 - Exit Not Found.',
                image: 'https://via.placeholder.com/350x200/1a1a1a/0066CC?text=IEEE+Day+2025',
                status: 'upcoming',
                hasRegistration: true
            },
            {
                id: 2,
                title: 'PROBLEMPOWER: A Problem-Solving Challenge',
                date: 'October 6, 2025',
                description: 'Think you can turn problems into possibilities? IEEE WIE AG CEV presents PROBLEMPOWER: A Problem-Solving Challenge where you can share your innovative solutions.',
                image: 'https://via.placeholder.com/350x200/1a1a1a/0066CC?text=Problem+Power',
                status: 'upcoming',
                hasRegistration: true
            }
        ],
        recent: [
            {
                id: 3,
                title: 'AI & Machine Learning Workshop',
                date: 'September 15, 2024',
                description: 'Comprehensive workshop on artificial intelligence and machine learning fundamentals with hands-on coding sessions.',
                image: 'https://via.placeholder.com/350x200/28a745/FFFFFF?text=AI+Workshop',
                status: 'completed',
                hasRegistration: false
            },
            {
                id: 4,
                title: 'Technical Seminar on IoT',
                date: 'August 20, 2024',
                description: 'Industry expert session on Internet of Things applications and emerging trends in connected devices.',
                image: 'https://via.placeholder.com/350x200/6f42c1/FFFFFF?text=IoT+Seminar',
                status: 'completed',
                hasRegistration: false
            }
        ],
        activities: [
            {
                id: 5,
                title: 'Monthly Coding Competition',
                date: 'Every Month',
                description: 'Regular programming contests to enhance problem-solving skills and competitive programming abilities.',
                image: 'https://via.placeholder.com/350x200/dc3545/FFFFFF?text=Coding+Contest',
                status: 'ongoing',
                hasRegistration: true
            },
            {
                id: 6,
                title: 'Technical Paper Presentation',
                date: 'Quarterly',
                description: 'Platform for students to present their research work and technical innovations to peers and faculty.',
                image: 'https://via.placeholder.com/350x200/fd7e14/FFFFFF?text=Paper+Presentation',
                status: 'ongoing',
                hasRegistration: true
            }
        ]
    };

    // Populate event grids
    Object.keys(eventData).forEach(tabKey => {
        const events = eventData[tabKey];
        const grid = document.querySelector(`#${tabKey} .events-grid`);
        
        if (events.length > 0) {
            grid.innerHTML = events.map(event => createEventCard(event)).join('');
        } else {
            grid.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-times"></i><h3>No events found</h3><p>Check back later for updates.</p></div>';
        }
    });
}

function createEventCard(event) {
    return `
        <div class="event-card">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                <div class="event-status status-${event.status}">${event.status}</div>
            </div>
            <div class="event-content">
                <div class="event-date">${event.date}</div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-actions">
                    <a href="#" class="read-more">Read More</a>
                    ${event.hasRegistration ? '<a href="#" class="register-btn">Registration</a>' : ''}
                </div>
            </div>
        </div>
    `;
}

// Add any events-specific functionality here
console.log('Events page loaded');