import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const fallbackPhoto = 'https://randomuser.me/api/portraits/lego/1.jpg';

export default function PaymentSuccessScreen() {
  const { name, photoUrl, amount, transactionId } = useLocalSearchParams<{
    name?: string;
    photoUrl?: string;
    amount?: string;
    transactionId?: string;
  }>();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.success}>Payment Successful!</Text>
      <Image
        source={{ uri: photoUrl && photoUrl.startsWith('http') ? photoUrl : fallbackPhoto }}
        style={styles.photo}
        accessibilityIgnoresInvertColors
      />
      <Text style={styles.name}>{name}</Text>
      <View style={styles.divider} />
      <Text style={styles.amountLabel}>Amount Sent</Text>
      <Text style={styles.amountValue}>₹ {Number(amount).toLocaleString('en-IN')}</Text>
      <Text style={styles.txnLabel}>Transaction ID</Text>
      <Text style={styles.txnValue}>{transactionId}</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  success: {
    color: '#388E3C',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 18,
    letterSpacing: 1,
  },
  photo: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    borderColor: '#FFF',
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  name: {
    color: '#FFD700',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 0,
  },
  divider: {
    width: '70%',
    borderBottomWidth: 4,
    borderBottomColor: '#FFD700',
    marginTop: 8,
    marginBottom: 18,
    alignSelf: 'center',
  },
  amountLabel: {
    color: '#FFF',
    fontSize: 22,
    marginBottom: 4,
    fontWeight: '600',
  },
  amountValue: {
    color: '#FFD700',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  txnLabel: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 2,
    fontWeight: '600',
  },
  txnValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
}); 