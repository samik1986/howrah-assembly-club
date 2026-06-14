import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Dictionary of words for the daily scramble
const WORDS = [
  { word: "TENNIS", hint: "A game played with rackets and a ball." },
  { word: "ASSEMBLY", hint: "A group of people gathered together." },
  { word: "FRIEND", hint: "A person you know well and like." },
  { word: "COMMUNITY", hint: "People living in the same area." },
  { word: "PLAY", hint: "Engage in an activity for enjoyment." },
  { word: "RACKET", hint: "Used to hit the ball in table tennis." },
  { word: "LEARN", hint: "Gain knowledge or skill." }
];

const PRONUNCIATION_TASKS = [
  { text: "She sells seashells by the seashore.", hint: "Focus on the 'sh' and 's' sounds!" },
  { text: "How can a clam cram in a clean cream can?", hint: "Watch out for the 'cl' and 'cr' clusters." },
  { text: "I scream, you scream, we all scream for ice cream!", hint: "A classic! Emphasize the 'scr' sounds." },
  { text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair.", hint: "Practice your 'z' sounds." },
  { text: "Peter Piper picked a peck of pickled peppers.", hint: "Pop those 'p' sounds clearly." }
];

const KidsCorner = () => {
  const { t, i18n } = useTranslation();
  
  // State for Word Scramble
  const [dailyWordObj, setDailyWordObj] = useState(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  // State for Pronunciation
  const [dailyPronunciation, setDailyPronunciation] = useState(null);

  useEffect(() => {
    // Select word based on the day of the year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const wordObj = WORDS[dayOfYear % WORDS.length];
    setDailyWordObj(wordObj);
    
    const pronObj = PRONUNCIATION_TASKS[dayOfYear % PRONUNCIATION_TASKS.length];
    setDailyPronunciation(pronObj);
    
    // Scramble the word (consistent per load, but could change on reload)
    const scrambled = wordObj.word.split('').sort(() => 0.5 - Math.random()).join('');
    setScrambledWord(scrambled);
  }, []);

  const handleCheck = () => {
    if (userAnswer.toUpperCase().trim() === dailyWordObj.word) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window && dailyPronunciation) {
      const utterance = new SpeechSynthesisUtterance(dailyPronunciation.text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Slightly slower for kids
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  return (
    <section id="kids-corner" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <span className="hero-badge" style={{ marginBottom: '1rem', background: 'var(--primary)', color: 'white' }}>
            {t('Kids_Corner')}
          </span>
          <h2>{t('Daily_Game_Title')}</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto', color: 'var(--text-light)' }}>
            {t('Daily_Game_Desc')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
          
          {/* Native Word Scramble Game */}
          {dailyWordObj && (
            <div style={{
              width: '100%',
              maxWidth: '600px',
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)',
              borderTop: '6px solid var(--primary)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('Scramble_Title')}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>{t('Scramble_Desc')}</p>
              
              <div style={{ 
                fontSize: '2.5rem', 
                letterSpacing: '8px', 
                fontWeight: 'bold', 
                color: 'var(--primary)',
                marginBottom: '1rem',
                textTransform: 'uppercase'
              }}>
                {scrambledWord}
              </div>

              <div style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
                <strong>{t('Hint')}:</strong> {dailyWordObj.hint}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setFeedback(null); // clear feedback on typing
                  }}
                  placeholder={t('Your_Answer')}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontSize: '1rem',
                    width: '60%',
                    textTransform: 'uppercase'
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                />
                <button 
                  onClick={handleCheck}
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.5rem' }}
                >
                  {t('Check_Answer')}
                </button>
              </div>

              {feedback === 'correct' && (
                <div style={{ color: '#10b981', fontWeight: 'bold', padding: '0.5rem', background: '#d1fae5', borderRadius: '8px' }}>
                  {t('Correct')}
                </div>
              )}
              {feedback === 'incorrect' && (
                <div style={{ color: '#ef4444', fontWeight: 'bold', padding: '0.5rem', background: '#fee2e2', borderRadius: '8px' }}>
                  {t('Incorrect')}
                </div>
              )}
            </div>
          )}

          {/* Native Pronunciation Game */}
          {dailyPronunciation && (
            <div style={{
              width: '100%',
              maxWidth: '600px',
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)',
              borderTop: '6px solid #f59e0b',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t('Pronunciation_Title')}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>{t('Pronunciation_Desc')}</p>
              
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#d97706',
                marginBottom: '1rem',
                padding: '1.5rem',
                background: '#fef3c7',
                borderRadius: '8px',
                lineHeight: '1.5'
              }}>
                "{dailyPronunciation.text}"
              </div>

              <div style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
                <strong>{t('Hint')}:</strong> {dailyPronunciation.hint}
              </div>

              <button 
                onClick={handleSpeak}
                className="btn btn-primary"
                style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', background: '#f59e0b', border: 'none' }}
              >
                {t('Listen')}
              </button>
            </div>
          )}

          {/* Embedded Daily Crossword */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '4px solid var(--primary)',
          }}>
            <iframe 
              src="https://a2zpuzzles.com/widgets/crossword-widget.html" 
              width="100%" 
              height="700px" 
              style={{ border: 'none', display: 'block' }}
              title="Daily English Skill Builder Game"
              sandbox="allow-scripts allow-same-origin allow-popups"
            ></iframe>
          </div>

          {/* Daily Comic Iframe */}
          <div style={{
            width: '100%',
            maxWidth: '900px',
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '4px solid #10b981',
            marginTop: '1rem'
          }}>
            <div style={{ background: '#10b981', color: 'white', padding: '1rem', textAlign: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{t('Daily_Comic')}</h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>{t('Comic_Desc')}</p>
            </div>
            <iframe 
              src={`/comic-frame.html?lang=${i18n.language}`} 
              width="100%" 
              height="500px" 
              style={{ border: 'none', display: 'block' }}
              title="Daily Comic"
              sandbox="allow-scripts allow-same-origin"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KidsCorner;
