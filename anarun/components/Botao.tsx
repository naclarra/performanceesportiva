import { TouchableOpacity, Text, StyleSheet } from 'react-native'

type Props = {
  label: string
  cor: string
  onPress: () => void
}

export default function Botao({ label, cor, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: cor }]}
      onPress={onPress}
    >
      <Text style={styles.texto}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  botao: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  texto: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
})
