import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

//test, home 버튼
const Test =(props)=>{
    return(
        <View style={styles.mainView}>
            <Text style={styles.mainText}>The test consists of five questions. Read the question and type your answer in the text box.</Text>
            <Button
                title = 'Start Test'
                onPress={()=>{
                    props.navigation.navigate("Login")
                }}
            />
            <Button
                title = 'Home'
                onPress={()=>{
                    props.navigation.navigate("Login")
                }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        height:"100%",
        marginTop:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainText: {
        fontSize:20,
        color:"black",
        padding:20,
        margin:20,
        backgroundColor:'pink'
    }
});
export default Test;