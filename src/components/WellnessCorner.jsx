import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ROUTINES = [
  { // Sunday
    muscle: [
      { name: "Light Stretching", reps: "15 mins", weight: "Bodyweight", image: "/assets/wellness/stretch.gif" },
      { name: "Yoga Flow", reps: "10 mins", weight: "Bodyweight", image: "/assets/wellness/yoga.gif" }
    ],
    yoga: { name: "Sun Salutation", duration: "5 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Jumping Jacks", reps: "45 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Monday
    muscle: [
      { name: "Push-ups", reps: "3 sets of 15", weight: "Bodyweight", image: "/assets/wellness/pushup.gif" },
      { name: "Dumbbell Bench Press", reps: "3 sets of 12", weight: "Moderate", image: "/assets/wellness/benchpress.gif" },
      { name: "Tricep Dips", reps: "3 sets of 15", weight: "Bodyweight", image: "/assets/wellness/dips.gif" },
      { name: "Overhead Tricep Extension", reps: "3 sets of 12", weight: "Light", image: "/assets/wellness/tricep.gif" }
    ],
    yoga: { name: "Downward Dog", duration: "2 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Burpees", reps: "30 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Tuesday
    muscle: [
      { name: "Dumbbell Rows", reps: "3 sets of 12", weight: "Moderate", image: "/assets/wellness/rows.gif" },
      { name: "Pull-ups", reps: "3 sets of 10", weight: "Bodyweight", image: "/assets/wellness/pullups.gif" },
      { name: "Dumbbell Bicep Curls", reps: "3 sets of 15", weight: "Light", image: "/assets/wellness/curls.gif" },
      { name: "Hammer Curls", reps: "3 sets of 12", weight: "Light", image: "/assets/wellness/hammer.gif" }
    ],
    yoga: { name: "Warrior Pose", duration: "2 minutes per side", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Mountain Climbers", reps: "60 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Wednesday
    muscle: [
      { name: "Goblet Squats", reps: "4 sets of 12", weight: "Moderate", image: "/assets/wellness/squat.gif" },
      { name: "Lunges", reps: "3 sets of 12 per leg", weight: "Light", image: "/assets/wellness/lunge.gif" },
      { name: "Glute Bridges", reps: "3 sets of 15", weight: "Bodyweight", image: "/assets/wellness/bridge.gif" },
      { name: "Plank", reps: "3 sets of 60 seconds", weight: "Bodyweight", image: "/assets/wellness/plank.gif" }
    ],
    yoga: { name: "Child's Pose", duration: "3 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "High Knees", reps: "45 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Thursday
    muscle: [
      { name: "Overhead Press", reps: "3 sets of 12", weight: "Moderate", image: "/assets/wellness/press.gif" },
      { name: "Lateral Raises", reps: "3 sets of 15", weight: "Light", image: "/assets/wellness/lateral.gif" },
      { name: "Front Raises", reps: "3 sets of 12", weight: "Light", image: "/assets/wellness/front.gif" },
      { name: "Bicycle Crunches", reps: "3 sets of 20", weight: "Bodyweight", image: "/assets/wellness/bicycle.gif" }
    ],
    yoga: { name: "Tree Pose", duration: "1 minute per side", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Jump Squats", reps: "40 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Friday
    muscle: [
      { name: "Dumbbell Deadlifts", reps: "3 sets of 10", weight: "Moderate", image: "/assets/wellness/deadlift.gif" },
      { name: "Thrusters", reps: "3 sets of 12", weight: "Light", image: "/assets/wellness/thruster.gif" },
      { name: "Renegade Rows", reps: "3 sets of 10 per arm", weight: "Moderate", image: "/assets/wellness/renegade.gif" }
    ],
    yoga: { name: "Cobra Pose", duration: "2 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Bicycle Crunches", reps: "50 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Saturday
    muscle: [
      { name: "Bird-Dog", reps: "3 sets of 10 per side", weight: "Bodyweight", image: "/assets/wellness/birddog.gif" },
      { name: "Dead Bug", reps: "3 sets of 12", weight: "Bodyweight", image: "/assets/wellness/deadbug.gif" },
      { name: "Russian Twists", reps: "3 sets of 20", weight: "Light", image: "/assets/wellness/twist.gif" }
    ],
    yoga: { name: "Bridge Pose", duration: "2 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Skaters", reps: "45 seconds", image: "/assets/wellness/hiit.png" }
  }
];

const WellnessCorner = () => {
  const { t } = useTranslation();
  const [todaysRoutine, setTodaysRoutine] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Timer State
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Audio State
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const today = new Date().getDay();
    setTodaysRoutine(ROUTINES[today]);
    
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (!todaysRoutine) return null;

  return (
    <>
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="text-center">{t('Wellness_Corner')}</h2>
          <p className="text-center" style={{ marginBottom: '3rem', color: 'var(--text-light)' }}>
            {t('Wellness_Desc')}
          </p>

          {/* Music and Timer Bar */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '2rem', 
            justifyContent: 'center', 
            marginBottom: '3rem',
            background: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: 'var(--shadow-md)'
          }}>
            
            {/* Audio Player */}
            <div style={{ textAlign: 'center' }}>
              <audio ref={audioRef} src="/assets/wellness/music.mp3" loop />
              <button 
                onClick={toggleMusic} 
                className={`btn ${isPlaying ? 'btn-outline' : 'btn-primary'}`}
                style={{ width: '200px' }}
              >
                {isPlaying ? t('Pause_Music') : t('Play_Music')}
              </button>
            </div>

            {/* Stopwatch */}
            <div style={{ textAlign: 'center', borderLeft: '2px solid #eee', paddingLeft: '2rem' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                {formatTime(time)}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => setTimerRunning(!timerRunning)} 
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  {timerRunning ? t('Pause') : t('Start')}
                </button>
                <button 
                  onClick={() => { setTime(0); setTimerRunning(false); }} 
                  className="btn btn-outline"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  {t('Reset')}
                </button>
              </div>
            </div>
          </div>

          {/* Workouts Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Muscle Building (Clickable) */}
            <div 
              className="card" 
              onClick={() => setIsModalOpen(true)}
              style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer', border: '2px solid transparent', transition: 'border 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.border = '2px solid var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.border = '2px solid transparent'}
            >
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{t('Muscle_Building')}</h3>
              <img src="/assets/wellness/muscle.png" alt="Muscle" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #eee' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>30-Minute Daily Routine</h4>
              <p style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>Click to view today's workout details!</p>
            </div>

            {/* Yoga */}
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: '#10b981', marginBottom: '1rem' }}>{t('Yoga_Posture')}</h3>
              <img src={todaysRoutine.yoga.image} alt="Yoga" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #eee' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{todaysRoutine.yoga.name}</h4>
              <p style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>{t('Duration')}: {todaysRoutine.yoga.duration}</p>
            </div>

            {/* HIIT */}
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>{t('HIIT_Exercises')}</h3>
              <img src={todaysRoutine.hiit.image} alt="HIIT" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #eee' }} />
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{todaysRoutine.hiit.name}</h4>
              <p style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>{t('Reps')}: {todaysRoutine.hiit.reps}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Routine Modal Overlay */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'white', borderRadius: '16px', padding: '2rem',
            maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #f3f4f6', paddingBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.5rem' }}>Today's 30-Min Muscle Routine</h2>
              <button 
                onClick={() => setIsModalOpen(false)} 
                style={{ background: '#fef2f2', border: 'none', color: '#ef4444', fontSize: '1.5rem', cursor: 'pointer', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                &times;
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {todaysRoutine.muscle.map((exercise, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: 'var(--surface)', padding: '1rem', borderRadius: '12px' }}>
                  <div style={{ width: '120px', flexShrink: 0 }}>
                    <img 
                      src={exercise.image} 
                      alt={exercise.name} 
                      style={{ width: '100%', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = "/assets/wellness/muscle.png"; }}
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--text)' }}>{idx + 1}. {exercise.name}</h3>
                    <p style={{ margin: '0.25rem 0', color: 'var(--text-light)', fontSize: '0.9rem' }}><strong>Reps:</strong> {exercise.reps}</p>
                    <p style={{ margin: '0.25rem 0', color: 'var(--text-light)', fontSize: '0.9rem' }}><strong>Weight:</strong> {exercise.weight}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '2rem' }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WellnessCorner;
