import React from 'react';
import './index.css';
const CustomCard = ({ children, borderRadius, className }) => {
    return (
        <div className={`card-container ${className}`} style={{ borderRadius }}>
            {children}
        </div>
    );
};
export default CustomCard;