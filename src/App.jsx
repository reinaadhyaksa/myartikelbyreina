import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import Category from './pages/Category';
import ArticleDetail from './pages/ArticleDetail';
import { NotFound } from './pages/NotFound';
import { LoadingScreen } from './components/LoadingScreen';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Chronica - Platform Artikel Modern",
    "url": "https://chronica-rho.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://chronica-rho.vercel.app/articles?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="App overflow-x-hidden">
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;