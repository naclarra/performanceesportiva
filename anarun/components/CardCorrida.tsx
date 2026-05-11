import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { CorridaType } from '../types/corrida.Type'

type Props = { corrida: CorridaType }

export default function CardCorrida({ corrida }: Props) {
  const minutos = Math.floor(corrida.tempo / 60)
  const segundos = corrida.tempo % 60

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/corrida/${corrida.id}`)}
    >
      <View style={styles.linha}>
        <Text style={styles.distancia}>{corrida.distancia} km</Text>
        <Text style={styles.pace}>{corrida.pace}</Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.info}>
          {minutos}:{String(segundos).padStart(2, '0')} min
        </Text>
        <Text style={styles.info}>{corrida.bpm} bpm</Text>
        <Text style={styles.info}>{corrida.data}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  distancia: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
  },
  pace: {
    fontSize: 13,
    color: '#4ade80',
    backgroundColor: '#14532d',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  info: {
    fontSize: 12,
    color: '#64748b',
  },
})