import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Welcome to SahayakPay</Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={({ pressed }) => [styles.button, styles.sendMoney, pressed && styles.pressed]}
          accessibilityLabel="Send Money"
          accessibilityRole="button"
          onPress={() => { router.push('/(tabs)/send-money'); }}
        >
          <Ionicons name="send" size={40} color="#FFF" style={styles.icon} accessibilityElementsHidden />
          <Text style={styles.buttonText}>Send Money</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, styles.checkBalance, pressed && styles.pressed]}
          accessibilityLabel="Check Balance"
          accessibilityRole="button"
          onPress={() => { router.push('./check-balance'); }}
        >
          <MaterialIcons name="account-balance-wallet" size={40} color="#FFF" style={styles.icon} accessibilityElementsHidden />
          <Text style={styles.buttonText}>Check Balance</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, styles.transactionHistory, pressed && styles.pressed]}
          accessibilityLabel="Transaction History"
          accessibilityRole="button"
          onPress={() => {/* router.push('/transaction-history') */}}
        >
          <FontAwesome5 name="history" size={40} color="#FFF" style={styles.icon} accessibilityElementsHidden />
          <Text style={styles.buttonText}>Transaction History</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.button, styles.sahayakPay, pressed && styles.pressed]}
          accessibilityLabel="SahayakPay"
          accessibilityRole="button"
          onPress={() => { /* Add your action here */ }}
        >
          <Ionicons name="mic" size={40} color="#FFF" style={styles.icon} accessibilityElementsHidden />
          <Text style={styles.buttonText}>SahayakPay</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    padding: 24,
  },
  title: {
    fontSize: 40,
    color: '#FFD700',
    marginBottom: 24, // Reduced from 60
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 18, // Reduced from 32
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%', // Use percentage for better responsiveness
    maxWidth: 400,
    minWidth: 260,
    height: 110,
    borderRadius: 20,
    justifyContent: 'flex-start',
    paddingHorizontal: 14, // Reduced from 24
    marginVertical: 6, // Reduced from 12
    elevation: 14, // Even stronger shadow for 3D effect
    shadowColor: '#FFF', // White shadow for glowing 3D effect
    shadowOpacity: 0.7,
    shadowRadius: 28, // Increased for longer shadow
    shadowOffset: { width: 0, height: 24 }, // Increased shadow length
    borderWidth: 4,
    borderColor: '#FFF', // White border for high contrast
    backgroundColor: '#fff0',
  },
  icon: {
    marginRight: 20,
  },
  sendMoney: {
    backgroundColor: '#1976D2',
  },
  checkBalance: {
    backgroundColor: '#388E3C',
  },
  transactionHistory: {
    backgroundColor: '#D32F2F',
  },
  sahayakPay: {
    backgroundColor: '#8E24AA', // A distinct color for the new button
  },
  buttonText: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'left',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ translateY: 8 }], // Move button down on press
  },
});
