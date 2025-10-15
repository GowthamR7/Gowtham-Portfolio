import React from 'react'

const Contact = () => {
  return (
    <div className='w-full min-h-screen bg-white text-black flex flex-col justify-between p-6 md:p-8 font-sans'>
      
      {/* Top Navigation */}
      <header className='w-full flex justify-between text-[10px] md:text-xs font-bold tracking-widest uppercase'>
        <div>
          <p>Caution</p>
        </div>
        <div className='text-center'>
          <p>Contains</p>
          <p>Smilematter™</p>
        </div>
        <div className='text-center'>
          <p>Contact</p>
          <p>FAQ</p>
        </div>
        <div className='text-right'>
          <p>@bigfacebrand</p>
          <p>Careers</p>
        </div>
      </header>

      {/* Main "BIGFACE" Text */}
      <div className='w-full flex-grow flex justify-center items-center'>
        <h1 className='text-[18vw] md:text-[20vw] font-black leading-none tracking-tighter'>
          BIGFACE
        </h1>
      </div>

      {/* Bottom Navigation */}
      <footer className='w-full flex flex-wrap justify-between items-center text-[10px] md:text-xs font-bold tracking-widest uppercase gap-4'>
        <p>Miami → San Diego → Earth</p>
        <p>©&™ Bigface</p>
        <p>Terms</p>
        <p>Privacy</p>
        <p>Miami Flagship</p>
      </footer>

    </div>
  )
}

export default Contact