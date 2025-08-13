import { StyleSheet, Text, View, Image } from 'react-native'
import Loading from '../components/Loading'
import { CustomTextInput, CustomButton } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearError, autoLogin, setIsLoading } from '../redux/userSlice'
import { useEffect, useState } from 'react'



const LoginPage = ({ navigation }) => {
  const { isLoading, error } = useSelector(state => state.user)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    dispatch(autoLogin())
  }, [])


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
        setValue={(text) => setEmail(text.toLowerCase())}
      />
      <CustomTextInput
        inputMode='text'
        placeholder='Parolanızı giriniz'
        label="Parola"
        secureTextEntry={true}
        value={password}
        setValue={(text) => setPassword(text)}
      />

      {
        error && <Text style={styles.error}>Kullanıcı adı veya parola hatalı!</Text>
      }

      <CustomButton
        title="Login"
        handleOnPress={() => {
          dispatch(login({ email, password }))
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
  },
  error: {
    color: "red",
    fontWeight: "bold",
  }
})