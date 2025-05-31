import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UploadSection from './components/UploadSection';
import AgricultureInfo from './components/AgricultureInfo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <UploadSection />
        <AgricultureInfo />
      </main>
      <Footer />
    </div>
  );
}

export default App;