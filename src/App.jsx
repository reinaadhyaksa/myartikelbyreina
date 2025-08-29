import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { LoadingScreen } from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const Articles = lazy(() => import('./pages/Articles'));
const Categories = lazy(() => import('./pages/Categories'));
const Category = lazy(() => import('./pages/Category'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
    <div className="App">
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
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