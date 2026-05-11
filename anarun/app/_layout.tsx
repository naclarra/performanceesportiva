import { createContext, useContext, useState } from 'react'
import { Stack } from 'expo-router'
import { CorridaType, DiarioType } from '../types/corrida.Type'

// — contexto para compartilhar dados entre telas —
type AppContextType = {
  corridas: CorridaType[]
  diario: DiarioType[]
  salvarCorrida: (c: CorridaType) => void
  salvarDiario: (d: DiarioType) => void
}

export const AppContext = createContext<AppContextType>({} as AppContextType)
export const useApp = () => useContext(AppContext)

export default function RootLayout() {
  const [corridas, setCorridas] = useState<CorridaType[]>([])
  const [diario, setDiario] = useState<DiarioType[]>([])

  const salvarCorrida = (c: CorridaType) => setCorridas(p => [c, ...p])
  const salvarDiario  = (d: DiarioType)  => setDiario(p => [d, ...p])

  return (
    <AppContext.Provider value={{ corridas, diario, salvarCorrida, salvarDiario }}>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#0f172a' }, headerTintColor: '#f8fafc' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="corrida/[id]" options={{ title: 'Detalhe da Corrida' }} />
      </Stack>
    </AppContext.Provider>
  )
}