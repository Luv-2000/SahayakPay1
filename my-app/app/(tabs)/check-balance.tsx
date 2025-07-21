import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function CheckBalanceScreen() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetch('http://192.168.160.73:3001/balance/demoUser')
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.balance === 'number') {
            setBalance(data.balance);
            setError(null);
          } else {
            setError('Could not fetch balance');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Could not fetch balance');
          setLoading(false);
        });
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Account Balance</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>₹ {balance?.toLocaleString('en-IN')}</Text>
        </View>
      )}
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
  title: {
    fontSize: 36,
    color: '#FFD700',
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  balanceBox: {
    backgroundColor: '#388E3C',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF',
    elevation: 14,
    shadowColor: '#FFF',
    shadowOpacity: 0.7,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 24 },
  },
  balanceLabel: {
    color: '#FFF',
    fontSize: 22,
    marginBottom: 12,
    fontWeight: '600',
  },
  balanceValue: {
    color: '#FFD700',
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  error: {
    color: '#D32F2F',
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
  },
}); 