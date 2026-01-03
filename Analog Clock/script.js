const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const dateBox = document.getElementById('date');
const digitalTime = document.getElementById('digitalTime');
const body = document.body;
const toggleBtn = document.querySelector('.toggle');

// THEME TOGGLE
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('light');
});

function updateClock() {
    const now = new Date();

    // ----- ANALOG -----
    const ms = now.getMilliseconds();
    const seconds = now.getSeconds() + ms / 1000;
    const minutes = now.getMinutes() + seconds / 60;
    const hours = now.getHours() + minutes / 60;

    hourHand.style.transform =
        `translateX(-50%) rotate(${hours * 30}deg)`;
    minuteHand.style.transform =
        `translateX(-50%) rotate(${minutes * 6}deg)`;
    secondHand.style.transform =
        `translateX(-50%) rotate(${seconds * 6}deg)`;

    // ----- DATE (Rolex style) -----

    // ----- FULL DATE -----
const dayName = now.toLocaleDateString('en-IN', { weekday: 'short' });
const day = now.getDate();
const month = now.toLocaleDateString('en-IN', { month: 'short' });
const year = now.getFullYear();

dateBox.textContent = `${dayName}, ${day} ${month} ${year}`;

    // ----- DIGITAL TIME -----
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    h = String(h).padStart(2, '0');

    digitalTime.textContent = `${h}:${m}:${s} ${ampm}`;
}

// ✅ SAFE ANIMATION LOOP (never stops)
function animate() {
    updateClock();
    requestAnimationFrame(animate);
}

animate();

