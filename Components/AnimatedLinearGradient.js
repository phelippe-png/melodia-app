import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, StyleSheet, View } from 'react-native';

const AnimatedLinearGradient = ({ gradientAnim, style, children }) => {
  // Criação de interpoladores para animar as cores do gradiente
  const interpolatedColors = gradientAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      'rgba(75, 20, 109, 1)', // roxinho escuro
      'rgba(156, 94, 193, 1)', // rosinha claro
    ],
  });

  return ( //212121
    <View style={[style, StyleSheet.absoluteFillObject, { backgroundColor: '#33044a' }]}>
      {children}
    </View>
    // <Animated.View style={[style, StyleSheet.absoluteFillObject, { backgroundColor: '#240334' }]}>
    //   <LinearGradient
    //     colors={['rgba(75, 20, 109, 1)', 'rgba(156, 94, 193, 1)']}
    //     style={StyleSheet.absoluteFillObject}
    //     start={[0, 0]}
    //     end={[1, 1]}
    //   >
    //     {children}
    //   </LinearGradient>
    // </Animated.View>
  );
};

export default AnimatedLinearGradient;
