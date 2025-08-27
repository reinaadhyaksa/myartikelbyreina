import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; 
import Home from './pages/Home';
import Articles from './pages/Articles';
import Categories from './pages/Categories';
import Category from './pages/Category';
import ArticleDetail from './pages/ArticleDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop /> 
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;