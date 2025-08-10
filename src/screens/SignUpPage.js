import { Pressable, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import { useState, } from 'react'
import { CustomButton, CustomTextInput, Loading } from '../components'
import { useDispatch, useSelector } from "react-redux"
import { register } from '../redux/userSlice'


const SignUpPage = ({ navigation }) => {
  const { isLoading } = useSelector(state => state.user)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const createNewUser = () => {
    dispatch(register({ email, password }))

  }

  

  return (
    // SafeAreaView çentik kısmını devre dışı bırakır
    <SafeAreaView style={styles.container}>

      <View style={[styles.common, styles.title]}>
        <Image
          style={styles.image}
          source={require("../../assets/images/signup.png")}
        />
        <Text style={styles.text}>Yeni Kayıt</Text>
      </View>

      <View style={[styles.common, styles.body]}>
        <CustomTextInput
          inputMode="text"
          label="İsim"
          placeholder="İsminizi giriniz"
          value={name}
          setValue={setName}
        />

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
          setValue={setPassword}
        />
      </View>

      <View style={[styles.common, styles.options]}>

        <CustomButton
          title="Kaydet"
          handleOnPress={createNewUser}
        />

        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={styles.butonBack}
        >
          <Text >
            Zaten hesabınız var mı? <Text style={styles.textBtn}> Giriş</Text>
          </Text>

        </Pressable>
      </View>


      {
        isLoading && <Loading  />
      }
    </SafeAreaView>
  )
}

export default SignUpPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  common: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    flex: 3,
    justifyContent: "flex-end"
  },
  body: {
    flex: 4,
    justifyContent: "center"
  },
  options: {
    flex: 5,
    justifyContent: "space-between",
    paddingBottom: 50

  },

  text: {
    fontSize: 20,
    fontWeight: "bold"
  },
  textBtn: {
    fontWeight: "bold",
  },

  butonBack: {
    padding: 20,

  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 20,

  }

})