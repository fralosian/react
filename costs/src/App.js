import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';

import Container from './components/layout/Container';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Cotacto</Link>
        <Link to="/company">Empresa</Link>
        <Link to="/newproject">Novo projeto</Link>
      </div>
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/company" element={<Company />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/newproject" element={<NewProject />} />
        </Routes >
      </Container >
      <p>Footer</p>
    </BrowserRouter>
  );
}

export default App;
