
import './App.css'
import 'animate.css';
import AppRoutes from './routes'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './userContext';

function App() {

  return (
    <div className="App ">
      <UserProvider>
        <AppRoutes />
        <ToastContainer position="bottom-left" />
      </UserProvider>
    </div>
  );
}

export default App
