import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import paymentMethods from '../../../assets/images/payment-methods.svg';

const footerLinks = [
  {
    title: "DISCOVER",
    links: [
      {
        name: "New Arrivals",
        redirect: "/products?category=new-arrivals",
      },
      {
        name: "Designer Collection",
        redirect: "/products?category=designer",
      },
      {
        name: "Seasonal Edit",
        redirect: "/products?season=spring-summer",
      },
      {
        name: "Best Sellers",
        redirect: "/products?sort=-ratings",
      },
      {
        name: "Gift Cards",
        redirect: "/gift-cards",
      },
      {
        name: "Lookbook",
        redirect: "/lookbook",
      }
    ]
  },
  {
    title: "SERVICES",
    links: [
      {
        name: "Personal Styling",
        redirect: "/services/styling",
      },
      {
        name: "Tailoring Services",
        redirect: "/services/tailoring",
      },
      {
        name: "VIP Access",
        redirect: "/vip-program",
      },
      {
        name: "Style Consultation",
        redirect: "/consultation",
      }
    ]
  },
  {
    title: "COMPANY",
    links: [
      {
        name: "Our Story",
        redirect: "/about",
      },
      {
        name: "Sustainability",
        redirect: "/sustainability",
      },
      {
        name: "Careers",
        redirect: "/careers",
      },
      {
        name: "Press",
        redirect: "/press",
      },
      {
        name: "Privacy Policy",
        redirect: "/privacy",
      },
      {
        name: "Terms of Service",
        redirect: "/terms",
      }
    ]
  },
  {
    title: "CLIENT CARE",
    links: [
      {
        name: "Contact Us",
        redirect: "/contact",
      },
      {
        name: "Shipping & Returns",
        redirect: "/shipping-returns",
      },
      {
        name: "Size Guide",
        redirect: "/size-guide",
      },
      {
        name: "Care Instructions",
        redirect: "/care-instructions",
      },
      {
        name: "FAQ",
        redirect: "/faq",
      }
    ]
  }
]

const socialLinks = [
  {
    name: "Instagram",
    icon: <InstagramIcon sx={{ fontSize: 20 }} />,
    redirect: "https://instagram.com/aarohama-tresure",
  },
  {
    name: "Facebook",
    icon: <FacebookIcon sx={{ fontSize: 20 }} />,
    redirect: "https://facebook.com/aarohama-tresure",
  },
  {
    name: "Pinterest",
    icon: <PinterestIcon sx={{ fontSize: 20 }} />,
    redirect: "https://pinterest.com/aarohama-tresure",
  },
  {
    name: "X",
    icon: <XIcon sx={{ fontSize: 20 }} />,
    redirect: "https://twitter.com/aarohama-tresure",
  },
  {
    name: "YouTube",
    icon: <YouTubeIcon sx={{ fontSize: 20 }} />,
    redirect: "https://youtube.com/aarohama-tresure",
  }
]

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          {/* Main Footer */}
          <footer className="w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white border-t border-gray-800 overflow-hidden">
            {/* Luxury Accent Bar */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 h-1 w-full"></div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
                {/* Brand Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <DiamondIcon sx={{ fontSize: 24, color: 'white' }} />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
                      Aarohama Tresure
                    </span>
                  </div>
                  <p className="text-gray-300 font-light text-lg leading-relaxed max-w-md">
                    Curating exceptional luxury fashion experiences with meticulous attention to detail and unparalleled craftsmanship.
                  </p>
                  
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <PhoneIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                      <span className="font-light">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-300">
                      <EmailIcon sx={{ fontSize: 18, color: '#6B7280' }} />
                      <span className="font-light">style@aarohamatresure.com</span>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-300">
                      <LocationOnIcon sx={{ fontSize: 18, color: '#6B7280', marginTop: '2px' }} />
                      <span className="font-light">123 Luxury Avenue<br />Fashion District, NY 10001</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-4 pt-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.redirect}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-gray-700"
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {footerLinks.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-semibold text-purple-300 uppercase tracking-wider text-sm">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              to={link.redirect}
                              className="text-gray-300 hover:text-pink-200 font-light transition-colors duration-200 text-sm hover:underline"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="border-t border-gray-800 pt-8 mb-8">
                <div className="max-w-md">
                  <h3 className="font-semibold text-purple-300 mb-4 text-sm uppercase tracking-wider">
                    Join Our Luxury Circle
                  </h3>
                  <p className="text-gray-300 font-light text-sm mb-4">
                    Receive exclusive access to new collections, private sales, and style insights.
                  </p>
                  <div className="flex space-x-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-gray-800 pt-8 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                  <span>&copy; {new Date().getFullYear()} Aarohama Tresure. All rights reserved.</span>
                  <div className="flex space-x-4">
                    <Link to="/privacy" className="hover:text-purple-300 transition-colors">Privacy</Link>
                    <Link to="/terms" className="hover:text-purple-300 transition-colors">Terms</Link>
                    <Link to="/cookies" className="hover:text-purple-300 transition-colors">Cookies</Link>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm font-light">We Accept</span>
                  <img 
                    draggable="false" 
                    src={paymentMethods} 
                    alt="Accepted Payment Methods" 
                    className="h-8 filter brightness-0 invert opacity-80"
                  />
                </div>
              </div>
            </div>

            {/* Luxury Accent */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 h-1 w-full"></div>
          </footer>

          {/* Trust Badges */}
          <div className="w-full bg-gray-900 py-6 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-300 text-sm">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <DiamondIcon sx={{ fontSize: 16, color: 'white' }} />
                  </div>
                  <span className="font-light">Authentic Luxury</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <span className="font-light">Global Shipping</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-light">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-light">VIP Rewards</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
};

export default Footer;