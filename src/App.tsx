import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PreviewPage } from '@/pages/PreviewPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<PreviewPage />} />
            </Routes>
        </Router>
    );
}

export default App;