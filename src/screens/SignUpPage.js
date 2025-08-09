import { Pressable, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { CustomButton, CustomTextInput } from '../components'

const SignUpPage = ({ navigation }) => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


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
          value={username}
          setValue={setUsername}
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
          handleOnPress={() => navigation.navigate("Login")}
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