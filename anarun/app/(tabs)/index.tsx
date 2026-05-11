import { View, Text, StyleSheet } from 'react-native'
import { useApp } from '../_layout'

export default function Home() {
  const { corridas, diario } = useApp()

  const media = diario.length > 0
    ? Math.round(diario.reduce((acc, e) => acc + e.indice, 0) / diario.length)
    : 0

  const totalKm = corridas.reduce((acc, c) => acc + c.distancia, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>AnaRun 🏃</Text>
      <Text style={styles.subtitulo}>Sua performance, seu progresso.</Text>

      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Corridas</Text>
          <Text style={styles.cardValor}>{corridas.length}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total km</Text>
          <Text style={styles.cardValor}>{totalKm.toFixed(1)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Índice médio</Text>
          <Text style={[
            styles.cardValor,
            { color: media >= 80 ? '#4ade80' : media >= 50 ? '#fbbf24' : '#f87171' }
          ]}>
            {media}
          </Text>
        </View>
      </View>

      <View style={styles.dica}>
        <Text style={styles.dicaTitulo}>Como usar o app</Text>
        <Text style={styles.dicaTexto}>1. Faça o checklist no Pré-treino</Text>
        <Text style={styles.dicaTexto}>2. Use o cronômetro no Pós-treino</Text>
        <Text style={styles.dicaTexto}>3. Acompanhe sua evolução no Diário</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  titulo: { fontSize: 28, fontWeight: '700', color: '#f8fafc', marginTop: 8 },
  subtitulo: { fontSize: 14, color: '#64748b', marginBottom: 24 },
  cards: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  card: {
    flex: 1, backgroundColor: '#1e293b',
    borderRadius: 12, padding: 14, alignItems: 'center',
  },
  cardLabel: { fontSize: 11, color: '#64748b', marginBottom: 6 },
  cardValor: { fontSize: 26, fontWeight: '700', color: '#f8fafc' },
  dica: {
    backgroundColor: '#1e293b', borderRadius: 12,
    padding: 16, gap: 8,
  },
  dicaTitulo: { fontSize: 14, fontWeight: '700', color: '#f8fafc', marginBottom: 4 },
  dicaTexto: { fontSize: 13, color: '#64748b', lineHeight: 20 },
})