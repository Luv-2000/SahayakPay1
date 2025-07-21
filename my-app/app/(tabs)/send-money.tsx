import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';

const fallbackPhoto = 'https://randomuser.me/api/portraits/lego/1.jpg';

export default function SendMoneyScreen() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetch('http://192.168.160.73:3001/contacts')
        .then((res) => res.json())
        .then((data) => {
          setContacts(data.contacts || []);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load contacts');
          setLoading(false);
        });
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Select Contact</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {contacts.map((contact) => (
            <Pressable
              key={contact.id}
              style={({ pressed }) => [styles.contactButton, pressed && styles.pressed]}
              accessibilityLabel={`Send money to ${contact.name}`}
              accessibilityRole="button"
              onPress={() => { router.push({ pathname: './send-money-to', params: { name: contact.name, photoUrl: contact.photoUrl } }); }}
            >
              <Image
                source={{ uri: contact.photoUrl && contact.photoUrl.startsWith('http') ? contact.photoUrl : fallbackPhoto }}
                style={styles.photo}
                accessibilityIgnoresInvertColors
              />
              <Text style={styles.contactName}>{contact.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    paddingTop: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#FFD700',
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  error: {
    color: '#D32F2F',
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  contactButton: {
    width: 320,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 4,
    borderColor: '#FFF',
    elevation: 14,
    shadowColor: '#FFF',
    shadowOpacity: 0.7,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 24 },
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FFF',
  },
  contactName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 18,
    width: '100%',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ translateY: 8 }],
  },
}); 