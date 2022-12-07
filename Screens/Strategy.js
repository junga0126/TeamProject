import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';

const Strategy =(props)=>{
    const [AStrategy, setAStrategy] = useState("");
    const [BStrategy, setBStrategy] = useState("");
    const [CStrategy, setCStrategy] = useState("");
    const [flag, setFlag] = useState(true);

    //전달받은 데이터 저장
    const [studentId, setStudentId] = useState(""); //불러온 studentId
    const [testId, setTestId] = useState(""); //불러온 testId
    const [printQuestion,setPrintQuestion] = useState("") //print할 question
    const [questionId, setQuestionId] = useState(""); //넘겨줄 question key저장
    const [firstPromptFlag,setFirstPromptFlag] = useState(false)
    const [secondPromptFlag,setSecondPromptFlag] = useState(false)
    const [thridthPromptFlag,setThridPromptFlag] = useState(false)

    //strategy상태가 모두 true이면 question이 false로 전환

    ///이전에 변경한 값이 false로 저장되어 있으려면 어떤 방법을 사용해야 할까??
   
   
    //strategy정보를 가져옴(Screen시작 시 바로 실행)
    const StrategyDB = async()=>{
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const questionId = props.route.params.questionId;
        const questionPrint = props.route.params.questionPrint;
        setStudentId(studentId);
        setTestId(testId);
        setQuestionId(questionId);
        setPrintQuestion(questionPrint);

        //
        let finish = props.route.params.FinishState;
        console.log(finish);
      
        //

        try{
            const q = await query( collection(db, "Question"), where('key',"==", questionId)) 
            const whatQuestion = await getDocs(q);
            whatQuestion.docs.map((row, idx) =>{
                setAStrategy(row.data().strategy[0]); //strategyA
                setBStrategy(row.data().strategy[1]); //strategyB
                setCStrategy(row.data().strategy[2]); //strategyC
                console.log(row.data().strategy[0]);
                console.log(row.data().strategy[1]);
                console.log(row.data().strategy[2]);
            })
        }catch(error) { console.log(error.message) }
    }

    //Screen시작하자마자 실행(문제 출력을 위해)
    if(flag == true){
        StrategyDB()
        setFlag(false);
    }

    return(
        <View style={styles.mainView}>
            <Text style={styles.mainText}>{printQuestion}</Text>
            <Text>Which strategy do you want to try?</Text> 
           
            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:firstPromptFlag?"white":"skyblue"}}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 0,
                        questionPrint: printQuestion,
                        choiceStrategy: AStrategy,
                    })
                    setFirstPromptFlag(true)
                }}
                disabled={firstPromptFlag}
                >
                <Text>{AStrategy}</Text> 
            </TouchableOpacity>

            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:"skyblue"}}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 1,
                        questionPrint: printQuestion,
                        choiceStrategy: BStrategy,
                    })
                    setSecondPromptFlag(true)
                }}
                disabled={secondPromptFlag}
                >
                <Text>{BStrategy}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:"skyblue"}}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 2,
                        printQuestion: printQuestion,
                        choiceStrategy: CStrategy,
                    })
                    setThridPromptFlag(true)
                }}
                disabled={thridthPromptFlag}
                >
                <Text>{CStrategy}</Text>
            </TouchableOpacity> 
        </View>
    )
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
export default Strategy;