import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { LoadingComponent } from "./components/LoadingComponent";
import { LoadingProvider } from "./context/LoadingContext";

function App() {

  return (
    <LoadingProvider>
      <LoadingComponent />
      <AppRoutes />
    </LoadingProvider>
  );
}

export default App;
