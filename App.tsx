import * as React from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { Card, Button } from 'react-native-paper';


export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <SetPassword />
        <AuthButton />
      </Card>
    </SafeAreaView>
  );
}


const SetPassword = () => {
  const [text, setText] = React.useState("initial");

  return (
    <View>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={newText => setText(newText)}
      />
      <Button
        mode="contained"
        onPress={() => Keychain.setGenericPassword("com.Carpe.Password", text)}
      > SUBMIT </ Button>
    </View>
  );
};



const getPass = async () => {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      window.alert(
        'Credentials successfully loaded for user :\n' + credentials.password
      );
    } else {
      window.alert('No credentials stored');
    }
  } catch (error) {
    console.error("Failed to access Keychain", error);
  }
};

const AuthButton = () => (
  <Button icon="key" style={styles.button} onPress={getPass}>
    Reveal
  </Button>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  card: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  button: {
    backgroundColor: '#eeeeee',
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  },
});
