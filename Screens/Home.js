import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs,where, query, addDoc } from 'firebase/firestore';
const Home =(props)=>{
    const [testNum, setTestNum] = useState(); //테스트 num DB

    //Test의 state상태가 true인 test를 찾아 저장하기
    const TestDB = async ()=>{  
        const studentId = props.route.params.student; //login성공- 얻은 학생 아이디 
        const finishState = props.route.params.finish; //test 여부
        const test = props.route.params.testId; //시험이 완료된 시험 아이디

        let ChoiceTest;
        try{
            const q = await query( collection(db, "Test"), where('state',"==", "true"))
            const ReadTest = await getDocs(q);
            //활성화된 test확인
            ReadTest.docs.map((row, idx) =>{
                setTestNum(row.data().testId) //최종 test DB 저장 
                ChoiceTest = row.data().testId;
            })

            if(testNum==test && finishState==true){
                alert("You already finish test");
            }else{
                //학생 답안지 생성
                await addDoc(collection(db, "AnswerStudent"), {
                    st_id: studentId,
                    testId: ChoiceTest,
                    score: 0,
                    firstAnswer: "-",
                    secondAnswer: "-",
                    thirdAnswer: "-",
                    q1_A_p1: "-",
                    q1_A_p2: "-",
                    q1_A_p3: "-",
                    q1_A_p4: "-",
                    q1_A_p5: "-",
                    q1_B_p1: "-",
                    q1_B_p2: "-",
                    q1_B_p3: "-",
                    q1_B_p4: "-",
                    q1_C_p1: "-",
                    q1_C_p2: "-",
                    q1_C_p3: "-",
                    q1_C_p4: "-",
                    q2_A_p1: "-",
                    q2_A_p2: "-",
                    q2_A_p3: "-",
                    q2_A_p4: "-",
                    q2_A_p5: "-",
                    q2_B_p1: "-",
                    q2_B_p2: "-",
                    q2_B_p3: "-",
                    q2_B_p4: "-",
                    q2_C_p1: "-",
                    q2_C_p2: "-",
                    q2_C_p3: "-",
                    q2_C_p4: "-",
                    q3_A_p1: "-",
                    q3_A_p2: "-",
                    q3_A_p3: "-",
                    q3_A_p4: "-",
                    q3_A_p5: "-",
                    q3_B_p1: "-",
                    q3_B_p2: "-",
                    q3_B_p3: "-",
                    q3_B_p4: "-",
                    q3_C_p1: "-",
                    q3_C_p2: "-",
                    q3_C_p3: "-",
                    q3_C_p4: "-",
                });
                alert("Create AnswerPaper")
                props.navigation.navigate("StartTest" ,{
                    studentId: studentId,
                    testId: ChoiceTest,
                    Count: 3
                })
            }

            
        }catch(error){ console.log(error.message)}
    }
    return(
        <View style={styles.mainView}>
            <Button
                title = 'Test'
                onPress={TestDB}
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
    }
});
export default Home;