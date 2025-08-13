import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'
import { useEffect, useState } from 'react'
import { getAllTodos, newTodo, setClearTodos, setInputTodo } from '../redux/dataSlice'
import { serverTimestamp } from 'firebase/firestore'
import { Loading } from '../components'
import ListItem from '../components/ListItem'
import { setIsLoading } from "../redux/dataSlice"



const HomePage = ({ navigation }) => {
  const { isLoading, todos, error, inputTodo, isChange } = useSelector(state => state.todo)
  const { userData } = useSelector(state => state.user)


  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllTodos())
  }, [isChange])

  const handleSendData = () => {
    if (inputTodo) {
      dispatch(newTodo({
        "title": inputTodo,
        "isDone": false,
        "createdAt": serverTimestamp()
      }))
    } else {
      // Hata göster
    }
  }



  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.text}>Anasayfa - {userData?.email}</Text>

      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.textInput}
          inputMode="text"
          placeholder="todo giriniz"
          value={inputTodo}
          onChangeText={text => dispatch(setInputTodo(text))}
        />

        <Button
          onPress={handleSendData}
          title="Ekle"
          color="green"
          style={[{ padding: 30 }, styles.buton]}
        />
      </View>

      <Text style={styles.count}>{todos?.length} Kayıt</Text>

      <FlatList
        style={styles.FlatList}
        data={todos}
        renderItem={({ item, index }) => <ListItem item={item} number={index + 1} />}
        keyExtractor={item => item.id}
      />

      <View style={styles.containerButtons} >
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.buton}
        >
          <Text style={styles.textBtn}>Profile Sayfası</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            dispatch(logout())
            dispatch(setClearTodos())
          }}
          style={styles.buton}
        >
          <Text style={styles.textBtn}>Çıkış</Text>
        </Pressable>
      </View>

      {
        isLoading && <Loading setIsLoading={() => dispatch(setIsLoading(false))} />
      }

    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    top: 50,
    justifyContent: "",
    alignItems: "center",
    height: "100%",
  },
  textInput: {
    backgroundColor: "white",
    flex: 1,
    lineHeight: 15,
    fontSize: 14
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    backgroundColor: "darkgray",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
    color: "white",
  },
  textBtn: {
    color: "white",
    fontSize: 14,
    fontWeight: "800"
  },
  buton: {
    backgroundColor: "green",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
  },
  addTodoContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "lightgray",
    paddingHorizontal: 10,
    padding: 30,
    gap: 10
  },
  containerButtons: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    paddingTop: 10,
    paddingBottom: 20,
    marginBottom: 70,
    backgroundColor: "white",
    alignItems: "center",
  },
  FlatList: {
    backgroundColor: "orange",
    gap: 5,
    width: "100%",
    paddingVertical: 10,
    flex: 1,
  },
  count: {
    backgroundColor: "orange",
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    padding: 10,
    borderBottomWidth: 1
  }

})