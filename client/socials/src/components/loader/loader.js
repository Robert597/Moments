import React, {useRef, useEffect} from 'react';
import gsap from 'gsap';
import {useNavigate} from  'react-router-dom';
import "./loader.css";


const Loader = () => {
    let id;
    let width = 1;
    const Navigate = useNavigate();
    const tl = gsap.timeline();
    const tl1 = gsap.timeline({paused: true, onComplete: () => {
        Navigate("/homepage/0")
    }}); 

    let text = useRef(null);
   
    useEffect(() => {
        let replacedChar = text.querySelectorAll('span:not([data-char="."])');
        const char = text.children;

        tl.set(char, {
            yPercent: -110
        }).set(text, {
            autoAlpha:1
        }).to(char, {
            duration: 1,
            yPercent: 0,
            stagger: 0.05,
            ease: "expo.inOut"
        }).to(replacedChar, {
            duration: 1,
            yPercent: 110,
            ease: "expo.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.01
        });

        tl1.to('.loader-text, #bar', {
            duration: .2,
            opacity: 0,
            zIndex: -1
        })
        .to("#preloader", {
            duration: .8,
            width: "0%"
        }).to('body', {
            overflow: "auto",
            duration: .5
        })
        var bar = document.querySelector("#bar-confirm");
        const move = () => {
            id = setInterval(frame, 100);
        }
       
        const frame = () => {
            if(width >= 100){
                clearInterval(id);
               tl1.play()
            }else{
                width++;
                bar.style.width = width + '%';
                document.querySelector('.loader-text').innerHTML = width + '%';
            }
        }
        move();
    }, [])
    
  return (
      <>
    <div id="preloader">
    
    <h1 className="loader-text">0%</h1>
    <div id="bar">
      <div id="bar-confirm">

      </div>
      <div id="loader-text">
     <h1 ref={el => text = el}>
       <span data-char="M">M</span>
       <span data-char=".">O</span>
       <span data-char="M">M</span>
       <span data-char=".">E</span>
       <span data-char="N">N</span>
       <span data-char=".">T</span>
       <span data-char="S">S</span>
     </h1>
     <p>Robert Oluwaseun</p>
   </div>
   </div>
  </div>
  </>
  )
}

export default Loader