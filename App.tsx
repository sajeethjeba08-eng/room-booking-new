import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import MainApp from './MainApp';

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <MainApp />
                </ProtectedRoute>
            } />

            {/* Catch all - redirect home which is protected */}
            <Route path="*" element={
                <ProtectedRoute>
                    <MainApp />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default App;
