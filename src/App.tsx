import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PreviewPage from '@/pages/PreviewPage';
import Experimental from '@/pages/Experimental';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<PreviewPage />} />
                <Route path='/test' element={<Experimental />} /> 
            </Routes>
        </Router>
    );
}

export default App;