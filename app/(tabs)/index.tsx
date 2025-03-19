import { Text, View, StyleSheet } from "react-native";
import {Link} from 'expo-router'

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit mga buddies/index.tsx to edit this screen.</Text>
      <Link href='/camera' style={styles.button}>Open Camera</Link>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent:'center'
  },
  text:{
    color :'#f8f8f8'
  },
  button:{
    backgroundColor: '#f8f8f8',
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
  }
});