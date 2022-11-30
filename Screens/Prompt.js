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
    


    const [choicePrompt, setChoicePrompt] = useState();
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
            const PromptQuestion = await getDocs(q1); //question에 해당하는 모든 prompt 리스트 


            PromptQuestion.docs.map((doc)=>{
                 
                //strategy 일치 확인
                if(doc.data().strategyId === strategyId) {
                    console.log("doc:", doc.data())
                
                    //question/strategy 일치 DB
                    // doc.data().docs.map((doc)=>{ 
                    //     //setCountPrompt(row.data().count)
                    //     console.log(row.data().count)
                    // }) 
                    console.log(doc.data().count)
                }
                
                //Cannot read properties of undefined (reading 'map')   

                
                // if(doc.data().strategyId === strategyId) {
                //     doc.data().docs.map((doc)=>{ 
                //         setCoicePrompt(row.data().count)
                //     }) 
                // }
                   
            })
            choicePrompt.docs.map((doc)=>{ 
                        setCountPrompt(row.data().count)
            }) 

            
        }catch(error) { console.log(error.message) }
       
    }

    if(flag == true){
        PromptDB()
        setFlag(false);
    }

    return(
        <View>
            <Text>Prompt</Text>
            <Text>{countPrompt}</Text>
        </View>
    )
}
export default Prompt;