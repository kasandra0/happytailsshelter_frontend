import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div>
        <h1 className="text-primary text-3xl underline">Hello world!</h1>

        <Button>default</Button>
        <Button variant="outline">outline</Button>
        <Button variant="secondary">secondary</Button>
        
      </div>
    </>
  );
}

export default App;
