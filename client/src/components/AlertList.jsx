import React, { useEffect, useState } from 'react';
import api from '../api';

const AlertList = ({ refreshTrigger }) => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, ACTIVE, TRIGGERED

    const fetchAlerts = async () => {
        try {
            const response = await api.get('/alerts');
            setAlerts(response.data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteAlert = async (id) => {
        if (!window.confirm('Are you sure you want to delete this alert?')) return;
        try {
            await api.delete(`/alerts/${id}`);
            setAlerts(alerts.filter(alert => alert._id !== id));
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, [refreshTrigger]);

    const filteredAlerts = alerts.filter(alert => {
        if (filter === 'ALL') return true;
        return alert.status === filter;
    });

    if (loading) return <div className="text-white">Loading alerts...</div>;

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Your Alerts</h2>
                <div className="space-x-2">
                    <button onClick={() => setFilter('ALL')} className={`px-3 py-1 rounded ${filter === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>All</button>
                    <button onClick={() => setFilter('ACTIVE')} className={`px-3 py-1 rounded ${filter === 'ACTIVE' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Active</button>
                    <button onClick={() => setFilter('TRIGGERED')} className={`px-3 py-1 rounded ${filter === 'TRIGGERED' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}>History</button>
                </div>
            </div>

            {filteredAlerts.length === 0 ? (
                <p className="text-gray-400">No alerts found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="py-2">Pair</th>
                                <th className="py-2">Target</th>
                                <th className="py-2">Condition</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Phone</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlerts.map((alert) => (
                                <tr key={alert._id} className="border-b border-gray-700 hover:bg-gray-750">
                                    <td className="py-2 font-mono text-blue-400">{alert.currencyPair}</td>
                                    <td className="py-2">{alert.targetRate}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded text-xs ${alert.condition === 'ABOVE' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                            {alert.condition}
                                        </span>
                                    </td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded text-xs ${alert.status === 'ACTIVE' ? 'bg-blue-900 text-blue-300' : 'bg-gray-600 text-gray-300'}`}>
                                            {alert.status}
                                        </span>
                                    </td>
                                    <td className="py-2 text-sm text-gray-500">{alert.phoneNumber}</td>
                                    <td className="py-2">
                                        <button onClick={() => deleteAlert(alert._id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AlertList;
