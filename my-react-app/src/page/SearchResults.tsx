import React from 'react';
import { Gauge, Settings2, ClipboardCheck, TrendingUp } from 'lucide-react';
import '../styles/SearchResults.css';

interface CarResult {
  id: string;
  name: string; 
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  condition: string;
  imageUrl?: string; // Made optional since similar cars won't have images
}

const SEARCH_QUERY = "Toyota Premio";

// Main search results updated with new condition categories
const MOCK_RESULTS: CarResult[] = [
  { id: '1', name: 'Toyota Premio', year: 2018, price: 18.5, mileage: 45000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=600&q=80' },
  { id: '2', name: 'Toyota Premio', year: 2019, price: 21.0, mileage: 15000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
  { id: '3', name: 'Toyota Premio', year: 2017, price: 16.8, mileage: 65000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
];

// Similar vehicles updated (Images removed, conditions updated)
const SIMILAR_VEHICLES: CarResult[] = [
  { id: 's1', name: 'Honda Allion', year: 2018, price: 17.5, mileage: 52000, transmission: 'Auto', condition: 'Used' },
  { id: 's2', name: 'Nissan Sylphy', year: 2019, price: 19.0, mileage: 30000, transmission: 'Auto', condition: 'Reconditioned' },
  { id: 's3', name: 'Toyota Axio', year: 2020, price: 22.5, mileage: 12000, transmission: 'Auto', condition: 'Brand New' },
];

const SearchResults: React.FC = () => {
  return (
    <div className="results-wrapper">
      
      <div className="results-header">
        <h2>Market Analysis for <span className="gradient-text">{SEARCH_QUERY}</span></h2>
        <p>Based on your selected filters and real-time market data.</p>
      </div>

      <section className="analytics-dashboard">
        <div className="analytics-main">
          <div className="stats-overview-flex">
            <div className="stat-card glass-panel-small">
              <span className="stat-label">Average Price</span>
              <h3 className="stat-value">18.7M <span className="currency">LKR</span></h3>
            </div>
            <div className="stat-card glass-panel-small">
              <span className="stat-label">Average Mileage</span>
              <h3 className="stat-value">41,600 <span className="unit">km</span></h3>
            </div>
          </div>

          <div className="graph-card glass-panel-small">
            <div className="graph-header">
              <h4>Price Trend (2000 - 2026)</h4>
              <span className="trend-badge positive"><TrendingUp size={14} /> Increasing</span>
            </div>
            <div className="svg-graph-container">
              <svg viewBox="0 0 500 200" className="price-chart">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="50" x2="500" y2="50" className="grid-line" />
                <line x1="0" y1="100" x2="500" y2="100" className="grid-line" />
                <line x1="0" y1="150" x2="500" y2="150" className="grid-line" />
                <path d="M 0 180 C 150 170, 250 100, 500 40 L 500 200 L 0 200 Z" fill="url(#fillGrad)" />
                <path d="M 0 180 C 150 170, 250 100, 500 40" fill="none" stroke="url(#lineGrad)" strokeWidth="4" className="chart-line" />
              </svg>
              <div className="graph-labels">
                <span>2000</span>
                <span>2010</span>
                <span>2020</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-sidebar">
          <div className="predictions-card glass-panel-small">
            <h4>Market Predictions</h4>
            <div className="prediction-list">
              <div className="pred-item">
                <span className="pred-time">Last Week</span>
                <span className="pred-price">18.5M</span>
              </div>
              <div className="pred-item">
                <span className="pred-time">Last Month</span>
                <span className="pred-price">18.2M</span>
              </div>
              <div className="divider"></div>
              <div className="pred-item highlight">
                <span className="pred-time">Next Week</span>
                <span className="pred-price">18.8M</span>
              </div>
              <div className="pred-item highlight">
                <span className="pred-time">Next Month</span>
                <span className="pred-price">19.1M</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Exact Matches */}
      <section className="listings-section">
        <h3 className="section-title">Available Listings ({MOCK_RESULTS.length})</h3>
        
        <div className="flex-results-grid">
          {MOCK_RESULTS.map(car => (
            <div key={car.id} className="glass-card flex-card">
              <div className="card-image-wrapper">
                <img src={car.imageUrl} alt={car.name} className="car-image" />
              </div>
              <div className="card-content">
                <div className="flex-row-between">
                  <h4 className="car-title">{car.name}</h4>
                  <span className="year-badge">{car.year}</span>
                </div>
                
                <div className="price-display">
                  <span className="currency">LKR</span> {car.price}M
                </div>
                
                <div className="stats-row">
                  <div className="stat-box">
                    <span className="stat-icon"><Gauge size={16} /></span>
                    <div className="stat-text"><strong>{car.mileage.toLocaleString()}</strong><span>km</span></div>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon"><Settings2 size={16} /></span>
                    <div className="stat-text"><strong>{car.transmission}</strong><span>Trans</span></div>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon"><ClipboardCheck size={16} /></span>
                    <div className="stat-text"><strong>{car.condition}</strong><span>Status</span></div>
                  </div>
                </div>
                <button className="btn-glass-purple">Contact Seller</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Choices Section (No Images) */}
      <section className="listings-section similar-section">
        <div className="section-header-row">
          <h3 className="section-title">Similar Vehicles to Consider</h3>
        </div>
        
        <div className="flex-results-grid">
          {SIMILAR_VEHICLES.map(car => (
            <div key={car.id} className="glass-card flex-card">
              <div className="card-content">
                <div className="flex-row-between">
                  <h4 className="car-title">{car.name}</h4>
                  <span className="year-badge">{car.year}</span>
                </div>
                
                <div className="price-display">
                  <span className="currency">LKR</span> {car.price}M
                </div>
                
                <div className="stats-row">
                  <div className="stat-box">
                    <span className="stat-icon"><Gauge size={16} /></span>
                    <div className="stat-text"><strong>{car.mileage.toLocaleString()}</strong><span>km</span></div>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon"><Settings2 size={16} /></span>
                    <div className="stat-text"><strong>{car.transmission}</strong><span>Trans</span></div>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon"><ClipboardCheck size={16} /></span>
                    <div className="stat-text"><strong>{car.condition}</strong><span>Status</span></div>
                  </div>
                </div>
                <button className="btn-glass-purple">View Analysis</button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SearchResults;