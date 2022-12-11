import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
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
    const [questionNum, setQuestionNum] = useState("");
    const [firstPromptFlag,setFirstPromptFlag] = useState(false)
    const [secondPromptFlag,setSecondPromptFlag] = useState(false)
    const [thridthPromptFlag,setThridPromptFlag] = useState(false)
    const [questionCount, setQuestionCount] = useState();
    const [back, setBack] = useState();
    //strategy정보를 가져옴(Screen시작 시 바로 실행)
    const StrategyDB = async()=>{
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const questionId = props.route.params.questionId;
        const questionPrint = props.route.params.questionPrint;
        const questionNum = props.route.params.questionNum;
        const count = props.route.params.Count;
        
        const BackCount = props.route.params.BackCount;
        console.log(" Strategy Back",BackCount);
        setBack(BackCount);


        setQuestionCount(count);
        console.log("StartTest Strategy",count);


        setStudentId(studentId);
        setTestId(testId);
        setQuestionId(questionId);
        setPrintQuestion(questionPrint);
        if(questionNum == 3)  setQuestionNum(1);
        else if(questionNum == 2) setQuestionNum(2);
        else if(questionNum == 1) setQuestionNum(3);
        //setQuestionNum(questionNum);

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

    const nextQuestion = ()=>{
        if(firstPromptFlag==true && secondPromptFlag==true && thridthPromptFlag==true){

            props.navigation.navigate("StartTest", {
                studentId: studentId,
                testId: testId,
                questionId: questionId,
                nowQuestion: questionNum,
                Count: (questionCount-1)
            })
        } 
        else alert("Complete all strategies..");
    }
    //Screen시작하자마자 실행(문제 출력을 위해)
    // if(flag == true){
    //     StrategyDB()
    //     setFlag(false);
    // }
    useEffect(()=>{
         StrategyDB()
    },[props])

   

    return(
        <View style={styles.mainView}>
            <Text style={styles.mainText}>{printQuestion}</Text>
            <Text>Which strategy do you want to try?</Text> 
           
            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:firstPromptFlag?"#bbb":"skyblue"}}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 0,
                        questionPrint: printQuestion,
                        choiceStrategy: AStrategy,
                        Count: questionCount
                    })
                    setFirstPromptFlag(true)
                }}
                disabled={firstPromptFlag}
                >
                <Text>{AStrategy}</Text> 
            </TouchableOpacity>

            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:secondPromptFlag?"#bbb":"skyblue"}}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 1,
                        questionPrint: printQuestion,
                        choiceStrategy: BStrategy,
                        Count: questionCount
                    })
                    setSecondPromptFlag(true)
                }}
                disabled={secondPromptFlag}
                >
                <Text>{BStrategy}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:thridthPromptFlag?"#bbb":"skyblue"}}
                onPress={()=>{
                    props.navigation.navigate("Prompt", {
                        studentId: studentId,
                        testId: testId,
                        questionId: questionId,
                        strategyId: 2,
                        questionPrint: printQuestion,
                        choiceStrategy: CStrategy,
                        Count: questionCount
                    })
                    setThridPromptFlag(true)
                }}
                disabled={thridthPromptFlag}
                >
                <Text>{CStrategy}</Text>
            </TouchableOpacity> 
            <Button
                title = 'Next'
                onPress= {nextQuestion}
            />
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