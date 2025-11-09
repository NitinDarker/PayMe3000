import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  const signupHandler = () => {
    navigate('/signup')
  }

  const siginHandler = () => {
    navigate('/signin')
  }

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4'>
      {/* Grid Background */}
      <div
        className='absolute inset-0 h-full w-full 
        bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] 
        bg-size-[20px_20px]'
      />
      <div
        className='pointer-events-none absolute inset-0 flex items-center justify-center bg-black 
        mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]'
      ></div>

      <div>
        {/* Background decorative elements - subtle blue glow */}
        <div className='absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-blue-600 opacity-5 blur-3xl'></div>
        <div className='absolute bottom-1/4 right-1/4 h-40 w-40 animate-pulse rounded-full bg-blue-800 opacity-5 delay-1000 blur-3xl'></div>
        <div className='absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600 opacity-5 delay-600 blur-2xl'></div>

        <div className='relative z-10 mx-auto max-w-5xl text-center'>
          {/* Main Heading */}
          <h1 className='font-orbitron mb-6 text-5xl font-bold md:text-7xl'>
            <span className='text-7xl text-blue-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]'>
              A full-stack Payments App
            </span>
            <br />
            <span className='text-6xl text-zinc-300'>
              Engineered from scratch
            </span>
          </h1>
          {/* Subheading */}
          <p className='font-rubik mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-zinc-500 md:text-2xl opacity-85'>
            An experimental fintech dashboard that merges design 
            <br />
            precision with backend power.
          </p>
          {/* Feature Indicators */}         
          <div className='mb-12 flex cursor-default items-center justify-center gap-6 text-sm md:text-base'>
            <span className='font-doto font-medium text-zinc-300 transition-all hover:scale-105 hover:text-blue-400'>
              Fast
            </span>
            <div className='h-1 w-1 rounded-full bg-zinc-500'></div>           
            <span className='font-doto font-medium text-zinc-300 transition-all hover:scale-105 hover:text-blue-400'>
              Simple            
            </span>
            <div className='h-1 w-1 rounded-full bg-zinc-500'></div>         
            <span className='font-doto font-medium text-zinc-300 transition-all hover:scale-105 hover:text-blue-400'>
              Secure            
            </span>
          </div>
          {/* Buttons */}         
          <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
               
            <button
              onClick={signupHandler}
              className='font-rubik transform cursor-pointer rounded-lg bg-blue-500 px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(74,222,128,0.3)] transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] focus:outline-none'
            >
              Sign Up
            </button>
             
            <button
              onClick={siginHandler}
              className='p-[3px] relative hover:cursor-pointer font-rubik '
            >
              <div className='absolute inset-0 bg-linear-to-r from-violet-500 to-sky-300 rounded-lg' />
              <div className='px-8 py-3 bg-black rounded-[6px] relative group transition-all duration-600 text-white hover:bg-transparent hover:text-black hover:scale-105 antialiased'>
                Sign In
              </div>
            </button>
            {/* <button
              onClick={siginHandler}
              className='font-rubik transform cursor-pointer rounded-lg border-2 border-zinc-600 px-8 py-4 font-semibold text-zinc-300 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:text-blue-400 focus:outline-none'
            >
              Learn More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
