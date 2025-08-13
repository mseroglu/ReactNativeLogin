import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodo } from '../redux/dataSlice'


const ListItem = ({ item, number }) => {
    const dispatch = useDispatch()

    const update = (isDone) => {
        dispatch(updateTodo({id:item.id, isDone}))
    }

    return (
        <View style={styles.container}>

            <Pressable
                onPress={() => update(false)}
                style={() => [{ display: item.isDone ? "flex" : "none" }, styles.butonBack]}
            >
                <Image
                    source={require("../../assets/images/checkedIcon.png")}
                    style={styles.icons}
                />
            </Pressable>

            <Pressable
                onPress={() => update(true)}
                style={() => [{ display: item.isDone ? "none" : "flex" }, styles.butonBack]}
            >
                <Image
                    source={require("../../assets/images/noncheckedIcon.png")}
                    style={styles.icons}
                />
            </Pressable>
            <Text style={styles.number}>{number}-</Text>
            <Text style={styles.title}>{item.title[0].toLocaleUpperCase() + item.title.slice(1)}</Text>
        </View>

    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "95%",
        gap: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "darkgreen",
        marginVertical: 5,
        alignItems: "center",
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",


    },
    title: {
        fontSize: 16,
        flex: 1,
        color: "white",
    },
    icons: {
        height: 30,
        width: 30,
        backgroundColor: "white"
    },
    number: {
        color: "white",

    }
})