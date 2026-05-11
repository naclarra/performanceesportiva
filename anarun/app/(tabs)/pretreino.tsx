import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useApp } from '../_layout'
import { DiarioType } from '../../types/corrida.Type'
import Botao from '../../components/Botao'

export default function PreTreino() {
  const { salvarDiario } = useApp()

  const [sono, setSono] = useState(7)
  const [hidratacao, setHidratacao] = useState(1)
  const [diasDescanso, setDiasDescanso] = useState(1)
  const [alimentacao, setAlimentacao] = useState('sim')
  const [dorMuscular, setDorMuscular] = useState('nao')
  const [mostrarAnalise, setMostrarAnalise] = useState(false)

  const calcularIndice = () => {
    let pontos = 0
    if (sono >= 7) pontos += 20
    else if (sono >= 5) pontos += 10
    if (diasDescanso >= 2) pontos += 20
    else if (diasDescanso === 1) pontos += 10
    if (hidratacao >= 1.5) pontos += 20
    else if (hidratacao >= 1) pontos += 10
    if (alimentacao === 'sim') pontos += 20
    else if (alimentacao === 'pouco') pontos += 10
    if (dorMuscular === 'nao') pontos += 20
    else if (dorMuscular === 'leve') pontos += 10
    return Math.max(0, Math.min(100, pontos))
  }

  const gerarRecomendacoes = () => {
    const lista = []
    if (sono < 6) lista.push({ texto: 'Sono insuficiente. Risco de lesão elevado.', tipo: 'perigo' })
    else if (sono < 7) lista.push({ texto: 'Sono curto. Prefira um treino leve.', tipo: 'atencao' })
    else lista.push({ texto: 'Sono adequado. Corpo pronto.', tipo: 'ok' })
    if (diasDescanso === 0) lista.push({ texto: 'Sem descanso. Evite treino hoje.', tipo: 'perigo' })
    else if (diasDescanso === 1) lista.push({ texto: '1 dia de descanso. Evite ritmo forte.', tipo: 'atencao' })
    else lista.push({ texto: 'Bem descansado. Pode dar tudo.', tipo: 'ok' })
    if (hidratacao < 1) lista.push({ texto: 'Hidratação baixa. Beba água antes de sair.', tipo: 'perigo' })
    else if (hidratacao < 1.5) lista.push({ texto: 'Hidrate mais antes do treino.', tipo: 'atencao' })
    else lista.push({ texto: 'Hidratação ok.', tipo: 'ok' })
    if (dorMuscular === 'forte') lista.push({ texto: 'Dor muscular forte. Risco alto de lesão.', tipo: 'perigo' })
    else if (dorMuscular === 'leve') lista.push({ texto: 'Dor leve. Aqueça bem antes de correr.', tipo: 'atencao' })
    if (alimentacao === 'nao') lista.push({ texto: 'Sem alimentação. Energia insuficiente.', tipo: 'perigo' })
    return lista
  }

  const cores = {
    ok:      { fundo: '#14532d', borda: '#22c55e', texto: '#86efac' },
    atencao: { fundo: '#422006', borda: '#f59e0b', texto: '#fcd34d' },
    perigo:  { fundo: '#450a0a', borda: '#dc2626', texto: '#fca5a5' },
  }

  const analisar = () => {
    const indice = calcularIndice()
    const entrada: DiarioType = {
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      sono, hidratacao, diasDescanso,
      alimentacao, dorMuscular,
      temperatura: 0,
      indice,
    }
    salvarDiario(entrada)
    setMostrarAnalise(true)
  }

  const indice = calcularIndice()

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Como você está hoje?</Text>

      <Text style={styles.label}>Horas de sono</Text>
      <View style={styles.contador}>
        <Botao label="-" cor="#334155" onPress={() => setSono(p => Math.max(0, p - 1))} />
        <Text style={styles.valorContador}>{sono}h</Text>
        <Botao label="+" cor="#334155" onPress={() => setSono(p => Math.min(12, p + 1))} />
      </View>

      <Text style={styles.label}>Dias de descanso</Text>
      <View style={styles.contador}>
        <Botao label="-" cor="#334155" onPress={() => setDiasDescanso(p => Math.max(0, p - 1))} />
        <Text style={styles.valorContador}>{diasDescanso}</Text>
        <Botao label="+" cor="#334155" onPress={() => setDiasDescanso(p => p + 1)} />
      </View>

      <Text style={styles.label}>Hidratação (litros)</Text>
      <View style={styles.contador}>
        <Botao label="-" cor="#334155" onPress={() => setHidratacao(p => Math.max(0, parseFloat((p - 0.5).toFixed(1))))} />
        <Text style={styles.valorContador}>{hidratacao}L</Text>
        <Botao label="+" cor="#334155" onPress={() => setHidratacao(p => parseFloat((p + 0.5).toFixed(1)))} />
      </View>

      <Text style={styles.label}>Comeu bem hoje?</Text>
      <View style={styles.opcoes}>
        {['sim', 'pouco', 'nao'].map(op => (
          <TouchableOpacity
            key={op}
            style={[styles.opcao, alimentacao === op && styles.opcaoAtiva]}
            onPress={() => setAlimentacao(op)}
          >
            <Text style={styles.opcaoTexto}>
              {op === 'sim' ? 'Sim' : op === 'pouco' ? 'Pouco' : 'Não'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Dor muscular?</Text>
      <View style={styles.opcoes}>
        {['nao', 'leve', 'forte'].map(op => (
          <TouchableOpacity
            key={op}
            style={[styles.opcao, dorMuscular === op && styles.opcaoAtiva]}
            onPress={() => setDorMuscular(op)}
          >
            <Text style={styles.opcaoTexto}>
              {op === 'nao' ? 'Não' : op === 'leve' ? 'Leve' : 'Forte'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.botaoContainer}>
        <Botao label="Analisar" cor="#1d4ed8" onPress={analisar} />
      </View>

      {mostrarAnalise && (
        <View style={styles.analise}>
          <View style={styles.indiceContainer}>
            <Text style={styles.indiceLabel}>Índice de prontidão</Text>
            <Text style={[
              styles.indiceValor,
              { color: indice >= 80 ? '#4ade80' : indice >= 50 ? '#fbbf24' : '#f87171' }
            ]}>
              {indice}/100
            </Text>
          </View>
          {gerarRecomendacoes().map((rec, i) => (
            <View key={i} style={[
              styles.recCard,
              {
                backgroundColor: cores[rec.tipo as keyof typeof cores].fundo,
                borderLeftColor: cores[rec.tipo as keyof typeof cores].borda,
              }
            ]}>
              <Text style={{ color: cores[rec.tipo as keyof typeof cores].texto, fontSize: 13 }}>
                {rec.texto}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  titulo: { fontSize: 20, fontWeight: '700', color: '#f8fafc', marginBottom: 16, marginTop: 8 },
  label: { fontSize: 11, color: '#64748b', fontWeight: '700', letterSpacing: 1, marginTop: 16, marginBottom: 8 },
  contador: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  valorContador: { fontSize: 28, fontWeight: '700', color: '#f8fafc', minWidth: 60, textAlign: 'center' },
  opcoes: { flexDirection: 'row', gap: 8 },
  opcao: { flex: 1, borderWidth: 0.5, borderColor: '#334155', borderRadius: 8, padding: 10, alignItems: 'center' },
  opcaoAtiva: { backgroundColor: '#1d4ed8', borderColor: '#1d4ed8' },
  opcaoTexto: { fontSize: 13, color: '#f8fafc' },
  botaoContainer: { marginTop: 24 },
  analise: { marginTop: 20, gap: 8, paddingBottom: 40 },
  indiceContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  indiceLabel: { fontSize: 13, color: '#64748b', fontWeight: '700' },
  indiceValor: { fontSize: 28, fontWeight: '700' },
  recCard: { borderLeftWidth: 3, borderRadius: 8, padding: 12 },
})