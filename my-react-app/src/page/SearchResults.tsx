import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Gauge, Settings2, ClipboardCheck, TrendingUp, TrendingDown, ArrowLeft, Search } from 'lucide-react';
import { SearchResultsSkeleton } from '../component/Skeleton';
import '../styles/SearchResults.css';

interface CarResult {
  id: string;
  name: string; 
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  condition: string;
  imageUrl?: string;
}

interface FilterState {
  brand: string;
  model: string;
  condition: string;
  priceRange: string;
  city: string;
  mileageRange: string;
  yearRange: string;
}

/* ──────────────── Mock data per brand/model ──────────────── */
const VEHICLE_DATABASE: Record<string, CarResult[]> = {
  'Toyota Premio': [
    { id: 'tp1', name: 'Toyota Premio', year: 2018, price: 18.5, mileage: 45000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=600&q=80' },
    { id: 'tp2', name: 'Toyota Premio', year: 2019, price: 21.0, mileage: 15000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
    { id: 'tp3', name: 'Toyota Premio', year: 2017, price: 16.8, mileage: 65000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
  ],
  'Toyota Yaris': [
    { id: 'ty1', name: 'Toyota Yaris', year: 2021, price: 11.2, mileage: 12000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
    { id: 'ty2', name: 'Toyota Yaris', year: 2020, price: 10.5, mileage: 28000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=600&q=80' },
  ],
  'Toyota Aqua': [
    { id: 'ta1', name: 'Toyota Aqua', year: 2019, price: 9.8, mileage: 35000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
    { id: 'ta2', name: 'Toyota Aqua', year: 2020, price: 11.5, mileage: 18000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
  ],
  'Toyota Corolla': [
    { id: 'tc1', name: 'Toyota Corolla', year: 2020, price: 14.2, mileage: 22000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=600&q=80' },
    { id: 'tc2', name: 'Toyota Corolla', year: 2021, price: 16.5, mileage: 8000, transmission: 'Auto', condition: 'Brand New', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
  ],
  'Honda Vezel': [
    { id: 'hv1', name: 'Honda Vezel', year: 2020, price: 13.5, mileage: 42000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
    { id: 'hv2', name: 'Honda Vezel', year: 2021, price: 15.8, mileage: 18000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
    { id: 'hv3', name: 'Honda Vezel', year: 2019, price: 12.2, mileage: 65000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
  ],
  'Honda Fit': [
    { id: 'hf1', name: 'Honda Fit', year: 2019, price: 8.2, mileage: 48000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
    { id: 'hf2', name: 'Honda Fit', year: 2020, price: 9.5, mileage: 22000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
  ],
  'Honda Civic': [
    { id: 'hc1', name: 'Honda Civic', year: 2020, price: 16.0, mileage: 30000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=600&q=80' },
    { id: 'hc2', name: 'Honda Civic', year: 2019, price: 14.5, mileage: 55000, transmission: 'Manual', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
  ],
  'Honda CR-V': [
    { id: 'hcrv1', name: 'Honda CR-V', year: 2020, price: 19.8, mileage: 25000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
    { id: 'hcrv2', name: 'Honda CR-V', year: 2018, price: 16.5, mileage: 60000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
  ],
  'Nissan Magnite': [
    { id: 'nm1', name: 'Nissan Magnite', year: 2022, price: 9.2, mileage: 8000, transmission: 'Auto', condition: 'Brand New', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
    { id: 'nm2', name: 'Nissan Magnite', year: 2021, price: 8.5, mileage: 22000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
  ],
  'Nissan X-Trail': [
    { id: 'nxt1', name: 'Nissan X-Trail', year: 2020, price: 14.5, mileage: 35000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
    { id: 'nxt2', name: 'Nissan X-Trail', year: 2019, price: 12.8, mileage: 55000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=600&q=80' },
  ],
  'Nissan Leaf': [
    { id: 'nl1', name: 'Nissan Leaf', year: 2020, price: 10.0, mileage: 20000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
  ],
  'Nissan Patrol': [
    { id: 'np1', name: 'Nissan Patrol', year: 2021, price: 32.0, mileage: 15000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
  ],
  'Suzuki Wagon R': [
    { id: 'swr1', name: 'Suzuki Wagon R', year: 2019, price: 5.8, mileage: 40000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
    { id: 'swr2', name: 'Suzuki Wagon R', year: 2020, price: 6.5, mileage: 22000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
  ],
  'Suzuki Swift': [
    { id: 'ss1', name: 'Suzuki Swift', year: 2020, price: 7.5, mileage: 30000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=600&q=80' },
    { id: 'ss2', name: 'Suzuki Swift', year: 2021, price: 8.8, mileage: 12000, transmission: 'Auto', condition: 'Reconditioned', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80' },
  ],
  'Suzuki Alto': [
    { id: 'sa1', name: 'Suzuki Alto', year: 2019, price: 4.2, mileage: 45000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80' },
  ],
  'Suzuki Vitara': [
    { id: 'sv1', name: 'Suzuki Vitara', year: 2020, price: 12.0, mileage: 28000, transmission: 'Auto', condition: 'Used', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80' },
  ],
};

/* Similar vehicle suggestions per brand */
const SIMILAR_DATABASE: Record<string, CarResult[]> = {
  'Toyota': [
    { id: 's1', name: 'Honda Civic', year: 2020, price: 16.0, mileage: 30000, transmission: 'Auto', condition: 'Reconditioned' },
    { id: 's2', name: 'Nissan Sylphy', year: 2019, price: 19.0, mileage: 30000, transmission: 'Auto', condition: 'Reconditioned' },
    { id: 's3', name: 'Suzuki Swift', year: 2021, price: 8.8, mileage: 12000, transmission: 'Auto', condition: 'Reconditioned' },
  ],
  'Honda': [
    { id: 's1', name: 'Toyota Yaris', year: 2021, price: 11.2, mileage: 12000, transmission: 'Auto', condition: 'Reconditioned' },
    { id: 's2', name: 'Nissan X-Trail', year: 2020, price: 14.5, mileage: 35000, transmission: 'Auto', condition: 'Reconditioned' },
    { id: 's3', name: 'Suzuki Vitara', year: 2020, price: 12.0, mileage: 28000, transmission: 'Auto', condition: 'Used' },
  ],
  'Nissan': [
    { id: 's1', name: 'Toyota Aqua', year: 2020, price: 11.5, mileage: 18000, transmission: 'Auto', condition: 'Reconditioned' },
    { id: 's2', name: 'Honda Fit', year: 2020, price: 9.5, mileage: 22000, transmission: 'Auto', condition: 'Reconditioned' },
    { id: 's3', name: 'Suzuki Swift', year: 2020, price: 7.5, mileage: 30000, transmission: 'Auto', condition: 'Used' },
  ],
  'Suzuki': [
    { id: 's1', name: 'Toyota Aqua', year: 2019, price: 9.8, mileage: 35000, transmission: 'Auto', condition: 'Used' },
    { id: 's2', name: 'Honda Fit', year: 2019, price: 8.2, mileage: 48000, transmission: 'Auto', condition: 'Used' },
    { id: 's3', name: 'Nissan Magnite', year: 2022, price: 9.2, mileage: 8000, transmission: 'Auto', condition: 'Brand New' },
  ],
};

/* Market stats per brand/model (mock) */
const MARKET_STATS: Record<string, { avgPrice: number; avgMileage: number; trend: 'up' | 'down'; lastWeek: number; lastMonth: number; nextWeek: number; nextMonth: number }> = {
  'Toyota Premio':    { avgPrice: 18.7, avgMileage: 41600, trend: 'up',   lastWeek: 18.5, lastMonth: 18.2, nextWeek: 18.8, nextMonth: 19.1 },
  'Toyota Yaris':     { avgPrice: 10.8, avgMileage: 20000, trend: 'up',   lastWeek: 10.6, lastMonth: 10.3, nextWeek: 11.0, nextMonth: 11.3 },
  'Toyota Aqua':      { avgPrice: 10.6, avgMileage: 26500, trend: 'down', lastWeek: 10.8, lastMonth: 11.0, nextWeek: 10.5, nextMonth: 10.3 },
  'Toyota Corolla':   { avgPrice: 15.3, avgMileage: 15000, trend: 'up',   lastWeek: 15.1, lastMonth: 14.8, nextWeek: 15.5, nextMonth: 15.8 },
  'Honda Vezel':      { avgPrice: 13.8, avgMileage: 41600, trend: 'up',   lastWeek: 13.5, lastMonth: 13.0, nextWeek: 14.0, nextMonth: 14.5 },
  'Honda Fit':        { avgPrice: 8.8,  avgMileage: 35000, trend: 'down', lastWeek: 9.0,  lastMonth: 9.2,  nextWeek: 8.7,  nextMonth: 8.5 },
  'Honda Civic':      { avgPrice: 15.2, avgMileage: 42500, trend: 'up',   lastWeek: 15.0, lastMonth: 14.6, nextWeek: 15.5, nextMonth: 15.8 },
  'Honda CR-V':       { avgPrice: 18.1, avgMileage: 42500, trend: 'up',   lastWeek: 17.8, lastMonth: 17.2, nextWeek: 18.5, nextMonth: 19.0 },
  'Nissan Magnite':   { avgPrice: 8.8,  avgMileage: 15000, trend: 'up',   lastWeek: 8.6,  lastMonth: 8.3,  nextWeek: 9.0,  nextMonth: 9.3 },
  'Nissan X-Trail':   { avgPrice: 13.6, avgMileage: 45000, trend: 'down', lastWeek: 13.8, lastMonth: 14.0, nextWeek: 13.4, nextMonth: 13.2 },
  'Nissan Leaf':      { avgPrice: 10.0, avgMileage: 20000, trend: 'up',   lastWeek: 9.8,  lastMonth: 9.5,  nextWeek: 10.2, nextMonth: 10.5 },
  'Nissan Patrol':    { avgPrice: 32.0, avgMileage: 15000, trend: 'up',   lastWeek: 31.5, lastMonth: 30.8, nextWeek: 32.5, nextMonth: 33.0 },
  'Suzuki Wagon R':   { avgPrice: 6.1,  avgMileage: 31000, trend: 'down', lastWeek: 6.3,  lastMonth: 6.5,  nextWeek: 6.0,  nextMonth: 5.8 },
  'Suzuki Swift':     { avgPrice: 8.1,  avgMileage: 21000, trend: 'up',   lastWeek: 8.0,  lastMonth: 7.8,  nextWeek: 8.3,  nextMonth: 8.5 },
  'Suzuki Alto':      { avgPrice: 4.2,  avgMileage: 45000, trend: 'down', lastWeek: 4.3,  lastMonth: 4.5,  nextWeek: 4.1,  nextMonth: 4.0 },
  'Suzuki Vitara':    { avgPrice: 12.0, avgMileage: 28000, trend: 'up',   lastWeek: 11.8, lastMonth: 11.5, nextWeek: 12.2, nextMonth: 12.5 },
};

const DEFAULT_STATS = { avgPrice: 12.0, avgMileage: 30000, trend: 'up' as const, lastWeek: 11.8, lastMonth: 11.5, nextWeek: 12.2, nextMonth: 12.5 };

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Extract filters from navigation state
  const filters = (location.state as { filters?: FilterState } | null)?.filters;
  const brand = filters?.brand ?? 'All';
  const model = filters?.model ?? 'All';

  const searchQuery = useMemo(() => {
    if (brand !== 'All' && model !== 'All') return `${brand} ${model}`;
    if (brand !== 'All') return brand;
    return 'All Vehicles';
  }, [brand, model]);

  const vehicleKey = brand !== 'All' && model !== 'All' ? `${brand} ${model}` : '';
  const stats = MARKET_STATS[vehicleKey] ?? DEFAULT_STATS;

  // Get results based on filter selection
  const results = useMemo<CarResult[]>(() => {
    if (vehicleKey && VEHICLE_DATABASE[vehicleKey]) {
      return VEHICLE_DATABASE[vehicleKey];
    }
    // If only brand selected, show all models for that brand
    if (brand !== 'All') {
      return Object.entries(VEHICLE_DATABASE)
        .filter(([key]) => key.startsWith(brand))
        .flatMap(([, cars]) => cars);
    }
    // Fallback: show everything
    return Object.values(VEHICLE_DATABASE).flat().slice(0, 6);
  }, [brand, vehicleKey]);

  // Similar vehicles from different brands
  const similarVehicles = useMemo<CarResult[]>(() => {
    if (brand !== 'All' && SIMILAR_DATABASE[brand]) return SIMILAR_DATABASE[brand];
    return SIMILAR_DATABASE['Toyota'];
  }, [brand]);

  // Active filter summary chips
  const filterChips = useMemo(() => {
    if (!filters) return [];
    const chips: string[] = [];
    if (filters.condition !== 'All') chips.push(filters.condition);
    if (filters.priceRange !== 'All') chips.push(filters.priceRange.replace(/([A-Z])/g, ' $1').trim());
    if (filters.city !== 'All') chips.push(filters.city);
    if (filters.mileageRange !== 'All') chips.push(filters.mileageRange.replace(/([A-Z])/g, ' $1').trim());
    if (filters.yearRange !== 'All') chips.push(filters.yearRange);
    return chips;
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [brand, model]);

  if (loading) return <SearchResultsSkeleton />;

  return (
    <div className="results-wrapper">
      
      <div className="results-header">
        <button className="back-btn" onClick={() => navigate('/', { state: { filters } })}>
          <ArrowLeft size={18} />
          Back to Search
        </button>
        <h2>Market Analysis for <span className="gradient-text">{searchQuery}</span></h2>
        <p>Based on your selected filters and real-time market data.</p>
        {filterChips.length > 0 && (
          <div className="filter-chips">
            {filterChips.map(chip => (
              <span key={chip} className="filter-chip">{chip}</span>
            ))}
          </div>
        )}
      </div>

      <section className="analytics-dashboard">
        <div className="analytics-main">
          <div className="stats-overview-flex">
            <div className="stat-card glass-panel-small">
              <span className="stat-label">Average Price</span>
              <h3 className="stat-value">{stats.avgPrice}M <span className="currency">LKR</span></h3>
            </div>
            <div className="stat-card glass-panel-small">
              <span className="stat-label">Average Mileage</span>
              <h3 className="stat-value">{stats.avgMileage.toLocaleString()} <span className="unit">km</span></h3>
            </div>
          </div>

          <div className="graph-card glass-panel-small">
            <div className="graph-header">
              <h4>Price Trend (2000 – 2026)</h4>
              <span className={`trend-badge ${stats.trend === 'up' ? 'positive' : 'negative'}`}>
                {stats.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stats.trend === 'up' ? ' Increasing' : ' Decreasing'}
              </span>
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
                {stats.trend === 'up' ? (
                  <>
                    <path d="M 0 180 C 150 170, 250 100, 500 40 L 500 200 L 0 200 Z" fill="url(#fillGrad)" />
                    <path d="M 0 180 C 150 170, 250 100, 500 40" fill="none" stroke="url(#lineGrad)" strokeWidth="4" className="chart-line" />
                  </>
                ) : (
                  <>
                    <path d="M 0 60 C 100 70, 300 120, 500 160 L 500 200 L 0 200 Z" fill="url(#fillGrad)" />
                    <path d="M 0 60 C 100 70, 300 120, 500 160" fill="none" stroke="url(#lineGrad)" strokeWidth="4" className="chart-line" />
                  </>
                )}
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
                <span className="pred-price">{stats.lastWeek}M</span>
              </div>
              <div className="pred-item">
                <span className="pred-time">Last Month</span>
                <span className="pred-price">{stats.lastMonth}M</span>
              </div>
              <div className="divider"></div>
              <div className="pred-item highlight">
                <span className="pred-time">Next Week</span>
                <span className="pred-price">{stats.nextWeek}M</span>
              </div>
              <div className="pred-item highlight">
                <span className="pred-time">Next Month</span>
                <span className="pred-price">{stats.nextMonth}M</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Exact Matches */}
      <section className="listings-section">
        <h3 className="section-title">Available Listings ({results.length})</h3>
        
        <div className="flex-results-grid">
          {results.map(car => (
            <div key={car.id} className="glass-card flex-card">
              {car.imageUrl && (
                <div className="card-image-wrapper">
                  <img src={car.imageUrl} alt={car.name} className="car-image" />
                </div>
              )}
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

      {/* Similar Choices Section */}
      <section className="listings-section similar-section">
        <div className="section-header-row">
          <h3 className="section-title">Similar Vehicles to Consider</h3>
        </div>
        
        <div className="flex-results-grid">
          {similarVehicles.map(car => (
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
                <button className="btn-glass-purple" onClick={() => navigate('/')}>
                  <Search size={14} style={{ marginRight: '0.4rem' }} />
                  Search This Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SearchResults;