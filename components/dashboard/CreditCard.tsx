import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Colors } from '../../constants/Colors';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface CreditCardProps {
  brand?: string;
  team?: string;
  balanceLabel?: string;
  limit?: string;
  number?: string;
  showStatus?: boolean;
  frozen?: boolean;
}

export const CreditCard: React.FC<CreditCardProps> = ({
  brand = 'cleer',
  team = "Arian's Design Team",
  balanceLabel = '$18,240 left this month',
  limit = '$50,000 monthly limit',
  number = '•••• 4821',
  showStatus = false,
  frozen = false,
}) => {
  const flipValue = useSharedValue(0);

  const handlePress = () => {
    flipValue.value = withSpring(flipValue.value === 0 ? 1 : 0, {
      damping: 15,
      stiffness: 120,
    });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 1], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  return (
    <Pressable onPress={handlePress} style={styles.pressableContainer}>
      {/* Front of Card */}
      <Animated.View style={[styles.container, frontAnimatedStyle]}>
        <Image 
          source={{ uri: 'https://www.dropbox.com/scl/fi/86a9qpl8pt01qyhpvtvlt/9583338d1430eaee96c0357cdd95bff0.jpg?rlkey=8thdxkybnihjaqp83ddr2uk9c&st=5553561f&raw=1' }}
          style={styles.bgImage}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.brand}>{brand}</Text>
            <View style={styles.headerRight}>
              {showStatus && !frozen && <View style={styles.statusDot} />}
              <Text style={styles.team}>{team}</Text>
            </View>
          </View>
          
          <View style={styles.footer}>
            <View>
              <Text style={styles.balanceLabel}>{balanceLabel}</Text>
              <View style={styles.underline} />
              <Text style={styles.limit}>{limit}</Text>
            </View>
            <Text style={styles.number}>{number}</Text>
          </View>
        </View>

        {frozen && (
          <View style={styles.frozenOverlay}>
            <View style={styles.frozenBadge}>
              <Text style={styles.frozenText}>Frozen</Text>
            </View>
          </View>
        )}
      </Animated.View>

      {/* Back of Card */}
      <Animated.View style={[styles.container, styles.backContainer, backAnimatedStyle]}>
        <View style={styles.magneticStrip} />
        <View style={styles.backContent}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Card Number</Text>
            <Text style={styles.detailValue}>4821 9032 1124 8294</Text>
          </View>
          <View style={styles.detailRowGroup}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expiry</Text>
              <Text style={styles.detailValue}>12/28</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>CVV</Text>
              <Text style={styles.detailValue}>842</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ZIP</Text>
              <Text style={styles.detailValue}>94105</Text>
            </View>
          </View>
          <Text style={styles.supportText}>For customer service, call 1-800-555-0199</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    height: 200,
    width: '100%',
  },
  container: {
    backgroundColor: Colors.primaryBlack,
    borderRadius: 20,
    height: 200,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    overflow: 'hidden',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    zIndex: 0,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentLime,
  },
  brand: {
    fontFamily: 'Urbanist_700Bold',
    fontSize: 20,
    color: Colors.white,
    letterSpacing: -0.5,
  },
  team: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 18,
    color: Colors.white,
    marginBottom: 4,
  },
  underline: {
    height: 2,
    width: 40,
    backgroundColor: Colors.accentLime,
    marginBottom: 8,
    borderRadius: 1,
  },
  limit: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
  },
  number: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1,
  },
  frozenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 11, 11, 0.6)',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frozenBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  frozenText: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: Colors.white,
    letterSpacing: 0.5,
  },
  backContainer: {
    backgroundColor: '#1A1A1A',
    padding: 0,
  },
  magneticStrip: {
    height: 40,
    backgroundColor: '#000',
    width: '100%',
    marginTop: 24,
  },
  backContent: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  detailRowGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  detailRow: {
    marginBottom: 4,
  },
  detailLabel: {
    fontFamily: 'Urbanist_500Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 2,
  },
  detailValue: {
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 14,
    color: Colors.white,
    letterSpacing: 1,
  },
  supportText: {
    fontFamily: 'Urbanist_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 16,
    textAlign: 'center',
  }
});
