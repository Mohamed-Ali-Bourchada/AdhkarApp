import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';

interface AppIconProps {
  size?: number;
  bgColor1?: string;
  bgColor2?: string;
  fgColor1?: string;
  fgColor2?: string;
}

export function AppIcon({
  size = 1024,
  bgColor1 = '#1F7A8C',
  bgColor2 = '#2B6777',
  fgColor1 = '#FFFFFF',
  fgColor2 = '#F7F7F7',
}: AppIconProps) {
  const viewBox = `0 0 ${size} ${size}`;
  const radius = size / 2;
  const strokeWidth = size * 0.03;
  const innerRadius = radius * 0.85;
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={viewBox}>
        <Defs>
          <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={bgColor1} />
            <Stop offset="100%" stopColor={bgColor2} />
          </LinearGradient>
          <LinearGradient id="fgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={fgColor1} />
            <Stop offset="100%" stopColor={fgColor2} />
          </LinearGradient>
        </Defs>
        
        {/* Background Circle */}
        <Circle 
          cx={radius} 
          cy={radius} 
          r={radius} 
          fill="url(#bgGradient)" 
        />
        
        {/* Decorative Outer Ring */}
        <Circle 
          cx={radius} 
          cy={radius} 
          r={radius - strokeWidth/2} 
          stroke="rgba(255,255,255,0.25)" 
          strokeWidth={strokeWidth} 
          fill="none" 
        />
        
        {/* Inner Circle */}
        <Circle 
          cx={radius} 
          cy={radius} 
          r={innerRadius} 
          fill="url(#bgGradient)" 
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth/2}
        />
        
        {/* Arabic letter ذ (Dhal) stylized - central to the concept of "Dhikr/Adhkar" */}
        <G transform={`translate(${radius * 0.5}, ${radius * 0.5}) scale(${size/1500})`}>
          <Path
            d="M350 250 C400 180, 500 150, 550 200 C600 250, 550 300, 500 320 C450 340, 400 320, 380 300 L370 310 C360 320, 350 325, 340 320 C330 315, 325 305, 330 295 C335 285, 345 280, 355 285 L365 290 M500 150 C520 130, 540 120, 560 140 C580 160, 560 180, 540 185 C520 190, 500 180, 495 165"
            fill="none"
            stroke="url(#fgGradient)"
            strokeWidth={size/50}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        
        {/* Decorative dots (common in Arabic calligraphy) */}
        <Circle cx={radius * 0.85} cy={radius * 0.4} r={size * 0.02} fill={fgColor1} />
        <Circle cx={radius * 1.15} cy={radius * 0.6} r={size * 0.02} fill={fgColor1} />
        <Circle cx={radius} cy={radius * 1.3} r={size * 0.02} fill={fgColor1} />
        
        {/* Outer decorative elements - simplified Arabic geometric pattern */}
        <G transform={`translate(${radius}, ${radius}) scale(${size/1200})`}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <Path
              key={i}
              d={`M 0 -400 Q 80 -350, 100 -300 Q 120 -250, 80 -220 Q 40 -190, 0 -200 Q -40 -190, -80 -220 Q -120 -250, -100 -300 Q -80 -350, 0 -400`}
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth={size/150}
              transform={`rotate(${angle})`}
            />
          ))}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
  },
}); 