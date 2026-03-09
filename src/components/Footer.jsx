import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black text-red-500 mb-4 block">
              🩸 RedHeart
            </Link>
            <p className="text-sm leading-relaxed">
              RedHeart is a platform dedicated to connecting blood donors with those in need. 
              Together, we can save lives and build a stronger community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
              <li><Link to="/donor-list" className="hover:text-red-500 transition">Find Donors</Link></li>
              <li><Link to="/request-blood" className="hover:text-red-500 transition">Blood Requests</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/profile" className="hover:text-red-500 transition">My Account</Link></li>
              <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">📍 Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2">📞 +880 1234 567 890</li>
              <li className="flex items-center gap-2">✉️ support@redheart.com</li>
            </ul>
          </div>
        </div>

        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} RedHeart. Built with ❤️ for humanity.
          </p>
          <div className="flex gap-4">
           
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition text-white">f</a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition text-white">t</a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition text-white">in</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;