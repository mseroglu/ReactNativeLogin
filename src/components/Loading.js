import { StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'


const Loading = ({setIsLoading}) => {


    return (
        <View style={styles.container}>
            <Pressable
                style={styles.closeButton}
                onPress={setIsLoading}
            >
                <Text style={styles.closeButtonText}>X</Text>
            </Pressable>
            <ActivityIndicator size={"large"} color={"orange"} />
            <Text style={styles.text}>Loading...</Text>

        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold",
    },
    container: {
        position: "absolute",
        backgroundColor: "gray",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8,

    },
    closeButton: {
        position: "absolute",
        top: 50,
    },
    closeButtonText: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "black",
        color: "yellow",
        paddingVertical: 7,
        paddingHorizontal: 15,
        borderRadius: 50,
    }
})
