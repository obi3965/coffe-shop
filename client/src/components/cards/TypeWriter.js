import React from 'react'
import Typewriter from "typewriter-effect";


 const TypeWriter = ({text}) => 
    (
        <Typewriter
          options={{
            strings: text,
            autoStart: true,
            loop: true,
          }}
        />
      );
 export default TypeWriter