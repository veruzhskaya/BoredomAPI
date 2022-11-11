import { useEffect, useState } from 'react';
import './App.css';
import video from './video.mp4';
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from 'react';


function App() {
const [advice, setAdvice] = useState ("");


const getAdvice = async() =>{
  const response = await fetch("http://www.boredapi.com/api/activity/");
  const data = await response.json();
  setAdvice (data.activity)
}

useEffect(() => {
  getAdvice();
}, []);

const app = useRef();
  
useLayoutEffect(() => {
  let ctx = gsap.context(() => {
    gsap.from("h1", { opacity:0, duration:4, });
    gsap.from("h2", { opacity:0, duration:4, delay:2, stagger:1});
    gsap.from("p", { opacity:0, duration:4, delay:6, stagger:1 });
    gsap.to("button", { rotation: '+=30', duration:4, repeat:(-1)})
  }, app);
  
  return () => ctx.revert();
});

  return (
    <div>
       
        <div>
            <video autoPlay muted loop>
              <source src={video} type = "video/mp4"/>
            </video>   
        </div>
          <div ref={app} className='container'>     
           <h1>Are you bored?</h1>   
           <h2>You can look at the ink stain...</h2>
           <h2>or</h2>
           <h2>follow the rabbit!</h2>  
           <p>{advice}</p>
           <button onClick={getAdvice}><img className='btn_image' src="https://img.icons8.com/external-others-inmotus-design/512/external-Rabbit-rabbit-others-inmotus-design-6.png" alt='rabbit'/></button>
     </div>
    </div>
  );
}

export default App;
