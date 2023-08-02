import Navbar from "./components/Navbar"
import Hero from "./components/hero";
import { VendingMachineProvider } from "./context/VendingMachineContext";

function App() {
  return (
    <VendingMachineProvider>
      <Navbar/>
      <Hero/>
    </VendingMachineProvider>
  );
}

export default App;
