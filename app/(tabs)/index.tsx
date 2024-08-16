import React, { useState } from 'react';
import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';
import Animated, { 
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    cancelAnimation, } from 'react-native-reanimated';

export default function HomeScreen() {
  //movimiento
  const height=3000
  const offset = useSharedValue(height / 2 - 160);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const startAnimation = () => {
    offset.value = withRepeat(
      withTiming(offset.value > 0 ? -height / 2 + 160 : height / 2 - 160, {
        duration: 100,
      }),
      -1,
      true
    );
  };

  React.useEffect(() => {
    startAnimation();
  }, []);

  const handleCancelAnimation = () => {
    cancelAnimation(offset);
  };
  // desvanecimiento
  const opacity = useSharedValue(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundColors = ['#0fec95', '#ff6f61', '#6a0dad', '#ff4500'];
  const backgroundColor = useSharedValue(backgroundColors[currentIndex]);

  const handlePress = () => {
    opacity.value = withSpring(opacity.value -0.10, { duration: 500 } );

    const nextIndex = (currentIndex + 1) % backgroundColors.length;
    setCurrentIndex(nextIndex);

    // Cambia el color de fondo con animación
    backgroundColor.value = withSpring(backgroundColors[nextIndex], { duration: 500 });
  };

  return (

    <Animated.View style={{
      backgroundColor,
      flex: 1,
      justifyContent: 'space-between',
    }}>
    
      {/* titulo */}
      <Animated.View style={{
          opacity,
          alignItems: 'center',
          marginTop: 20,
      }}>
        <Text style={styles.title}>Bienvenido a mi página con animación</Text>
      </Animated.View>

      {/* <Animated.View style={[styles.box, animatedStyles]} /> */}

    <View style={styles.row}>
    <Button title="Cancel animation" onPress={handleCancelAnimation} />

    <Button title="Start animation" onPress={startAnimation} />
    </View>

    {/* boton */}
    <View style={styles.buttonContainer}>
      <Button  title="Iniciar" onPress={handlePress} />
    </View>
    
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#0fec95', 
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
    fontSize:90
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBox: {
    height: 100,
    backgroundColor: 'violet',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});
