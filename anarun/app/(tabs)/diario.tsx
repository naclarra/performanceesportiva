import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useApp } from '../_layout'
import CardDiario from '../../components/CardDiario'

export default function Diario() {
  const { diario } = useApp()

  const media = diario.length > 0
    ? Math.round(diario.reduce((acc, e) => acc + e.indice, 0) / diario.length)
    : 0

  const melhor = diario.length > 0
    ? Math.max(...diario.map(e => e.indice))
    : 0

  return (
    <FlatList
      style={styles.container}
      data={diario}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CardDiario entrada={item} />}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Seu progresso</Text>

          <View style={styles.cards}>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Média</Text>
              <Text style={[
                styles.cardValor,
                { color: media >= 80 ? '#4ade80' : media >= 50 ? '#fbbf24' : '#f87171' }
              ]}>
                {media}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Melhor</Text>
              <Text style={styles.cardValor}>{melhor}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Registros</Text>
              <Text style={styles.cardValor}>{diario.length}</Text>
            </View>
          </View>

          <Text style={styles.label}>Histórico</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.vazio}>
          Nenhum registro ainda.{'\n'}Faça seu primeiro checklist no Pré-treino!
        </Text>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  titulo: { fontSize: 20, fontWeight: '700', color: '#f8fafc', marginTop: 8, marginBottom: 16 },
  cards: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  card: {
    flex: 1, backgroundColor: '#1e293b',
    borderRadius: 12, padding: 14, alignItems: 'center',
  },
  cardLabel: { fontSize: 11, color: '#64748b', marginBottom: 6 },
  cardValor: { fontSize: 26, fontWeight: '700', color: '#f8fafc' },
  label: {
    fontSize: 11, color: '#64748b', fontWeight: '700',
    letterSpacing: 1, marginBottom: 4,
  },
  vazio: {
    fontSize: 14, color: '#475569',
    textAlign: 'center', marginTop: 40, lineHeight: 24,
  },
})