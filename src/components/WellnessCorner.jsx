import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ROUTINES = [
  { // Sunday
    muscle: { name: "Dumbbell Bicep Curls", reps: "3 sets of 12", image: "/assets/wellness/muscle.png" },
    yoga: { name: "Sun Salutation", duration: "5 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Jumping Jacks", reps: "45 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Monday
    muscle: { name: "Push-ups", reps: "3 sets of 15", image: "/assets/wellness/muscle.png" },
    yoga: { name: "Downward Dog", duration: "2 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Burpees", reps: "30 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Tuesday
    muscle: { name: "Goblet Squats", reps: "4 sets of 10", image: "/assets/wellness/muscle.png" },
    yoga: { name: "Warrior Pose", duration: "2 minutes per side", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Mountain Climbers", reps: "60 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Wednesday
    muscle: { name: "Dumbbell Rows", reps: "3 sets of 12", image: "/assets/wellness/muscle.png" },
    yoga: { name: "Child's Pose", duration: "3 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "High Knees", reps: "45 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Thursday
    muscle: { name: "Overhead Press", reps: "3 sets of 10", image: "/assets/wellness/muscle.png" },
    yoga: { name: "Tree Pose", duration: "1 minute per side", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Jump Squats", reps: "40 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Friday
    muscle: { name: "Plank", reps: "3 sets of 60 seconds", image: "/assets/wellness/muscle.png" },
    yoga: { name: "Cobra Pose", duration: "2 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Bicycle Crunches", reps: "50 seconds", image: "/assets/wellness/hiit.png" }
  },
  { // Saturday
    muscle: { name: "Lunges", reps: "3 sets of 12 per leg", image: "/assets/wellness/muscle.png" },
    yoga: { name: "Bridge Pose", duration: "2 minutes", image: "/assets/wellness/yoga.png" },
    hiit: { name: "Skaters", reps: "45 seconds", image: "/assets/wellness/hiit.png" }
  }
];

const WellnessCorner = () => {
  const { t } = useTranslation();
  const [todaysRoutine, setTodaysRoutine] = useState(null);
  
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
          
          {/* Muscle Building */}
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{t('Muscle_Building')}</h3>
            <img src={todaysRoutine.muscle.image} alt="Muscle" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #eee' }} />
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{todaysRoutine.muscle.name}</h4>
            <p style={{ color: 'var(--text-light)', fontWeight: 'bold' }}>{t('Reps')}: {todaysRoutine.muscle.reps}</p>
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
  );
};

export default WellnessCorner;
