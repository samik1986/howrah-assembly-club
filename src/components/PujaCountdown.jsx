import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PUJA_EVENTS = [
  { id: 'mahalaya', name: 'Mahalaya', date: '2026-10-10T04:00:00+05:30' },
  { id: 'sasti', name: 'Maha Sasthi', date: '2026-10-17T08:00:00+05:30' },
  { id: 'kolabou', name: 'Kolabou Snan', date: '2026-10-18T04:00:00+05:30' },
  { id: 'saptami', name: 'Maha Saptami', date: '2026-10-18T08:00:00+05:30' },
  { id: 'ashtami', name: 'Maha Ashtami', date: '2026-10-19T08:00:00+05:30' },
  { id: 'anjali', name: 'Ashtami Anjali', date: '2026-10-19T09:00:00+05:30' },
  { id: 'bhog', name: 'Ashtami Bhog Bitaran', date: '2026-10-19T13:00:00+05:30' },
  { id: 'sandhi', name: 'Sandhi Puja', date: '2026-10-19T23:30:00+05:30' },
  { id: 'nabami', name: 'Maha Navami', date: '2026-10-20T08:00:00+05:30' },
  { id: 'dashami', name: 'Dashami', date: '2026-10-21T08:00:00+05:30' },
  { id: 'bisarjan', name: 'Bisarjan on Dwadashi', date: '2026-10-23T16:00:00+05:30' }
];

const calculateTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPassed: false
    };
  }
  return timeLeft;
};

const PujaCountdown = () => {
  const { t } = useTranslation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Find the next upcoming event
  const upcomingEvents = PUJA_EVENTS.filter(event => new Date(event.date) > now);
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  const nextTimeLeft = nextEvent ? calculateTimeLeft(nextEvent.date) : null;
  
  // Format for double digits
  const pad = (num) => String(num).padStart(2, '0');

  return (
    <div className="puja-countdown-panel glass">
      <h3 className="countdown-title">Durga Puja 2026</h3>
      
      {nextEvent ? (
        <div className="next-event-highlight">
          <h4>{nextEvent.name}</h4>
          <div className="timer-display">
            <div className="time-box">
              <span className="time-value">{pad(nextTimeLeft.days)}</span>
              <span className="time-label">Days</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-box">
              <span className="time-value">{pad(nextTimeLeft.hours)}</span>
              <span className="time-label">Hrs</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-box">
              <span className="time-value">{pad(nextTimeLeft.minutes)}</span>
              <span className="time-label">Mins</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-box">
              <span className="time-value">{pad(nextTimeLeft.seconds)}</span>
              <span className="time-label">Secs</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="next-event-highlight">
          <h4>Puja Concluded</h4>
          <p>See you next year!</p>
        </div>
      )}

      <div className="upcoming-events-list">
        <h4>Schedule</h4>
        <ul>
          {PUJA_EVENTS.map(event => {
            const timeLeft = calculateTimeLeft(event.date);
            const eventDate = new Date(event.date);
            const dateStr = eventDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
            const timeStr = eventDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

            return (
              <li key={event.id} className={timeLeft.isPassed ? 'event-passed' : 'event-upcoming'}>
                <div className="event-details" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="event-name">{event.name}</span>
                  <span className="event-date-str" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                    {dateStr}, {timeStr}
                  </span>
                </div>
                <span className="event-time" style={{ display: 'flex', alignItems: 'center' }}>
                  {timeLeft.isPassed 
                    ? 'Completed' 
                    : `${timeLeft.days}d ${pad(timeLeft.hours)}h ${pad(timeLeft.minutes)}m`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PujaCountdown;
