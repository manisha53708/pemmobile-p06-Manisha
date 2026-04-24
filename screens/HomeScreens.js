import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [isGrid, setIsGrid] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const categories = ['Semua', 'Pakaian', 'Sepatu', 'Aksesoris', 'Musik', 'Kecantikan'];

  const filteredData = PRODUCTS.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'Semua' || item.category === category)
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setSearch(''); setCategory('Semua'); setRefreshing(false); }, 1000);
  };

  // R4: ListEmptyComponent
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={{ fontSize: 60 }}>🎭</Text>
      <Text style={styles.emptyTitle}>Nahi Mil Raha!</Text>
      <Text style={styles.emptyHint}>Produk tidak ditemukan. Coba kategori lain.</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>✨ BollyShop</Text>
          <Text style={styles.appCount}>{filteredData.length} Produk</Text>
        </View>
        <TouchableOpacity onPress={() => setIsGrid(!isGrid)} style={styles.toggleBtn}>
          <Text style={styles.toggleText}>{isGrid ? '📜 List' : '🖼️ Grid'}</Text>
        </TouchableOpacity>
      </View>

      <SearchBar value={search} onChange={setSearch} onClear={() => setSearch('')} />

      <View style={{ height: 60, marginTop: 10 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
          {categories.map(cat => (
            <TouchableOpacity key={cat} onPress={() => setCategory(cat)} style={[styles.chip, category === cat && styles.chipActive]}>
              <Text style={[styles.chipText, category === cat && { color: '#fff' }]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        key={isGrid ? 'G' : 'L'}
        data={filteredData}
        numColumns={isGrid ? 2 : 1}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard item={item} isGrid={isGrid} />}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listPadding}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FFD700']} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: { padding: 25, paddingTop: 60, backgroundColor: '#8B0000', flexDirection: 'row', justifyContent: 'space-between', borderBottomRightRadius: 25, borderBottomLeftRadius: 25, paddingBottom: 40 },
  appName: { fontSize: 28, fontWeight: 'bold', color: '#FFD700' },
  appCount: { color: '#FFB6C1', fontSize: 12 },
  toggleBtn: { backgroundColor: '#FFD700', padding: 8, borderRadius: 10, justifyContent: 'center' },
  toggleText: { color: '#8B0000', fontWeight: 'bold' },
  chipScroll: { paddingHorizontal: 20, alignItems: 'center' },
  chip: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#FFD700' },
  chipActive: { backgroundColor: '#D2691E', borderColor: '#D2691E' },
  chipText: { color: '#8B0000', fontWeight: 'bold' },
  listPadding: { paddingHorizontal: 15, paddingBottom: 20 },
  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#8B0000', marginTop: 10 },
  emptyHint: { color: '#666' }
});

export default HomeScreen;