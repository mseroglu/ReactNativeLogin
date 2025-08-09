import { Pressable, StyleSheet, Text, } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handleOnPress }) => {

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "red" : "orange"
                },
                styles.buton]}
            onPress={handleOnPress}
        >
            <Text style={styles.textButon}>{title}</Text>
        </Pressable>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    buton: {
        border: 1,
        width: "80%",
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        borderRadius: 10,

    },

    textButon: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },
})