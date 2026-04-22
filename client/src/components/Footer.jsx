import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark-secondary border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="font-heading text-2xl font-bold text-gold">
              Gourmet Palace
            </Link>
            <p className="mt-4 text-gray-400">
              Experience the finest culinary arts at Gourmet Palace. 
              We serve passion on every plate.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <FiTwitter className="text-xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-gold transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-gold transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <FiMapPin /> 123 Gourmet Street, NYC
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FiPhone /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <FiMail /> info@gourmetpalace.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Hardik. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;