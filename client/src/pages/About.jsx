import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500 selection:text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-teal-600/10 rounded-full blur-[100px] -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 animate-gradient-x">
                            ForexWatch
                        </span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed mb-12">
                        Real-time currency monitoring for the <span className="text-white font-medium">modern trader</span>.
                        <br />
                        Never miss a profitable moment again.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/register" className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                            <span className="relative z-10">Get Started Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </Link>
                        <Link to="/login" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                            Login to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Real-Time Speed</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Powered by Alpha Vantage, we track currency pairs 24/7 with millisecond precision to catch every market movement.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-teal-500/30 transition-colors group">
                        <div className="w-12 h-12 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Instant SMS Alerts</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Direct integration with Twilio ensures you receive alerts on your phone the second your target rate is hit.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">Smart History</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Track your performance with a detailed history of every alert triggered, helping you analyze your strategy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
