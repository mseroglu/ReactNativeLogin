import { StyleSheet, Text, View, TextInput } from 'react-native'


const CustomTextInput = ({ inputMode, placeholder, label, secureTextEntry, value, setValue }) => {
    

    return (
        <View style={styles.container}>
            <Text style={styles.label} >{label}</Text>
            <TextInput
                style={styles.textInput}
                inputMode={inputMode}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        width: "80%",
        marginVertical: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 2

    },
    textInput: {
        textAlign: "center",
        fontSize: 14,
        backgroundColor: "white",
        borderBottomWidth: 1,

    },

})