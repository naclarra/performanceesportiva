import { useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native'
import { useApp } from '../_layout'
import { CorridaType } from '../../types/corrida.Type'
import Botao from '../../components/Botao'
import CardCorrida from '../../components/CardCorrida'

export default function PosTreino() {
  const { corridas, salvarCorrida } = useApp()

  const [distancia, setDistancia] = useState('')
  const [minutos, setMinutos] = useState('')
  const [bpm, setBpm] = useState('')

  const calcularPace = (dist: number, min: number) => {
    if (dist === 0) return '--'
    const paceSeg = (min * 60) / dist
    const m = Math.floor(paceSeg / 60)
    const s = Math.round(paceSeg % 60)
    return `${m}'${String(s).padStart(2, '0')}"/km`
  }

  const salvar = () => {
    const dist = parseFloat(distancia)
    const min = parseFloat(minutos)
    const batimento = parseInt(bpm)
    if (!dist || !min || !batimento) return

    const novaCorrida: CorridaType = {
      id: Date.now(),
      distancia: dist,
      tempo: Math.round(min * 60),
      bpm: batimento,
      pace: calcularPace(dist, min),
      data: new Date().toLocaleDateString('pt-BR'),
    }
    salvarCorrida(novaCorrida)
    setDistancia('')
    setMinutos('')
    setBpm('')
  }

  return (
    <FlatList
      style={styles.container}
      data={corridas}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <CardCorrida corrida={item} />}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Registrar corrida</Text>

          <Text style={styles.label}>Distância (km)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 5.2"
            placeholderTextColor="#475569"
            keyboardType="numeric"
            value={distancia}
            onChangeText={setDistancia}
          />

          <Text style={styles.label}>Tempo (minutos)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 28"
            placeholderTextColor="#475569"
            keyboardType="numeric"
            value={minutos}
            onChangeText={setMinutos}
          />

          <Text style={styles.label}>BPM médio</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 158"
            placeholderTextColor="#475569"
            keyboardType="numeric"
            value={bpm}
            onChangeText={setBpm}
          />

          <View style={styles.botaoContainer}>
            <Botao label="Salvar corrida" cor="#1d4ed8" onPress={salvar} />
          </View>

          <Text style={styles.tituloLista}>Corridas salvas</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhuma corrida ainda. Bora correr!</Text>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  titulo: { fontSize: 20, fontWeight: '700', color: '#f8fafc', margin: 16, marginBottom: 8 },
  label: {
    fontSize: 11, color: '#64748b', fontWeight: '700',
    letterSpacing: 1, marginTop: 16, marginBottom: 8, marginHorizontal: 16,
  },
  input: {
    borderWidth: 0.5, borderColor: '#334155', borderRadius: 8,
    padding: 12, fontSize: 15, color: '#f8fafc',
    backgroundColor: '#1e293b', marginHorizontal: 16,
  },
  botaoContainer: { margin: 16, marginTop: 24 },
  tituloLista: {
    fontSize: 11, color: '#64748b', fontWeight: '700',
    letterSpacing: 1, marginHorizontal: 16, marginTop: 8, marginBottom: 4,
  },
  vazio: {
    fontSize: 14, color: '#475569',
    textAlign: 'center', marginTop: 40,
  },
})