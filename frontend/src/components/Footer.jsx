import { Link } from 'react-router-dom';

const footerLinks = {
  Support: [
    { label: '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh', href: '#' },
    { label: 'exclusive@gmail.com', href: 'mailto:exclusive@gmail.com' },
    { label: '+88015-88888-9999', href: 'tel:+8801588888999' },
  ],
  Account: [
    { label: 'My Account', href: '#' },
    { label: 'Login / Register', href: '#' },
    { label: 'Cart', href: '/cart' },
    { label: 'Wishlist', href: '#' },
    { label: 'Shop', href: '/products' },
  ],
  'Quick Link': [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms Of Use', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

const socialIcons = {
  Facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
  ),
  Twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
  ),
  Instagram: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
  ),
  LinkedIn: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
  ),
};

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="block text-2xl font-extrabold mb-4">Exclusive</Link>
            <p className="text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
              Your one-stop shop for the best deals across electronics, fashion, home goods, and more.
            </p>
            <div>
              <p className="text-sm font-semibold mb-3 text-gray-300">Subscribe to newsletter</p>
              <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2.5 bg-white/10 rounded-lg text-sm text-white placeholder-gray-500 border border-white/10 focus:outline-none focus:border-primary transition-colors"
                />
                <button type="submit" className="px-4 py-2.5 bg-primary rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="flex gap-4 mt-6">
              {Object.entries(socialIcons).map(([name, icon]) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition-colors duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-base font-semibold mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Exclusive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
