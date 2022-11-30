import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
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
    const [nowPrompt, setNowPrompt] = useState(0);
    ///

    const [promptData,setPromptData] = useState([])
    const [promptIdx,setPromptIdx] = useState(0)

    //넘겨줄 정보
    const [strategyId, setStrategyId] = useState();
    const [choiceStrategy, setChoiceStrategy] = useState();

    const PromptDB = async()=>{
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const questionId = props.route.params.questionId;
        const strategyId = props.route.params.strategyId;
        const questionPrint = props.route.params.questionPrint;
        const choiceStrategy = props.route.params.choiceStrategy;
        const nowPrompt = props.route.params.nowPrompt;
        const countPrompt = props.route.params.countPrompt;
        const first = props.route.params.first;
        let switchNum = nowPrompt;
        let countNum = countPrompt;

        console.log(switchNum ,"countNum:",countNum)

        if(first === false){
            switchNum = nowPrompt
            countNum = countPrompt
            setCountPrompt(countPrompt);
        }
        setStrategyId(strategyId);
        setChoiceStrategy(choiceStrategy);
        
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
                    if(first === true){
                        console.log(doc.data().count);
                        countNum = doc.data().count //prompt개수를 저장 
                        switchNum=1
                    }
                    console.log(doc.data().count);
                   

                    if(countPrompt == 0){
                        //모든 prompt 완료, strategy로 이동
                        //어떤 정보를 넘겨야 할까??
                    } else{
                        switch(switchNum){
                            case 1: 
                                setPrintPrompt(doc.data().p1);
                                setNowPrompt(2);
                                break;
                            case 2: 
                                setPrintPrompt(doc.data().p2);
                                setNowPrompt(3);
                                break;
                            case 3: 
                                setPrintPrompt(doc.data().p3);
                                setNowPrompt(4);
                                break;
                            case 4: 
                                setPrintPrompt(doc.data().p4);
                                setNowPrompt(5);
                                break;
                            case 5: 
                                setPrintPrompt(doc.data().p5);
                                setNowPrompt(6);
                                break;
                            default: console.log("error:",error.message);
                        }
                        setCountPrompt(countPrompt-1);
                    }
                }
            })
        }catch(error) { console.log(error.message) }
       
    }

    // if(flag == true){
    //     PromptDB()
    //     setFlag(false);
    // }

    useEffect(()=>{
        ReadPromptDB()
    },[])
   

    const ReadPromptDB = async()=>{ 
        const questionId = props.route.params.questionId;
        const strategyId = props.route.params.strategyId;

        try{
            //questionId가 일치하는 prompt 쿼리
            const q1 = await query( collection(db, "Prompt"), where('questionId',"==", questionId))
            const PromptQuestion = await getDocs(q1); //question에 해당하는 모든 prompt 리스트 

            let tempData=[]
            PromptQuestion.docs.map((doc)=>{
                //strategy 일치 확인
                if(doc.data().strategyId === strategyId) {

                    doc.data().prompts.map(item =>{
                        tempData.push(item) 
                    })
                   
                    console.log(doc.data().count);
                }
            })
            console.log("tempData",tempData)
            setPromptData(tempData)
        }catch(error){

        }
    }
    const showPrompt = () =>{
        let newIdx = promptIdx +1 
        setPromptIdx(newIdx)
    }

    return(
        <View>
            {/* <Text>{nowPrompt}</Text> */}
            <Text>{promptData[promptIdx]}</Text>
            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:"skyblue"}}
                onPress={()=>{
                    showPrompt()
                    // props.navigation.navigate("Prompt", {
                    //     studentId: studentId,
                    //     testId: testId,
                    //     questionId: questionId,
                    //     strategyId: strategyId,
                    //     questionPrint: printQuestion,
                    //     choiceStrategy: choiceStrategy,
                    //     nowPrompt: nowPrompt,
                    //     countPrompt: countPrompt,
                    //     first : false
                    // })
                }}>
                <Text>Submit</Text> 
            </TouchableOpacity>
        </View>
    )
}
export default Prompt;