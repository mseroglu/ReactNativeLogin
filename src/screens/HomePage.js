import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { setIsAuth } from '../redux/userSlice'


const HomePage = ({navigation}) => {
  const dispatch = useDispatch()



  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>

      <Pressable
        onPress={() => {
          dispatch(setIsAuth(false))

        }}
        style={styles.butonBack}
      >
        <Text style={styles.text}>Login Sayfasına Dön</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={styles.butonBack}
      >
        <Text style={styles.text}>Profile Sayfasına Git</Text>
      </Pressable>

    </View>
  )
}

export default HomePage

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
    backgroundColor: "green",
    borderRadius: 30,
    padding: 20,
    marginVertical: 20

  }
})