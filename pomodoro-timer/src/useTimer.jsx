import { useState,useEffect } from 'react'

function useTimer(totalSeconds) {
  

  const [Timeleft, setTimeleft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
 
  useEffect(()=>{

    let timer;

    if (isRunning) {
      timer = setTimeout(()=> {
        if(Timeleft>0) {
          setTimeleft(prev=>prev-1);
        }
        else {
            setIsRunning(false);
        }
      }, 1000)
    }

    else {
        clearTimeout(timer);
    }
    
    return ()=>
      clearTimeout(timer);
  },[Timeleft,isRunning])

return {Timeleft, setTimeleft , isRunning, setIsRunning};
}

export default useTimer;