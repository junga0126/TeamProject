import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';


const Prompt =(props)=>{
    const [flag, setFlag] = useState(true);
    const [countPrompt, setCountPrompt] = useState(); // (prompt개수) - 몇번째 prompt인지 확인하기 위한 count
   

    //출력할 정보
    const [studentId, setStudentId] = useState(""); //불러온 studentId
    const [testId, setTestId] = useState(""); //불러온 testId
    const [printQuestion,setPrintQuestion] = useState("") //print할 question 지문 저장
    const [questionId, setQuestionId] = useState(""); //넘겨줄 question key저장
    const [printPrompt, setPrintPrompt] = useState(""); // 출력할 prompt
    
    //prompt list
    const q1s0 = [
        'OK. Using p to represent the number of pictures, write an equation that represents how p, $7.50 per picture, and the $3.25 shipping fee combine to make $85.75',
        'Ok, your equation is equivalent to 3.25 + 7.50p = 85.75 Can you solve to find the value of p?']
    const q1s1 = [
        'OK, let’s try that. Start from $3.25. How many times do you have to add $7.50 to get to $85.75?']
    const q1s2 = [
        'OK. Start with $85.50. Subtract the shipping fee, then count how many times you have to subtract $7.50 to get to 0.']
    

    const PromptDB = async()=>{
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const questionId = props.route.params.questionId;
        const strategyId = props.route.params.strategyId;
        const questionPrint = props.route.params.questionPrint;
        const choiceStrategy = props.route.params.choiceStrategy;
        console.log(studentId);
        console.log(testId);
        console.log(questionId);
        console.log(strategyId);
        console.log(questionPrint);
        console.log(choiceStrategy);

        try{
            //questionId가 일치하는 prompt 쿼리
            const q1 = await query( collection(db, "Prompt"), where('questionId',"==", questionId))
            const PromptQuestion = await getDocs(q1);

            let tempData = {}

            PromptQuestion.docs.map((doc)=>{
                if(doc.data().strategyId === strategyId){
                    tempData=doc.data()
                }
            })
            console.log(tempData)
            // //밑과 같이 작성해도 괜찮은가...?
            // //오류가 발생된다***** -> 중첩해서 조건을 넣어야하는데... 배열로 빼서 설정할까 고민
            // const q2 = await query( collection(PromptQuestion), where('strategyId',"==", strategyId))
            // const PromptList = await getDocs(q2);
            // console.log(PromptList)
        }catch(error) { console.log(error.message) }
       
    }

    if(flag == true){
        PromptDB()
        setFlag(false);
    }

    return(
        <View>
            <Text>Prompt</Text>
        </View>
    )
}
export default Prompt;