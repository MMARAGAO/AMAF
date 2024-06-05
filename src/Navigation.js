import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

function Navigation() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default Navigation;