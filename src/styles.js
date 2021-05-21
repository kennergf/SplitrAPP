import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        paddingBottom: 70,
    },
    view: {
        flex: 1,
    },
    content: {
        flex: 5,
    },
    textInput: {
        borderWidth: 1,
        alignContent: 'center',
        padding:3,
        borderRadius:5,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        marginVertical:10
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "99%",
        alignSelf: "center",
        borderRadius: 5,
    },
    item:{
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        width: "100%",
        alignSelf: "center",
        borderRadius: 5,
    },
    button:{
        //borderRadius:5,
    },
    smallButton:{
        height:50,width:50
    }
});