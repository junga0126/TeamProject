import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';


const Prompt =(props)=>{
    const [promptData,setPromptData] = useState([])
    const [promptIdx,setPromptIdx] = useState(0)
    const [countPrompt, setCountPrompt] = useState(); // (prompt개수) - 몇번째 prompt인지 확인하기 위한 count
    let nowCount = 100;

    //출력할 정보
    const [studentId, setStudentId] = useState(""); //불러온 studentId
    const [testId, setTestId] = useState(""); //불러온 testId
    const [printQuestion,setPrintQuestion] = useState("") //print할 question 지문 저장
    const [questionId, setQuestionId] = useState(""); //넘겨줄 question key저장
    const [printPrompt, setPrintPrompt] = useState(""); // 출력할 prompt
    const [nowPrompt, setNowPrompt] = useState(0);
    const [strategyId, setStrategyId] = useState();
    //const [choiceStrategy, setChoiceStrategy] = useState();


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

                    //prompts배열에서 tempData배열로 item하나하나 push
                    doc.data().prompts.map(item =>{
                        tempData.push(item) 
                    })
                
                    nowCount = doc.data().count; //prompt개수
                    setCountPrompt(doc.data().count)
                    console.log("doc.data().count", doc.data().count);
                }
            })
            console.log("tempData",tempData)
            setPromptData(tempData)
        }catch(error){

        }
    }

    const showPrompt =  async() =>{
        //처음에만 불러와서
        // flag를 usestate로 해도 오류...
        // count를 불러와서 값을 변경해야 한다...

        //strategy에서 prompt가 다 완료되면 사
        //countPrompt
        let newIdx = promptIdx +1 
        setPromptIdx(newIdx)


        if(nowCount == 100){
            const questionId = props.route.params.questionId;
            const strategyId = props.route.params.strategyId;
            try{
                const q5 = await query( collection(db, "Prompt"), where('questionId',"==", questionId))
                const p1 = await getDocs(q5); //question에 해당하는 모든 prompt 리스트 
                p1.docs.map((doc)=>{
                    if(doc.data().strategyId === strategyId)  nowCount = doc.data().count;
                })
            }catch(error){}
        }

        if(countPrompt == 0) {
            backStrategy();
             console.log('change'+ countPrompt);
        }
        else{
            // nowCount = nowCount-1;
            setCountPrompt(countPrompt-1)
            console.log('change'+ countPrompt);
        }

    }


    const backStrategy = ()=>{
        props.navigation.navigate("Strategy", {
            studentId: studentId,   //학생id
            testId: testId,         //시험id
            questionId: questionId, //문제id
            strategyId: strategyId, //전략id
            printQuestion: printQuestion,
            FinishState: false, //해당 전략 완료
        })
    }

    return(
        <View>
            {/* <Text>{nowPrompt}</Text> */}
            <Text>{promptData[promptIdx]}</Text>
            <TouchableOpacity 
                style={{witdth: "75%", backgroundColor:"skyblue"}}
                onPress={()=>{
                    showPrompt()
                }}>
                <Text>Submit</Text> 
            </TouchableOpacity>
        </View>
    )
}
export default Prompt;