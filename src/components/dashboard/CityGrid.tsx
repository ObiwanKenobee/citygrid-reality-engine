
import React from 'react';

interface Building {
  id: string;
  name: string;
  status: 'good' | 'warning' | 'critical';
  type: 'residential' | 'commercial' | 'industrial';
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

interface CityGridProps {
  buildings: Building[];
  onSelectBuilding: (building: Building) => void;
}

const CityGrid: React.FC<CityGridProps> = ({ buildings, onSelectBuilding }) => {
  // Calculate status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-status-success';
      case 'warning': return 'bg-status-warning';
      case 'critical': return 'bg-status-danger';
      default: return 'bg-blue-500';
    }
  };
  
  // Calculate building color
  const getBuildingColor = (type: string) => {
    switch (type) {
      case 'residential': return 'bg-simcity-blue';
      case 'commercial': return 'bg-simcity-teal';
      case 'industrial': return 'bg-simcity-orange';
      default: return 'bg-gray-500';
    }
  };
  
  // Calculate building size
  const getBuildingSize = (size: string) => {
    switch (size) {
      case 'small': return 'w-16 h-16';
      case 'medium': return 'w-20 h-20';
      case 'large': return 'w-24 h-24';
      default: return 'w-16 h-16';
    }
  };

  return (
    <div className="relative w-full h-80 bg-gray-900 rounded-lg overflow-hidden grid-pattern border border-gray-800">
      {buildings.map((building) => (
        <div
          key={building.id}
          className={`absolute transform -translate-y-1/2 -translate-x-1/2 cursor-pointer transition-transform hover:scale-105 hover:z-10`}
          style={{
            top: `${building.position.y}%`,
            left: `${building.position.x}%`,
          }}
          onClick={() => onSelectBuilding(building)}
        >
          <div className={`${getBuildingSize(building.size)} ${getBuildingColor(building.type)} relative flex flex-col justify-end items-center`}>
            <div className="absolute -top-1 -right-1">
              <span className={`block w-3 h-3 rounded-full ${getStatusColor(building.status)} ring-2 ring-gray-900`}></span>
            </div>
            <div className="px-1 py-0.5 bg-black bg-opacity-60 w-full text-center">
              <span className="text-xs font-medium truncate">{building.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CityGrid;
