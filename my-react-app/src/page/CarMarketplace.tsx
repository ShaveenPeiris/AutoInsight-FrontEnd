import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Imported the navigation hook
import '../styles/CarMarketplace.css';

interface Car {
  id: string;
  brand: string;
  model: string;
  price: number;
  mileage: number;
  transmission: string;
  condition: string;
  imageUrl: string;
  tag: string;
  tagColor: string;
  trend: string;
}

const BRANDS = ['Toyota', 'Honda', 'Nissan', 'Suzuki'];
const MODELS: { [key: string]: string[] } = {
  'Toyota': ['Premio', 'Yaris', 'Aqua', 'Corolla'],
  'Honda': ['Vezel', 'Fit', 'Civic', 'CR-V'],
  'Nissan': ['Magnite', 'X-Trail', 'Leaf', 'Patrol'],
  'Suzuki': ['Wagon R', 'Swift', 'Alto', 'Vitara'],
  'All': []
};
const CITIES = ['Colombo', 'Kandy', 'Galle', 'Gampaha', 'Kurunegala'];
const YEARS = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() - i).toString());

const TOP_SELLING_CARS: Car[] = [
  { id: '1', brand: 'Nissan', model: 'Magnite', price: 9.2, mileage: 15000, transmission: 'Auto', condition: 'Unregistered', imageUrl: 'https://images.unsplash.com/photo-1606090582531-50eef5eb8be7?auto=format&fit=crop&w=600&q=80', tag: 'Budget Friendly', tagColor: '#f472b6', trend: '+12.5%' },
  { id: '2', brand: 'Honda', model: 'Vezel RS', price: 12.5, mileage: 65000, transmission: 'Auto', condition: 'Registered', imageUrl: 'https://images.unsplash.com/photo-1568844321683-f435cebc61a0?auto=format&fit=crop&w=600&q=80', tag: 'Popular', tagColor: '#3b82f6', trend: '+5.2%' },
  { id: '3', brand: 'Toyota', model: 'Yaris', price: 11.0, mileage: 25000, transmission: 'Auto', condition: 'Registered', imageUrl: 'https://images.unsplash.com/photo-1590362891991-f7009743c726?auto=format&fit=crop&w=600&q=80', tag: 'Great Value', tagColor: '#10b981', trend: '-2.1%' },
];

const CarMarketplace: React.FC = () => {
  const navigate = useNavigate(); // <-- 2. Initialized the hook

  const [filters, setFilters] = useState({
    brand: 'All', model: 'All', condition: 'All', priceRange: 'All', city: 'All', mileageRange: 'All', yearRange: 'All'
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      if (name === 'brand') newFilters.model = 'All'; 
      return newFilters;
    });
  };

  // <-- 3. Created the function to handle the button click
  const handleSearch = () => {
    navigate('/results'); 
  };

  const availableModels = filters.brand === 'All' ? [] : MODELS[filters.brand];

  return (
    <div className="marketplace-wrapper">
      <div className="page-header">
        <div className="filter-intro">
          <h2>Find Your <span className="gradient-text">Perfect Vehicle</span></h2>
          <p>Use our detailed filters to search the extensive inventory.</p>
        </div>
      </div>

      <section className="glass-panel filter-section">
        <div className="filter-form-grid">
          <div className="filter-row">
            <div className="filter-item mandatory">
              <label>Make <span className="required">*</span></label>
              <select name="brand" value={filters.brand} onChange={handleFilterChange}>
                <option value="All">Any Make</option>
                {BRANDS.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div className="filter-item mandatory">
              <label>Model <span className="required">*</span></label>
              <select name="model" value={filters.model} onChange={handleFilterChange} disabled={filters.brand === 'All'}>
                <option value="All">Any Model</option>
                {availableModels.map(model => <option key={model} value={model}>{model}</option>)}
              </select>
            </div>
          </div>

          <div className="filter-row three-col">
            <div className="filter-item">
              <label>Condition</label>
              <select name="condition" value={filters.condition} onChange={handleFilterChange}>
                <option value="All">Any</option>
                <option value="Unregistered">Brand New</option>
                <option value="Registered">Used</option>
                <option value="Recondition">Used</option>
              </select>
            </div>
            <div className="filter-item">
              <label>Price Range</label>
              <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
                <option value="All">Any Price</option>
                <option value="Below10M">Below 10M LKR</option>
                <option value="10Mto20M">10M - 20M LKR</option>
                <option value="Above20M">Above 20M LKR</option>
              </select>
            </div>
            <div className="filter-item">
              <label>City</label>
              <select name="city" value={filters.city} onChange={handleFilterChange}>
                <option value="All">Any City</option>
                {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div className="filter-row three-col">
            <div className="filter-item">
              <label>Mileage</label>
              <select name="mileageRange" value={filters.mileageRange} onChange={handleFilterChange}>
                <option value="All">Any Mileage</option>
                <option value="Below50k">Below 50,000 km</option>
                <option value="50kto100k">50k - 100k km</option>
                <option value="Above100k">Above 100k km</option>
              </select>
            </div>
             <div className="filter-item">
              <label>Year Range</label>
              <select name="yearRange" value={filters.yearRange} onChange={handleFilterChange}>
                <option value="All">Any Year</option>
                {YEARS.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
             <div className="filter-item"></div>
          </div>

          <div className="filter-row search-row">
            {/* <-- 4. Attached the onClick handler to the button! */}
            <button className="btn-glow-blue search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <section className="inventory-section">
        <div className="section-title">
          <h3>🔥 Top Selling Vehicles</h3>
        </div>
        <div className="car-showcase-grid">
          {TOP_SELLING_CARS.map(car => (
            <div key={car.id} className="glass-card">
              <div className="card-image-wrapper">
                <span className="floating-tag" style={{ backgroundColor: car.tagColor }}>{car.tag}</span>
                <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="car-image" />
              </div>
              
              <div className="card-content">
                <h4 className="car-title">{car.brand} {car.model}</h4>
                
                <div className="price-row">
                  <div className="price-display">
                    <span className="currency">LKR</span> {car.price}M
                  </div>
                  <div className={`trend-pill ${car.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                    {car.trend.startsWith('+') ? '↗' : '↘'} {car.trend}
                  </div>
                </div>
                
                <div className="stats-row">
                  <div className="stat-box">
                    <span className="stat-icon">⏱</span>
                    <div className="stat-text">
                      <strong>{car.mileage.toLocaleString()}</strong>
                      <span>km</span>
                    </div>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">⚙️</span>
                    <div className="stat-text">
                      <strong>{car.transmission}</strong>
                      <span>Trans</span>
                    </div>
                  </div>
                  <div className="stat-box">
                    <span className="stat-icon">📋</span>
                    <div className="stat-text">
                      <strong>{car.condition}</strong>
                      <span>Status</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-glass-purple">View Full Analysis →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarMarketplace;