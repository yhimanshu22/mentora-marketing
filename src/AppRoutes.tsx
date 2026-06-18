import { Route, Routes } from 'react-router-dom';

import { FOOTER_LEGAL_LINKS } from './content';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { HomePage } from './pages/HomePage';
import { InfoPage } from './pages/InfoPage';
import { LoginPage } from './pages/LoginPage';

export function AppRoutes() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.18),transparent)] bg-bg">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        {FOOTER_LEGAL_LINKS.map((link) => (
          <Route
            key={link.to}
            path={link.to}
            element={<InfoPage pageId={link.pageId} />}
          />
        ))}
      </Routes>
    </div>
  );
}
