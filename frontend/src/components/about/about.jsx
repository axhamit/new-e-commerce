import { useState } from 'react';
import { Link } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import DiamondIcon from '@mui/icons-material/Diamond';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');

  const values = [
    {
      icon: <DiamondIcon sx={{ fontSize: 32, color: 'white' }} />,
      title: "Excellence",
      description: "Curating only the finest luxury pieces with uncompromising quality standards",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 32, color: 'white' }} />,
      title: "Sustainability",
      description: "Committed to ethical sourcing and sustainable fashion practices",
      gradient: "from-pink-300 to-rose-300"
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 32, color: 'white' }} />,
      title: "Community",
      description: "Building a global community of fashion enthusiasts and style pioneers",
      gradient: "from-rose-300 to-pink-300"
    },
    {
      icon: <StarIcon sx={{ fontSize: 32, color: 'white' }} />,
      title: "Innovation",
      description: "Pioneering new trends while honoring timeless elegance and craftsmanship",
      gradient: "from-rose-400 to-pink-400"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Aarohama Tresure was born from a passion for authentic luxury fashion"
    },
    {
      year: "2019",
      title: "Global Expansion",
      description: "Launched international shipping to 50+ countries worldwide"
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Introduced virtual styling and personalized shopping experiences"
    },
    {
      year: "2022",
      title: "Award Recognition",
      description: "Received Luxury Retailer of the Year award for exceptional service"
    },
    {
      year: "2023",
      title: "Sustainability Pledge",
      description: "Committed to 100% sustainable packaging and ethical sourcing"
    },
    {
      year: "2024",
      title: "Future Vision",
      description: "Expanding into exclusive designer collaborations and bespoke services"
    }
  ];

  const teamMembers = [
    {
      name: "Eleanor Rose",
      role: "Founder & Creative Director",
      image: "/api/placeholder/300/300",
      description: "Former fashion editor with 15+ years in luxury retail"
    },
    {
      name: "Alexander Sterling",
      role: "Head of Design",
      image: "/api/placeholder/300/300",
      description: "Award-winning designer with international recognition"
    },
    {
      name: "Isabelle Chen",
      role: "Style Director",
      image: "/api/placeholder/300/300",
      description: "Personal stylist to celebrities and fashion icons"
    },
    {
      name: "Marcus Thorne",
      role: "Operations Director",
      image: "/api/placeholder/300/300",
      description: "Luxury retail expert with global supply chain experience"
    }
  ];

  return (
    <>
      <MetaData title="About Aarohama Tresure | Luxury Fashion Heritage & Story" />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-white overflow-hidden">
          <div className="absolute inset-0 bg-white/40 z-10"></div>
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/50 to-transparent z-20"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative z-30 text-center text-gray-800 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-100/80 to-rose-100/80 backdrop-blur-xl rounded-2xl mb-8 border border-pink-200/50 shadow-lg">
              <DiamondIcon sx={{ fontSize: 24, color: '#EC4899' }} className="mr-3" />
              <span className="text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text font-bold text-lg tracking-widest uppercase">
                Our Legacy
              </span>
              <DiamondIcon sx={{ fontSize: 24, color: '#F43F5E' }} className="ml-3" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Redefining <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Luxury</span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
              Where timeless elegance meets contemporary sophistication in every curated piece
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <Link 
                to="/products" 
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-pink-300/30"
              >
                Explore Collection
              </Link>
              <button 
                onClick={() => document.getElementById('story').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-bold rounded-2xl border-2 border-pink-200 hover:bg-white transition-all duration-300 shadow-lg"
              >
                Our Story
              </button>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="py-20 lg:py-28 bg-gradient-to-br from-white to-pink-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <div className="w-full h-96 bg-gradient-to-br from-pink-300 to-rose-300 rounded-3xl flex items-center justify-center text-white text-2xl font-bold">
                    Boutique Image
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <DiamondIcon sx={{ fontSize: 40, color: 'white' }} />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-400 rounded-2xl flex items-center justify-center shadow-2xl">
                  <StarIcon sx={{ fontSize: 32, color: 'white' }} />
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl mb-6 border border-pink-200">
                    <span className="text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text font-bold text-sm uppercase tracking-widest">
                      Our Heritage
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                    The Story of <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Aarohama Tresure</span>
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Founded in 2018, Aarohama Tresure emerged as a beacon of sophisticated luxury in the fashion world. 
                    Our journey began with a simple yet powerful vision: to create a sanctuary where discerning individuals 
                    could discover exceptional pieces that transcend trends and celebrate individuality.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Every collection is meticulously curated, every detail thoughtfully considered, and every client 
                    relationship nurtured with the utmost care. We believe that true luxury lies not just in the 
                    materials, but in the stories, craftsmanship, and personal connections that each piece represents.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">50K+</div>
                    <div className="text-gray-600 font-light">Luxury Pieces</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">120+</div>
                    <div className="text-gray-600 font-light">Designer Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">75+</div>
                    <div className="text-gray-600 font-light">Countries Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">98%</div>
                    <div className="text-gray-600 font-light">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-pink-200/50 shadow-lg">
                <DiamondIcon sx={{ fontSize: 20, color: '#EC4899' }} className="mr-2" />
                <span className="text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                  Our Values
                </span>
                <DiamondIcon sx={{ fontSize: 20, color: '#F43F5E' }} className="ml-2" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                The Pillars of <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Excellence</span>
              </h2>
              <p className="text-gray-600 text-lg lg:text-xl font-light max-w-2xl mx-auto">
                Guiding principles that define our commitment to luxury and service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 border-2 border-pink-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center"
                >
                  <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                Our <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-gray-600 text-lg lg:text-xl font-light max-w-2xl mx-auto">
                Milestones that shaped our legacy in luxury fashion
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-rose-400"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div 
                    key={index}
                    className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                      <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-pink-100 hover:shadow-3xl transition-all duration-300">
                        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 font-light">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full border-4 border-white shadow-2xl z-10"></div>
                    
                    <div className="w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-xl rounded-2xl mb-6 border border-pink-200/50 shadow-lg">
                <GroupsIcon sx={{ fontSize: 20, color: '#EC4899' }} className="mr-2" />
                <span className="text-transparent bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text font-bold text-sm tracking-widest uppercase">
                  Meet Our Team
                </span>
                <GroupsIcon sx={{ fontSize: 20, color: '#F43F5E' }} className="ml-2" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                The Visionaries <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Behind</span> the Brand
              </h2>
              <p className="text-gray-600 text-lg lg:text-xl font-light max-w-2xl mx-auto">
                Passionate experts dedicated to redefining luxury fashion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="group text-center bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 border-2 border-pink-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                      <StarIcon sx={{ fontSize: 16, color: 'white' }} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <div className="text-pink-600 font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-600 font-light text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-pink-500 to-rose-500 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-xl rounded-2xl mb-8 border border-white/30 shadow-2xl">
              <DiamondIcon sx={{ fontSize: 24, color: 'white' }} className="mr-3" />
              <span className="text-white font-bold text-lg tracking-widest uppercase">
                Join Our World
              </span>
              <DiamondIcon sx={{ fontSize: 24, color: 'white' }} className="ml-3" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Experience the <span className="text-white">Difference</span>
            </h2>
            
            <p className="text-xl text-pink-100 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover why discerning clients worldwide choose Aarohama Tresure for their luxury fashion journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/products" 
                className="px-8 py-4 bg-white text-pink-600 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-white"
              >
                Shop Collection
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-transparent text-white font-bold rounded-2xl border-2 border-white/50 hover:bg-white/20 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;