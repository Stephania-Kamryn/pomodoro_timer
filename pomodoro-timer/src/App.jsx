import { useState, useEffect } from 'react'
import useTimer from './useTimer'
function App() {

  const focusTime = 1500;
  const shortBreakTime = 300;
  const longBreakTime = 900;

  const { Timeleft, setTimeleft, isRunning, setIsRunning } = useTimer(focusTime);

  const [mode, setMode] = useState('focus'); //focus,shortbreak,longbreak

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'focus') {
      setTimeleft(focusTime);
    } else if (newMode === 'shortbreak') {
      setTimeleft(shortBreakTime);
    } else {
      setTimeleft(longBreakTime);
    }
  }


  const formatTime = (seconds) => {
    const totalMins = parseInt(Math.floor(seconds / 60));
    const secs = parseInt(seconds % 60);
    const mins = parseInt(totalMins % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }



  const handleReset = () => {
    setIsRunning(false);

    if (mode === 'focus') {
      setTimeleft(focusTime);
    } else if (mode === 'shortbreak') {
      setTimeleft(shortBreakTime);
    } else {
      setTimeleft(longBreakTime);
    }

  }

  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    if (Timeleft === 0) {
      //focus
      if (mode === 'focus') {
        const nextSessionCount = sessionCount + 1;
        setSessionCount(prev => prev + 1);
        //deciding short or long break based on number of focus sessions completed
        if (nextSessionCount % 4 === 0) {
          switchMode('longbreak');
        } else {
          switchMode('shortbreak');
        }
      } else {
        switchMode('focus');
      }
    }

  }, [Timeleft, sessionCount, mode])

  const bgcolor = mode === 'focus' ? 'from-purple-300 to-cyan-300' : mode === 'shortbreak' ? 'from-cyan-300 to-green-200' : 'from-red-300 to-pink-300'

  return (
    <>
      <div className={`bg-gradient-to-tr ${bgcolor} min-h-screen  transition-all duration-500`}>
        <h1 className="text-7xl font-bold flex justify-center my-38 font-serif">Pomodoro Timer</h1>
        <div className='flex justify-center'>
          <h3 className="text-xl font-bold bg-gray-200/50 inline-block px-4 py-2 rounded-lg text-center my-10">{mode === 'focus' ? 'Focus Time' : mode === 'shortbreak' ? 'Short Break' : 'Long Break'}</h3>
        </div>



        <div id="timer" className="text-8xl font-bold font-sans text-center">{formatTime(Timeleft)}

          <div id="controlpannel" className="mt-5 flex items-center justify-center gap-5">
            <button id="start" onClick={() => { setIsRunning(true) }} className="bg-green-400 hover:bg-green-600  font-thin py-2 px-4 rounded-lg text-4xl">Start</button>
            <button id="pause" onClick={() => setIsRunning(false)} className="bg-yellow-400 hover:bg-yellow-600  font-thin py-2 px-4 rounded-lg text-4xl">Pause</button>
            <button id="reset" onClick={handleReset} className="bg-red-400 hover:bg-red-600 font-thin py-2 px-4 rounded-lg text-4xl">Reset</button>
          </div>
          <div id="sessiontype" className="mt-5 text-center flex justify-center gap-5 flex-wrap">
            <button id="focustime" onClick={() => switchMode('focus')} className="bg-gray-300/30 border border-black-300 hover:shadow-lg hover:bg-gray-400 text-black-300  font-thin py-2 px-4 rounded-lg text-4xl gap-5">Focus time</button>
            <button id="shortbreaktime" onClick={() => switchMode('shortbreak')} className="bg-gray-300/30 border border-black-300 hover:shadow-lg hover:bg-gray-400 text-black-300  font-thin py-2 px-4 rounded-lg text-4xl gap-5">Short Break</button>
            <button id="longbreaktime" onClick={() => switchMode('longbreak')} className="bg-gray-300/30 border border-black-300 hover:shadow-lg hover:bg-gray-400 text-black-300  font-thin py-2 px-4 rounded-lg text-4xl gap-5">Long Break</button>

          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-700 text-center mb-5 my-10 inline-block bg-gray-200/50">Number of focus {sessionCount === 1 ? 'session' : 'sessions'} completed : {sessionCount}</h4>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
