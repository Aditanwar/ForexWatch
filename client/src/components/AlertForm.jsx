import React, { useState } from 'react';
import api from '../api';

const AlertForm = ({ onAlertCreated }) => {
    const [formData, setFormData] = useState({
        currencyPair: '',
        targetRate: '',
        condition: 'ABOVE',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await api.post('/alerts', formData);
            setMessage({ type: 'success', text: 'Alert created successfully!' });
            setFormData({ currencyPair: '', targetRate: '', condition: 'ABOVE', phoneNumber: '' });
            if (onAlertCreated) onAlertCreated();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to create alert. ' + (error.response?.data?.error || error.message) });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Create New Alert</h2>
            {message && (
                <div className={`p-3 mb-4 rounded ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-1">Currency Pair (e.g., EUR/USD)</label>
                    <input
                        type="text"
                        name="currencyPair"
                        value={formData.currencyPair}
                        onChange={handleChange}
                        placeholder="EUR/USD"
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Target Rate</label>
                        <input
                            type="number"
                            step="0.0001"
                            name="targetRate"
                            value={formData.targetRate}
                            onChange={handleChange}
                            placeholder="1.0500"
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Condition</label>
                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="ABOVE">Above</option>
                            <option value="BELOW">Below</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-300 mb-1">Phone Number (E.164 format)</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="+1234567890"
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
                >
                    {loading ? 'Creating...' : 'Set Alert'}
                </button>
            </form>
        </div>
    );
};

export default AlertForm;
