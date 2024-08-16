import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Animated, { 
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default function HomeScreen() {
  // Animación de deslizamiento para el título
  const translateY = useSharedValue(-100); // Comienza fuera de la pantalla, en la parte superior
  const opacity = useSharedValue(1); // Inicialmente visible

  // Estilo animado para el título
  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value, // Aplica la opacidad animada
    };
  });

  // Cambio de color de fondo y opacidad
  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundColors = ['#0fec95', '#ff6f61', '#6a0dad', '#ff4500'];
  const backgroundColor = useSharedValue(backgroundColors[currentIndex]);

  const handlePress = () => {
    opacity.value = withSpring(opacity.value - 0.30, { duration: 500 });

    const nextIndex = (currentIndex + 1) % backgroundColors.length;
    setCurrentIndex(nextIndex);

    // Cambia el color de fondo con animación
    backgroundColor.value = withSpring(backgroundColors[nextIndex], { duration: 500 });
  };

  // Iniciar animaciones cuando el componente se monte
  React.useEffect(() => {
    translateY.value = withTiming(0, { duration: 1000 }); // Desliza hacia abajo en 1 segundo
    opacity.value = withTiming(1, { duration: 1000 }); // Aumenta la opacidad a 1 en 1 segundo
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      {/* Título con animación */}
      <Animated.View style={[styles.titleContainer, animatedTitleStyle]}>
        <Text style={styles.title}>Bienvenido a mi página con animación</Text>
      </Animated.View>

      {/* Botón para cambiar el fondo */}
      <View style={styles.buttonContainer}>
        <Button title="Iniciar" onPress={handlePress} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
