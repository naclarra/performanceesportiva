import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useApp } from '../_layout'
import Botao from '../../components/Botao'

export default function DetalheCorrida() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { corridas, diario } = useApp()

  const corrida = corridas.find(c => c.id === Number(id))

  if (!corrida) return (
    <View style={styles.container}>
      <Text style={styles.erro}>Corrida não encontrada.</Text>
    </View>
  )

  const minutos = Math.floor(corrida.tempo / 60)
  const segundos = corrida.tempo % 60

  // pega o registro do diário do mesmo dia se existir
  const registroDia = diario.find(d => d.data === corrida.data)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{corrida.distancia} km</Text>
      <Text style={styles.data}>{corrida.data}</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Tempo</Text>
          <Text style={styles.statValor}>
            {String(minutos).padStart(2, '0')}:{String(segundos).padStart(2, '0')}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Pace</Text>
          <Text style={styles.statValor}>{corrida.pace}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>BPM médio</Text>
          <Text style={styles.statValor}>{corrida.bpm}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Distância</Text>
          <Text style={styles.statValor}>{corrida.distancia} km</Text>
        </View>
      </View>

      {registroDia && (
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>Condições do dia</Text>
          <View style={styles.condicoesGrid}>
            <View style={styles.condicaoItem}>
              <Text style={styles.condicaoLabel}>Sono</Text>
              <Text style={styles.condicaoValor}>{registroDia.sono}h</Text>
            </View>
            <View style={styles.condicaoItem}>
              <Text style={styles.condicaoLabel}>Hidratação</Text>
              <Text style={styles.condicaoValor}>{registroDia.hidratacao}L</Text>
            </View>
            <View style={styles.condicaoItem}>
              <Text style={styles.condicaoLabel}>Temperatura</Text>
              <Text style={styles.condicaoValor}>{registroDia.temperatura}°C</Text>
            </View>
            <View style={styles.condicaoItem}>
              <Text style={styles.condicaoLabel}>Índice</Text>
              <Text style={[
                styles.condicaoValor,
                { color: registroDia.indice >= 80 ? '#4ade80' : registroDia.indice >= 50 ? '#fbbf24' : '#f87171' }
              ]}>
                {registroDia.indice}/100
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.botaoContainer}>
        <Botao label="Voltar" cor="#334155" onPress={() => router.back()} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  erro: { fontSize: 16, color: '#f87171', marginTop: 40, textAlign: 'center' },
  titulo: { fontSize: 36, fontWeight: '700', color: '#f8fafc', marginTop: 8 },
  data: { fontSize: 14, color: '#64748b', marginBottom: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  statCard: {
    width: '47%', backgroundColor: '#1e293b',
    borderRadius: 12, padding: 14,
  },
  statLabel: { fontSize: 11, color: '#64748b', marginBottom: 6 },
  statValor: { fontSize: 22, fontWeight: '700', color: '#f8fafc' },
  secao: { marginBottom: 24 },
  secaoTitulo: {
    fontSize: 11, color: '#64748b', fontWeight: '700',
    letterSpacing: 1, marginBottom: 12,
  },
  condicoesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  condicaoItem: {
    width: '47%', backgroundColor: '#1e293b',
    borderRadius: 12, padding: 14,
  },
  condicaoLabel: { fontSize: 11, color: '#64748b', marginBottom: 6 },
  condicaoValor: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  botaoContainer: { marginBottom: 40 },
})