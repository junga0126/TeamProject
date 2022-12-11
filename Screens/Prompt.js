import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, where, query, doc, updateDoc } from 'firebase/firestore';


const Prompt =(props)=>{
    const [promptData,setPromptData] = useState([])
    const [promptIdx,setPromptIdx] = useState(0)
    const [countPrompt, setCountPrompt] = useState(); // (prompt개수) - 몇번째 prompt인지 확인하기 위한 count
    let nowCount = 100;

    //출력할 정보
    const [studentId, setStudentId] = useState(""); //불러온 studentId
    const [testId, setTestId] = useState(""); //불러온 testId
    const [questionId, setQuestionId] = useState(""); //넘겨줄 question key저장
    const [strategyId, setStrategyId] = useState();
    const [printQuestion,setPrintQuestion] = useState("") //print할 question 지문 저장
    const [questionCount, setQuestionCount] = useState();
    
    const [promptAnswer, setPromptAnswer] = useState(""); //학생 입력 답 저장


    useEffect(()=>{
        ReadPromptDB()
    },[])
   

    const ReadPromptDB = async()=>{ 
        const questionId = props.route.params.questionId;
        const strategyId = props.route.params.strategyId;
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const questionPrint = props.route.params.questionPrint;
        const Count = props.route.params.Count;
       
        setStudentId(studentId);
        setTestId(testId);
        setQuestionId(questionId);
        setStrategyId(strategyId);
        setPrintQuestion(questionPrint);
        setQuestionCount(Count);

        console.log("Prompt CountNum", Count);
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
        const strategyId = props.route.params.strategyId;
        const studentId = props.route.params.studentId;
        const testId = props.route.params.testId;
        const Count = props.route.params.Count;
        //promptIdx
        //학생 답안 저장
        try{
            const q = await query( collection(db, "AnswerStudent"), where('testId',"==", testId)) 
            const answer = await getDocs(q); //test id일치 답안지
            let docID; //answer의 DB ID
            answer.docs.map((row, idx)=>{   //학생 아이디 일치 확인************질문 
                docID = row.id;
            })
            const docRef = doc(db, "AnswerStudent", docID); //해당 id가진 user업데이트

            /*  
                Count가      3-(1번문제),    2-(2번문제),    1-(3번문제)
                strategyId가 0-(A전략),      1-(B전략),      2-(C전략)
                promptIdx    0-(1번 prompt), 1-(2번 prompt)  2-(3번 prompt)    
            */

            let q1_A_p1, q1_A_p2, q1_A_p3, q1_A_p4, q1_A_p5;
            let q1_B_p1, q1_B_p2, q1_B_p3, q1_B_p4;
            let q1_C_p1, q1_C_p2, q1_C_p3, q1_C_p4;
            let q2_A_p1, q2_A_p2, q2_A_p3, q2_A_p4, q2_A_p5;
            let q2_B_p1, q2_B_p2, q2_B_p3, q2_B_p4;
            let q2_C_p1, q2_C_p2, q2_C_p3, q2_C_p4;                   
            let q3_A_p1, q3_A_p2, q3_A_p3, q3_A_p4, q3_A_p5;
            let q3_B_p1, q3_B_p2, q3_B_p3, q3_B_p4;
            let q3_C_p1, q3_C_p2, q3_C_p3, q3_C_p4;

            const q2 = await query( collection(db, "Answer"), where('testId',"==", testId)) 
            const mark = await getDocs(q2); //test id일치 답안지
            mark.docs.map((row, idx)=>{  
                q1_A_p1 = row.data().q1_A_p1;
                q1_A_p2 = row.data().q1_A_p2;
                q1_A_p3 = row.data().q1_A_p3;
                q1_A_p4 = row.data().q1_A_p4;
                q1_A_p5 = row.data().q1_A_p5;
                q1_B_p1 = row.data().q1_B_p1;
                q1_B_p2 = row.data().q1_B_p2;
                q1_B_p3 = row.data().q1_B_p3;
                q1_B_p4 = row.data().q1_B_p4;
                q1_C_p1 = row.data().q1_C_p1;
                q1_C_p2 = row.data().q1_C_p2;
                q1_C_p3 = row.data().q1_C_p3;
                q1_C_p4 = row.data().q1_C_p4;
                q2_A_p1 = row.data().q2_A_p1;
                q2_A_p2 = row.data().q2_A_p2;
                q2_A_p3 = row.data().q2_A_p3;
                q2_A_p4 = row.data().q2_A_p4;
                q2_A_p5 = row.data().q2_A_p5;
                q2_B_p1 = row.data().q2_B_p1;
                q2_B_p2 = row.data().q2_B_p2;
                q2_B_p3 = row.data().q2_B_p3;
                q2_B_p4 = row.data().q2_B_p4;
                q2_C_p1 = row.data().q2_C_p1;
                q2_C_p2 = row.data().q2_C_p2;
                q2_C_p3 = row.data().q2_C_p3;
                q2_C_p4 = row.data().q2_C_p4;
                q3_A_p1 = row.data().q3_A_p1;
                q3_A_p2 = row.data().q3_A_p2;
                q3_A_p3 = row.data().q3_A_p3;
                q3_A_p4 = row.data().q3_A_p4;
                q3_A_p5 = row.data().q3_A_p5;
                q3_B_p1 = row.data().q3_B_p1;
                q3_B_p2 = row.data().q3_B_p2;
                q3_B_p3 = row.data().q3_B_p3;
                q3_B_p4 = row.data().q3_B_p4;
                q3_C_p1 = row.data().q3_C_p1;
                q3_C_p2 = row.data().q3_C_p2;
                q3_C_p3 = row.data().q3_C_p3;
                q3_C_p4 = row.data().q3_C_p4;
            })

            if(Count==3){ //1번문제
                if(strategyId==0){ //A전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q1_A_p1: promptAnswer });
                            if(promptAnswer!=q1_A_p1) alert("[wrong answer]: "+q1_A_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q1_A_p2: promptAnswer });
                            if(promptAnswer!=q1_A_p2) alert("[wrong answer]: "+q1_A_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q1_A_p3: promptAnswer });
                            if(promptAnswer!=q1_A_p3) alert("[wrong answer]: "+q1_A_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_A_p4: promptAnswer });
                            if(promptAnswer!=q1_A_p4) alert("[wrong answer]: "+q1_A_p4);
                            break;
                        case 4: 
                            await updateDoc(docRef, { q1_A_p5: promptAnswer });
                            if(promptAnswer!=q1_A_p5) alert("[wrong answer]: "+q1_A_p5);
                            break;
                    }
                }else if(strategyId==1){ //B전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q1_B_p1: promptAnswer });
                            if(promptAnswer!=q1_B_p1) alert("[wrong answer]: "+q1_B_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q1_B_p2: promptAnswer });
                            if(promptAnswer!=q1_B_p2) alert("[wrong answer]: "+q1_B_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q1_B_p3: promptAnswer });
                            if(promptAnswer!=q1_B_p3) alert("[wrong answer]: "+q1_B_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_B_p4: promptAnswer });
                            if(promptAnswer!=q1_B_p4) alert("[wrong answer]: "+q1_B_p4);
                            break;
                    }
                }else if(strategyId==2){ //C전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q1_C_p1: promptAnswer });
                            if(promptAnswer!=q1_C_p1) alert("[wrong answer]: "+q1_C_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q1_C_p2: promptAnswer });
                            if(promptAnswer!=q1_C_p2) alert("[wrong answer]: "+q1_C_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q1_C_p3: promptAnswer });
                            if(promptAnswer!=q1_C_p3) alert("[wrong answer]: "+q1_C_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_C_p4: promptAnswer });
                            if(promptAnswer!=q1_C_p4) alert("[wrong answer]: "+q1_C_p4);
                            break;
                    }
                }
            }else if(Count==2){ //2번문제
                if(strategyId==0){ //A전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q2_A_p1: promptAnswer });
                            if(promptAnswer!=q2_A_p1) alert("[wrong answer]: "+q2_A_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q2_A_p2: promptAnswer });
                            if(promptAnswer!=q2_A_p2) alert("[wrong answer]: "+q2_A_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q2_A_p3: promptAnswer });
                            if(promptAnswer!=q2_A_p3) alert("[wrong answer]: "+q2_A_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q2_A_p4: promptAnswer });
                            if(promptAnswer!=q2_A_p4) alert("[wrong answer]: "+q2_A_p4);
                            break;
                        case 4: 
                            await updateDoc(docRef, { q2_A_p5: promptAnswer });
                            if(promptAnswer!=q2_A_p5) alert("[wrong answer]: "+q2_A_p5);
                            break;
                    }
                }else if(strategyId==1){ //B전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q2_B_p1: promptAnswer });
                            if(promptAnswer!=q2_B_p1) alert("[wrong answer]: "+q2_B_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q2_B_p2: promptAnswer });
                            if(promptAnswer!=q2_B_p2) alert("[wrong answer]: "+q2_B_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q2_B_p3: promptAnswer });
                            if(promptAnswer!=q2_B_p3) alert("[wrong answer]: "+q2_B_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q1_B_p4: promptAnswer });
                            if(promptAnswer!=q1_B_p4) alert("[wrong answer]: "+q1_B_p4);
                            break;
                    }
                }else if(strategyId==2){ //C전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q2_C_p1: promptAnswer });
                            if(promptAnswer!=q2_C_p1) alert("[wrong answer]: "+q2_C_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q2_C_p2: promptAnswer });
                            if(promptAnswer!=q2_C_p2) alert("[wrong answer]: "+q2_C_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q2_C_p3: promptAnswer });
                            if(promptAnswer!=q2_C_p3) alert("[wrong answer]: "+q2_C_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q2_C_p4: promptAnswer });
                            if(promptAnswer!=q2_C_p4) alert("[wrong answer]: "+q2_C_p4);
                            break;
                    }
                }

            }else if(Count==1){ //3번문제
                if(strategyId==0){ //A전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q3_A_p1: promptAnswer });
                            if(promptAnswer!=q3_A_p1) alert("[wrong answer]: "+q3_A_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q3_A_p2: promptAnswer });
                            if(promptAnswer!=q3_A_p2) alert("[wrong answer]: "+q3_A_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q3_A_p3: promptAnswer });
                            if(promptAnswer!=q3_A_p3) alert("[wrong answer]: "+q3_A_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q3_A_p4: promptAnswer });
                            if(promptAnswer!=q3_A_p4) alert("[wrong answer]: "+q3_A_p4);
                            break;
                        case 4: 
                            await updateDoc(docRef, { q3_A_p5: promptAnswer });
                            if(promptAnswer!=q3_A_p5) alert("[wrong answer]: "+q3_A_p5);
                            break;
                    }
                }else if(strategyId==1){ //B전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q3_B_p1: promptAnswer });
                            if(promptAnswer!=q2_C_p4) alert("[wrong answer]: "+q2_C_p4);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q3_B_p2: promptAnswer });
                            if(promptAnswer!=q3_B_p1) alert("[wrong answer]: "+q3_B_p1);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q3_B_p3: promptAnswer });
                            if(promptAnswer!=q3_B_p3) alert("[wrong answer]: "+q3_B_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q3_B_p4: promptAnswer });
                            if(promptAnswer!=q3_B_p4) alert("[wrong answer]: "+q3_B_p4);
                            break;
                    }
                }else if(strategyId==2){ //C전략
                    switch(promptIdx){
                        case 0: 
                            await updateDoc(docRef, { q3_C_p1: promptAnswer });
                            if(promptAnswer!=q3_C_p1) alert("[wrong answer]: "+q3_C_p1);
                            break;
                        case 1: 
                            await updateDoc(docRef, { q3_C_p2: promptAnswer });
                            if(promptAnswer!=q3_C_p2) alert("[wrong answer]: "+q3_C_p2);
                            break;
                        case 2: 
                            await updateDoc(docRef, { q3_C_p3: promptAnswer });
                             if(promptAnswer!=q3_C_p3) alert("[wrong answer]: "+q3_C_p3);
                            break;
                        case 3:
                            await updateDoc(docRef, { q3_C_p4: promptAnswer });
                            if(promptAnswer!=q3_C_p4) alert("[wrong answer]: "+q3_C_p4);
                            break;
                    }
                }

            }
          }catch(error){ console.log(error.message)}



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

        if(countPrompt == 1) {
            backStrategy();
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
            questionPrint: printQuestion,
            BackCount: questionCount,
            Count: questionCount
        })
    }

    const answerChangeInput = (event) =>{
        console.log("Input Answer", event);
        setPromptAnswer(event);
    }

    return(
        <View>
            {/* <Text>{nowPrompt}</Text> */}
            <Text>{promptData[promptIdx]}</Text>
            <TextInput
                value = {promptAnswer}
                onChangeText = {answerChangeInput}
                style={{backgroundColor:"gray"}}
                placeholder = 'Write your answer'
            />
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