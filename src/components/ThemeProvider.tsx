import React from 'react';
import { UIStyle } from '../types';

interface ThemeContextType {
  style: UIStyle;
  setStyle: (style: UIStyle) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [style, setStyle] = React.useState<UIStyle>('micro-scada-x');

  return (
    <ThemeContext.Provider value={{ style, setStyle }}>
      <div className={
        style === 'classic-scada' ? 'bg-[#000080] text-[#00FF00] font-mono' :
        style === 'micro-scada-x' ? 'bg-[#1A1A1A] text-[#E0E0E0] font-sans' :
        'bg-black text-white font-sans'
      }>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
