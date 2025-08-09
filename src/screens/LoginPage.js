import { StyleSheet, Text, View, Image } from 'react-native'
import Loading from '../components/Loading'
import { CustomTextInput, CustomButton } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setIsLoading, setPassword, setLogin, setIsAuth } from '../redux/userSlice'



const LoginPage = ({navigation}) => {
  const { email, password, isLoading, isAuth } = useSelector(state => state.user)
  const dispatch = useDispatch()


  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/images/login.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Hoş Geldiniz</Text>

      <CustomTextInput
        inputMode='email'
        placeholder='E-Mail Adresi'
        label="Kullanıcı Adı"
        value={email}
        setValue={(text) => dispatch(setEmail(text))}
      />
      <CustomTextInput
        inputMode='text'
        placeholder='Parolanızı giriniz'
        label="Parola"
        secureTextEntry={true}
        value={password}
        setValue={(text) => dispatch(setPassword(text))}
      />

      <CustomButton
        title="Login"
        handleOnPress={() => {
          dispatch(setLogin())
        }}
      />

      <CustomButton
        title="Sign Up"
        handleOnPress={() => {
          navigation.navigate("Signup")

        }}
      />

      {
        isLoading && <Loading setIsLoading={() => dispatch(setIsLoading(false))} />
      }
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 30
  },

  image: {
    height: 150,
    width: 150,
    marginBottom: 20
  }
})