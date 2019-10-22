import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export interface Props {
  style?: any;
}
const ScreenBackground: React.FC<Props> = ({ children, style }) => {
  return (
    <LinearGradient colors={['#21272b', '#0b0b0b']} start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} style={style}>
      {children}
    </LinearGradient>
  );
};

export default ScreenBackground;
