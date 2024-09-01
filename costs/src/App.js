import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';
import Messages from './components/pages/Messages';


import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import { ColorProvider } from './components/layout/ColorContext'; // Importa o provedor

function App() {
  return (
    <BrowserRouter>
      <ColorProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Container>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/company" element={<Company />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/newproject" element={<NewProject />} />
                <Route path="/project/:id" element={<Project />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </div>
      </ColorProvider>
    </BrowserRouter>
  );
}

export default App;
