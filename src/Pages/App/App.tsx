import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from '../MainPage/MainPage'
import RouterHandler from '../RouterHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:page" element={<RouterHandler />} />
      </Routes>
    </Router>
  )
}

export default App;
