
import { Image, Pressable, StyleSheet, Text, View, PanResponder, TouchableOpacity, Animated } from 'react-native'
import { useDispatch } from 'react-redux'
import { updateTodo, delTodo } from '../redux/dataSlice'


const ListItem = ({ item, number }) => {
    const dispatch = useDispatch()

    const update = (isDone) => {
        dispatch(updateTodo({ id: item.id, isDone }))
    }

    const onDelete = (id) => {
        dispatch(delTodo(id))
    }

    const translateX = new Animated.Value(0)

    const responder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState < 0) {
                translateX.setValue(gestureState.dx*10)
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx < -50) {
                Animated.spring(translateX, {
                    toValue: -70,
                    useNativeDriver: true
                }).start()
            }else{
               Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true
                }).start()
            }
        }
    })

    return (
        <View style={styles.ItemContainer}>
            <Animated.View style={[{
                flex: 1,
                transform: [{ translateX: translateX }]
            }, styles.ItemContainer]}>
                <View style={styles.container} {...responder.panHandlers}>

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

                <TouchableOpacity
                    onPress={() => onDelete(item.id)}
                    style={styles.btnWrapper}
                >
                    <Text style={styles.delBtn}>Sil</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>

    )
}

export default ListItem

const styles = StyleSheet.create({
    ItemContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },
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
    },
    btnWrapper: {
        position: "absolute",
        right: -50,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: "tomato",
    },
    delBtn: {
        color: "white",
        textAlign: "center",
        paddingHorizontal: 15,
        paddingVertical: 16,
        width: 50,

    },


})