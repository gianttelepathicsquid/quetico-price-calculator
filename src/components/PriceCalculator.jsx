import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, Box, DollarSign, Truck, ArrowRight } from 'lucide-react';

const PriceCalculator = () => {
  const [ordersPerMonth, setOrdersPerMonth] = useState(500);
  const [itemsPerOrder, setItemsPerOrder] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [totalEstimate, setTotalEstimate] = useState(0);

  const basePrice = 2.50;
  const additionalItemPrice = 0.75;
  const promoItemPrice = 0.25;

  const calculateEstimate = () => {
    setIsAnimating(true);
    setShowEstimate(false);
    
    setTimeout(() => {
      const total = (basePrice + (additionalItemPrice * (itemsPerOrder - 1))) * ordersPerMonth;
      setTotalEstimate(total);
      setShowEstimate(true);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div style={{
      backgroundColor: '#0A192F',
      color: 'white',
      padding: '32px',
      borderRadius: '12px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold',
          marginBottom: '16px',
          color: '#00B4D8'
        }}>
          Pick & Pack Pricing Calculator
        </h2>
        <p style={{ color: '#94A3B8' }}>
          Get an instant estimate for your fulfillment needs
        </p>
      </div>

      <div style={{
        backgroundColor: '#1E2A3B',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', marginBottom: '12px' }}>
            Monthly Orders
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="range"
              min="100"
              max="10000"
              value={ordersPerMonth}
              onChange={(e) => setOrdersPerMonth(parseInt(e.target.value))}
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#2A3B4D',
                borderRadius: '2px',
                appearance: 'none',
                outline: 'none'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '-30px',
              left: `${(ordersPerMonth - 100) / (10000 - 100) * 100}%`,
              transform: 'translateX(-50%)',
              backgroundColor: '#00B4D8',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '0.875rem',
              transition: 'all 0.3s ease'
            }}>
              {ordersPerMonth.toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', marginBottom: '12px' }}>
            Items Per Order (Average)
          </label>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setItemsPerOrder(num)}
                style={{
                  backgroundColor: itemsPerOrder === num ? '#00B4D8' : '#2A3B4D',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: itemsPerOrder === num ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#94A3B8', marginBottom: '4px' }}>Base Price</div>
            <div style={{ fontSize: '1.5rem', color: '#00B4D8' }}>
              ${basePrice.toFixed(2)}
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>per order</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#94A3B8', marginBottom: '4px' }}>Additional Items</div>
            <div style={{ fontSize: '1.5rem', color: '#00B4D8' }}>
              ${additionalItemPrice.toFixed(2)}
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>per item</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#94A3B8', marginBottom: '4px' }}>Promo Items</div>
            <div style={{ fontSize: '1.5rem', color: '#00B4D8' }}>
              ${promoItemPrice.toFixed(2)}
            </div>
            <div style={{ color: '#94A3B8', fontSize: '0.875rem' }}>per item</div>
          </div>
        </div>

        <button
          onClick={calculateEstimate}
          style={{
            backgroundColor: '#00B4D8',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '8px',
            width: '100%',
            fontSize: '1.125rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#0096B4'}
          onMouseLeave={e => e.target.style.backgroundColor = '#00B4D8'}
        >
          {isAnimating ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              animation: 'pulse 1s infinite'
            }}>
              <Package className="animate-spin" />
              Calculating...
            </div>
          ) : (
            <>
              Calculate Estimate
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>

      {showEstimate && (
        <div style={{
          backgroundColor: '#1E2A3B',
          padding: '24px',
          borderRadius: '8px',
          textAlign: 'center',
          animation: 'slideUp 0.5s ease-out'
        }}>
          <div style={{ color: '#94A3B8', marginBottom: '8px' }}>
            Estimated Monthly Cost
          </div>
          <div style={{
            fontSize: '2.5rem',
            color: '#00B4D8',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            ${totalEstimate.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            color: '#94A3B8'
          }}>
            <div>
              {ordersPerMonth.toLocaleString()} orders
            </div>
            <div>
              {itemsPerOrder} items/order
            </div>
            <div>
              ${(totalEstimate / ordersPerMonth).toFixed(2)}/order
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #00B4D8;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
        `}
      </style>
    </div>
  );
};

export default PriceCalculator;
