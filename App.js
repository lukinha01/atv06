import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

export default function App() {
  const [contacts, setContacts] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:3000/contatos') 
      .then((response) => response.json())
      .then((data) => {
        console.log('Dados recebidos:', data);  
        setContacts(data.contatos || data || []);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="email" type="material-community" color="#fff" size={24} />
        <Text style={styles.headerTitle}>Messages & Chat</Text>
      </View>

      {/* Options Bar */}
      <View style={styles.optionsBar}>
        <Text style={styles.optionText}>Mark all read</Text>
        <View style={styles.sortOption}>
          <Text style={styles.optionText}>Sort by time</Text>
          <Icon name="chevron-down" type="material-community" size={18} />
        </View>
      </View>

      {/* Contacts List */}
      <ScrollView contentContainerStyle={styles.messageList}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <View key={contact.id} style={styles.messageContainer}>
              <Avatar rounded source={{ uri: contact.avatar }} size="medium" />
              <View style={styles.messageContent}>
                <View style={styles.messageTopRow}>
                  <Text style={styles.name}>{contact.name}</Text>
                  {contact.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{contact.unread}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.message}>{contact.message}</Text>
              </View>
              <Text style={styles.time}>{contact.time}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noContacts}>No contacts available.</Text>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Icon name="home" type="material" />
        <Icon name="chat" type="material" color="#4A5AC7" />
        <Icon name="email" type="material" />
        <Icon name="person" type="material" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A5AC7',
    padding: 16,
  },
  headerTitle: {
    marginLeft: 12,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  sortOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  unreadBadge: {
    backgroundColor: '#4A5AC7',
    borderRadius: 10,
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
  message: {
    color: '#666',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 8,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  noContacts: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
});
