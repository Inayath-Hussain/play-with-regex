import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useTheme from './hooks/useTheme'
import './App.css'
import IndexPage from './page'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <div className='flex justify-between border-b border-solid border-primary items-center py-6 px-4 
      md:px-10'>
        <h1 className='text-primary text-3xl text-center
        md:text-4xl'>Play with RegEx</h1>

        <div className='flex justify-center items-center gap-6'>
          {/* update github url here */}
          <a href="https://github.com/Inayath-Hussain" target='_blank'>
            <img src="/github-mark-white.svg" alt="" className='w-8 h-8 bg-primary rounded-[50%]
          md:w-10 md:h-10' />
          </a>

          <input className='toggle' type="checkbox" checked={theme === 'dark' ? false : true} onChange={toggle} />
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route index element={<IndexPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
