import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Bank holidays',
          }}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            title: 'Edit holiday',
          }}
        />
      </Stack>
    </>
  );
}

