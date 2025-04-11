import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

interface IconGeneratorProps {
  size?: number;
  style?: any;
}

export function IconGenerator({ size = 1024, style }: IconGeneratorProps) {
  // Colors that match the app's theme
  const primaryColor = '#1F7A8C';
  const secondaryColor = '#2B6777';
  const accentColor = '#CF8E80';
  
  // Calculate dimensions based on size
  const radius = size / 2;
  const strokeWidth = size * 0.03;
  
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={primaryColor} />
            <Stop offset="100%" stopColor={secondaryColor} />
          </LinearGradient>
          <LinearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="100%" stopColor="#F5F5F7" />
          </LinearGradient>
        </Defs>
        
        {/* Background */}
        <Rect x="0" y="0" width={size} height={size} fill="url(#bgGradient)" />
        
        {/* Main circle with subtle shadow */}
        <Circle 
          cx={radius} 
          cy={radius} 
          r={radius * 0.8} 
          fill="url(#bgGradient)" 
          opacity={0.9}
        />
        
        {/* Decorative circular border */}
        <Circle 
          cx={radius} 
          cy={radius} 
          r={radius * 0.78} 
          stroke="rgba(255,255,255,0.5)" 
          strokeWidth={strokeWidth * 0.5} 
          fill="none" 
        />
        
        {/* Inner circle */}
        <Circle 
          cx={radius} 
          cy={radius} 
          r={radius * 0.7} 
          fill="url(#bgGradient)" 
        />
        
        {/* Geometric Islamic pattern - simplified octagonal star */}
        <G transform={`translate(${radius}, ${radius}) scale(${size/800})`}>
          {/* First set of lines */}
          <Path
            d="M 0,-300 L 0,300 M -300,0 L 300,0 M -212,-212 L 212,212 M -212,212 L 212,-212"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={10}
          />
          
          {/* Inner octagon */}
          <Path
            d="M 0,-200 L 141,-141 L 200,0 L 141,141 L 0,200 L -141,141 L -200,0 L -141,-141 Z"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth={12}
          />
          
          {/* Outer octagon */}
          <Path
            d="M 0,-280 L 198,-198 L 280,0 L 198,198 L 0,280 L -198,198 L -280,0 L -198,-198 Z"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={8}
          />
        </G>
        
        {/* Arabic letter ذ (Dhal) stylized in the center */}
        <G transform={`translate(${radius * 0.5}, ${radius * 0.5}) scale(${size/1200})`}>
          <Path
            d="M 350,290 C 400,200 500,180 550,240 C 600,300 550,380 480,400 C 410,420 380,380 360,360 L 350,370 C 335,385 315,390 300,380 C 285,370 280,350 290,335 C 300,320 320,315 335,325 L 350,335"
            stroke="white"
            strokeWidth={35}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Dot above the Dhal letter */}
          <Circle cx={550} cy={200} r={25} fill="white" />
        </G>
        
        {/* Decorative elements */}
        <Circle cx={radius * 0.3} cy={radius * 0.3} r={size * 0.015} fill="rgba(255,255,255,0.8)" />
        <Circle cx={radius * 1.7} cy={radius * 0.3} r={size * 0.015} fill="rgba(255,255,255,0.8)" />
        <Circle cx={radius * 0.3} cy={radius * 1.7} r={size * 0.015} fill="rgba(255,255,255,0.8)" />
        <Circle cx={radius * 1.7} cy={radius * 1.7} r={size * 0.015} fill="rgba(255,255,255,0.8)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
}); 