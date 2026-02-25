import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Note from './pages/Note'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/note/:id" element={<Note />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App