import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import '../Components/Form.css';

// Main Page, App component.
function App() {

  const goTo = useNavigate(); //To prevent hook errors
  return (
    <div className="Form">
      <header className="App-header">
        <h1>Welcome to my React App</h1>
        <p>Select what would you like to check today?</p>
      </header>
      {/* Centralized buttons for navigation */}
      <div style={{ display: 'flex', gap: '24px', padding: '24px 0' }}>
        <Button
          label="UEN Checker"
          onClick={() => goTo('/UEN')}
        />

        <Button
          label="Weather Forecast"
          onClick={() => goTo('/Weather')}
        />
      </div>
    </div>
  );
}

export default App;