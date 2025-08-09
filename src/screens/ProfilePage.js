import { StyleSheet, Text, View,Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setIsAuth } from '../redux/userSlice'

const ProfilePage = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page</Text>

            <Pressable
              onPress={() => dispatch(setIsAuth(false))}
              style={styles.butonBack}
            >
              <Text style={styles.text}>Login Sayfasına Dön</Text>
            </Pressable>
      
            <Pressable
              onPress={() => navigation.navigate("Home")}
              style={styles.butonBack}
            >
              <Text style={styles.text}>Home Sayfasına Git</Text>
            </Pressable>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
    container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
  },
  butonBack: {
    backgroundColor: "blue",
    borderRadius: 30,
    padding: 20,
    marginVertical:20

  }
})