import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query, connectFirestoreEmulator, setIndexConfiguration } from 'firebase/firestore';

//Test첫 페이지
const StartTest =(props)=>{
    const [firstAnswer, setStAnswer] = useState(""); //학생 입력 답 저장
    const [questionCount, setQuestionCount] = useState(); //3문제
    const [flag, setFlag] = useState(true);

    const [studentId, setStudentId] = useState(""); //불러온 studentId
    const [testId, setTestId] = useState(""); //불러온 testId
    const [printQuestion,setPrintQuestion] = useState("") //print할 question 지문 저장
    const [questionId, setQuestionId] = useState(""); //넘겨줄 question key저장

    //문제 진행 사애
    const [firstQuestionFlag,setFirstQuestionFlag] = useState(false)
    const [secondQuestionFlag,setSecondQuestionFlag] = useState(false)
    const [thridQuestionFlag,setThridQuestionFlag] = useState(false)
    var QuestionArray = [,,]; //시험지 문제 저장(3문제)

    //first answer
    const answerChangeInput = (event) =>{
        console.log("Input Answer", event)
        setStAnswer(event)
    }

    //Question DB: testid와 일치하는 시험지 가져와 문제 출력
    const QuestionDB = async ()=>{
        const st_Id = props.route.params.studentId;
        const t_Id = props.route.params.testId;
        const Count = props.route.params.Count;
        setStudentId(st_Id);
        setTestId(t_Id);
        setQuestionCount(Count);
    
        console.log("StartTest CountNum", Count);
        if(Count == 2) setFirstQuestionFlag(true);
        else if(Count == 1){
            setFirstQuestionFlag(true);
            setSecondQuestionFlag(true);
        } 
        else if(Count == 0){
            setFirstQuestionFlag(true);
            setSecondQuestionFlag(true);
            setThridQuestionFlag(true);
        } 

         
        
    
    // QuestionDB() useMemo useEffect, flag = true false
        try{
            const q = await query( collection(db, "Test"), where('testId',"==", t_Id)) 
            const Test = await getDocs(q); //현재 test 시험DB
            Test.docs.map((row, idx) =>{
                //question저장
                QuestionArray[0] = row.data().Q1 
                QuestionArray[1] = row.data().Q2
                QuestionArray[2] = row.data().Q3
            })
            var i = 0;
            for(i=0; i<3; i++) console.log(QuestionArray[i])



             //count에 따라 다른 문제지문이 출력
            if(Count == 3){
                const q2 = await query( collection(db, "Question"), where('key',"==", QuestionArray[0]))
                const whatQuestion = await getDocs(q2); 
                whatQuestion.docs.map((row, idx) =>{
                    setPrintQuestion(row.data().question); //문제1 지문을 읽어옴
                })
                setQuestionId(QuestionArray[0]); //question key를 저장
                // setQuestionCount(2);
                //setFlag(false);
            } 
            else if(Count == 2){
                const q2 = await query( collection(db, "Question"), where('key',"==", QuestionArray[1]))
                const whatQuestion = await getDocs(q2);
                whatQuestion.docs.map((row, idx) =>{
                    setPrintQuestion(row.data().question); //문제2 지문을 읽어옴
                })
                setQuestionId(QuestionArray[1]) //question key를 저장
                // setQuestionCount(1);
                //setFlag(false);
            }else{
                const q2 = await query( collection(db, "Question"), where('key',"==", QuestionArray[2]))
                const whatQuestion = await getDocs(q2);
                whatQuestion.docs.map((row, idx) =>{
                    setPrintQuestion(row.data().question) //문제3 지문을 읽어옴
                })
                setQuestionId(QuestionArray[2]) //question key를 저장
                // setQuestionCount(3);
                //setFlag(false);
            }
        }catch(error){ console.log(error.message)}
    }
    
    const nextQuestion = ()=>{
        if(questionCount==2 && firstQuestionFlag==true
           || questionCount==1 && secondQuestionFlag==true
        ){
            props.navigation.navigate("StartTest", {
                studentId: studentId,
                testId: testId,
                questionId: questionId,
                Count: (questionCount)
            })
        }
        else if(firstQuestionFlag==true && secondQuestionFlag==true && thridQuestionFlag==true){
            alert("clear");
        }else alert("Complete all question..");
    }

    useEffect(()=>{
        QuestionDB()
    },[props])

    return(
        <View style={styles.mainView}>
            <Text style={styles.mainText}>{printQuestion}</Text>
            <Text>What do you think the problem is asking you to do?</Text>
            <TextInput
                value = {firstAnswer}
                onChangeText = {answerChangeInput}
                style={{backgroundColor:"gray"}}
                placeholder = 'Write your answer'
            />
            <Button
                title = 'Submit'
                onPress={()=>{
                    props.navigation.navigate("Strategy", {
                        studentId: studentId,
                        testId: testId,
                        questionPrint: printQuestion,
                        questionId: questionId,
                        Count: questionCount
                    })
                }}
            />
             <Button
                title = 'Next'
                onPress= {nextQuestion}
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
export default StartTest;