import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChange, onClear }) => (
  <View style={styles.container}>
    <TextInput 
      style={styles.input} 
      placeholder="Cari gaya Bollywood..." 
      value={value} 
      onChangeText={onChange} 
    />
    {value !== '' && (
      <TouchableOpacity onPress={onClear}>
        <Text style={styles.clearBtn}>✕</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', marginHorizontal: 25, marginTop: -25, paddingHorizontal: 20, height: 50, borderRadius: 25, flexDirection: 'row', alignItems: 'center', elevation: 8, borderWidth: 1, borderColor: '#FFD700' },
  input: { flex: 1, color: '#333' },
  clearBtn: { fontSize: 18, color: '#8B0000', fontWeight: 'bold', marginLeft: 10 }
});

export default SearchBar;