import { CompaniesProvider } from './context/CompaniesContext';
import Companies from './components/Companies';

const App = () => (
  <CompaniesProvider>
    <Companies />
  </CompaniesProvider>
);
export default App;