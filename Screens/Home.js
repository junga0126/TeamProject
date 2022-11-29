import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs,where, query } from 'firebase/firestore';
const Home =(props)=>{
    const [testNum, setTestNum] = useState(); //테스트 num DB

    //Test의 state상태가 true인 test를 찾아 저장하기
    const TestDB = async ()=>{  
        const studentId = props.route.params.student; //login성공- 얻은 학생 아이디 
        try{
            const q = await query( collection(db, "Test"), where('state',"==", "true"))
            const ReadTest = await getDocs(q);
            ReadTest.docs.map((row, idx) =>{
                setTestNum(row.data()) //최종 test DB 저장 
                alert("success Test")
                props.navigation.navigate("StartTest" ,{
                    studentId: studentId,
                    testId: row.data().testId
                })
            })
        }catch(error){ console.log(error.message)}
    }

    return(
        <View style={styles.mainView}>
            <Button
                title = 'Test'
                onPress={TestDB}
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
    }
});
export default Home;