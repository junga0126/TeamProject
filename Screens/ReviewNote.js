import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';

const ReviewNote =(props)=>{
    const [text, setText] = useState();

    const ReviewDB = async ()=>{
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const q = await query( collection(db, "AnswerStudent"), where('testId',"==", testId))
        const answer = await getDocs(q);
        let mark;
        let score;
        //채점 상태 확인
        answer.docs.map((row, idx) =>{
            mark = row.data().markState;
            score = row.data().score;
        })

        if(mark==false){ //채점중
            setText("The teacher is marking. Please wait...")
        }else{ 
            setText("["+testId+"]Your Score: "+score)
        }
    }

    useEffect(()=>{
        ReviewDB()
    },[])


    return(
    <View style={styles.mainView}>
        <Text>{text}</Text>
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