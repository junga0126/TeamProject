import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';

const ReviewNote =(props)=>{

    const ReviewDB = async ()=>{
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const q = await query( collection(db, "AnswerStudent"), where('testId',"==", testId))
            const ReadTest = await getDocs(q);
            let ChoiceTest;

            //활성화된 test확인
            ReadTest.docs.map((row, idx) =>{
                setTestNum(row.data().testId) //최종 test DB 저장 
                ChoiceTest = row.data().testId;
            })
    }

    return(
    <View style={styles.mainView}>
        <Text>Review</Text>
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
export default ReviewNote;