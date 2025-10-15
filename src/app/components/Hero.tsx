import React from 'react'
import ParticleSystem from './ParticleSystem/ParticleSystem'

const Hero = () => {
  return (
    <div className='relative h-screen w-full'>

      <div className="absolute inset-0 z-20 ">
        <ParticleSystem 
          imagePath="/sample-image.jpg"
          particleSize={1.5}
          interactionIntensity={0.15}
          animationSpeed={1.0}
        />
      </div>


      {/* Layer 3: Background Name */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 md:pb-24 pointer-events-none">

      <div className='w-fit relative'>
      <div className="absolute left-0 text-base font-bold text-left w-full">Creative Developer</div>
      <h1 className="mt-8 text-white-outline text-7xl sm:text-8xl md:text-9xl lg:text-[13.5vw] font-extrabold tracking-widest leading-none">
          GOWTHAM
        </h1>
      </div>

      </div>
    </div>
  )
}

export default Hero
