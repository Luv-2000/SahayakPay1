import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

const fallbackPhoto = 'https://randomuser.me/api/portraits/lego/1.jpg';

export default function SendMoneyToScreen() {
  const { name, photoUrl } = useLocalSearchParams<{ name?: string; photoUrl?: string }>();
  const [amount, setAmount] = useState('0');
  const router = useRouter();

  useEffect(() => {
    setAmount('0');
  }, [name, photoUrl]);

  const handleSend = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    try {
      const res = await fetch('http://192.168.160.73:3001/send-money', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUserId: 'demoUser',
          toName: name,
          toPhotoUrl: photoUrl,
          amount: Number(amount),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push({
          pathname: './payment-success',
          params: {
            name: name || '',
            photoUrl: photoUrl || '',
            amount: amount,
            transactionId: data.transactionId || '',
          },
        });
      } else {
        alert(data.error || 'Failed to send money');
      }
    } catch (e) {
      alert('Failed to send money');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.profileBox}>
        <Image
          source={{ uri: photoUrl && photoUrl.startsWith('http') ? photoUrl : fallbackPhoto }}
          style={styles.photo}
          accessibilityIgnoresInvertColors
        />
        <Text style={styles.name}>{name}</Text>
        <View style={styles.divider} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inputBox}>
        <Text style={styles.label}>Enter amount to send (₹):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount in rupees"
          placeholderTextColor="#AAA"
        />
        <View style={styles.quickAddGrid}>
          <View style={styles.quickAddRow}>
            {[10, 50].map((inc) => (
              <Pressable
                key={inc}
                style={styles.quickAddButton}
                accessibilityRole="button"
                onPress={() => {
                  const current = parseInt(amount || '0', 10);
                  setAmount((current + inc).toString());
                }}
              >
                <Text style={styles.quickAddText}>{`+${inc}`}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.quickAddRow}>
            {[100, 500].map((inc) => (
              <Pressable
                key={inc}
                style={styles.quickAddButton}
                accessibilityRole="button"
                onPress={() => {
                  const current = parseInt(amount || '0', 10);
                  setAmount((current + inc).toString());
                }}
              >
                <Text style={styles.quickAddText}>{`+${inc}`}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Pressable style={styles.sendButton} accessibilityRole="button" onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </KeyboardAvoidingView>
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
  profileBox: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 40,
  },
  photo: {
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 8,
    borderColor: '#FFF',
    marginBottom: 6,
    backgroundColor: '#FFF',
  },
  name: {
    color: '#FFD700',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 0,
  },
  divider: {
    width: '85%',
    borderBottomWidth: 6,
    borderBottomColor: '#FFD700', // Change to '#000' if gold is not visible
    marginTop: 0,
    marginBottom: 0,
    alignSelf: 'center',
  },
  inputBox: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    marginTop: 0,
  },
  label: {
    color: '#FFF',
    fontSize: 28,
    marginBottom: 8,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#FFD700',
    backgroundColor: '#222',
    color: '#FFF',
    fontSize: 32,
    paddingHorizontal: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  sendButton: {
    backgroundColor: '#1976D2',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 0,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
    elevation: 10,
    width: '100%',
    maxWidth: 340,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  quickAddGrid: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickAddRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    gap: 18,
  },
  quickAddButton: {
    backgroundColor: '#388E3C',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 6,
    borderWidth: 3,
    borderColor: '#FFF',
    elevation: 6,
    minWidth: 120,
    width: 120,
    alignItems: 'center',
  },
  quickAddText: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
}); 