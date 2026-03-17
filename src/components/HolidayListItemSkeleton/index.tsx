import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { Card } from '@/src/design-system/components';
import { styles } from './styles';



//THIS Animated component was created by AI
//This is one way i use AI, to create components and  animations quickly and efficiently
// AI is great when used for components that do not contain business logic for safety reasons!!

export function HolidayListItemSkeleton() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.4, duration: 600, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Card>
      <Animated.View style={[styles.container, { opacity }]}>
        <View style={styles.title} />
        <View style={styles.meta} />
        <View style={styles.regions} />
      </Animated.View>
    </Card>
  );
}
