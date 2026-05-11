import { Tabs } from 'expo-router'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1e293b' },
      tabBarActiveTintColor: '#1d4ed8',
      tabBarInactiveTintColor: '#475569',
      headerStyle: { backgroundColor: '#0f172a' },
      headerTintColor: '#f8fafc',
    }}>
      <Tabs.Screen name="index"      options={{ title: 'Home' }} />
      <Tabs.Screen name="pretreino"  options={{ title: 'Pré-treino' }} />
      <Tabs.Screen name="postreino"  options={{ title: 'Pós-treino' }} />
      <Tabs.Screen name="diario"     options={{ title: 'Diário' }} />
    </Tabs>
  )
}