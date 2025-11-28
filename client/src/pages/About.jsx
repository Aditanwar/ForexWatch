import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 mb-8">
                    About ForexWatch
                </h1>

                <div className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                        <strong className="text-white">ForexWatch</strong> is a powerful, real-time currency monitoring application designed for traders who need to stay ahead of the market.
                    </p>

                    <p>
                        In the fast-paced world of Forex trading, every second counts. Missing a target rate by a few minutes can mean missing a profitable opportunity. ForexWatch solves this by automating the monitoring process for you.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-6">Key Features</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                            <span className="text-blue-400 font-semibold">Real-Time Monitoring:</span> We track currency pairs 24/7 using live market data.
                        </li>
                        <li>
                            <span className="text-blue-400 font-semibold">Instant SMS Alerts:</span> Get notified immediately via Twilio when your target rate is hit.
                        </li>
                        <li>
                            <span className="text-blue-400 font-semibold">Custom Conditions:</span> Set alerts for when rates go ABOVE or BELOW your specific targets.
                        </li>
                        <li>
                            <span className="text-blue-400 font-semibold">Secure History:</span> Keep track of all your past triggered alerts in your personal dashboard.
                        </li>
                    </ul>

                    <p className="mt-8">
                        Built with the <span className="text-teal-400">MERN Stack</span> (MongoDB, Express, React, Node.js), ForexWatch leverages modern web technologies to ensure reliability, speed, and a seamless user experience.
                    </p>

                    <div className="pt-8 flex gap-4">
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200">
                            Get Started
                        </Link>
                        <Link to="/login" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition duration-200">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
