import { View, Text, StyleSheet } from 'react-native'
import { DiarioType } from '../types/corrida.Type'

type Props = { entrada: DiarioType }

export default function CardDiario({ entrada }: Props) {
  const cor = entrada.indice >= 80
    ? '#4ade80'
    : entrada.indice >= 50
    ? '#fbbf24'
    : '#f87171'

  return (
    <View style={styles.card}>
      <View style={styles.linha}>
        <Text style={styles.data}>{entrada.data}</Text>
        <Text style={[styles.indice, { color: cor }]}>
          {entrada.indice}/100
        </Text>
      </View>
      <View style={styles.linha}>
        <Text style={styles.info}>Sono: {entrada.sono}h</Text>
        <Text style={styles.info}>Água: {entrada.hidratacao}L</Text>
        <Text style={styles.info}>{entrada.temperatura}°C</Text>
      </View>
    </View>
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
  data: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f8fafc',
  },
  indice: {
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    fontSize: 12,
    color: '#64748b',
  },
})