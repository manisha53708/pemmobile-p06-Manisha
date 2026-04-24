import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductCard = ({ item, isGrid }) => (
  <View style={[styles.card, isGrid ? styles.cardGrid : styles.cardList]}>
    <Text style={[styles.emoji, { fontSize: isGrid ? 45 : 35 }]}>{item.image}</Text>
    <View style={[styles.info, isGrid && { alignItems: 'center' }]}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.price}>₹ {item.price.toLocaleString('en-IN')}</Text>
      <Text style={styles.rating}>⭐ {item.rating}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFDF5', borderRadius: 15, padding: 15, marginBottom: 12, borderWidth: 1.5, borderColor: '#FFD700', elevation: 4 },
  cardList: { flexDirection: 'row', alignItems: 'center' },
  cardGrid: { flex: 1, margin: 8, alignItems: 'center' },
  emoji: { marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#8B0000' },
  category: { fontSize: 11, color: '#D2691E', fontWeight: 'bold', textTransform: 'uppercase' },
  price: { fontSize: 15, fontWeight: 'bold', color: '#B8860B', marginTop: 2 },
  rating: { fontSize: 12, color: '#444', marginTop: 4 }
});

export default ProductCard;