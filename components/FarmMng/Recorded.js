import * as React from 'react';
import * as RN from 'react-native';
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import ComsumptionRc from '../recorded/ConsumptionRc'
import { useNavigation } from '@react-navigation/native';



export default function Recorded() {

    const [consumption, setConsumption] = React.useState([]);
    const navigation = useNavigation();


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <RN.Button title='back' onPress={() => navigation.goBack()} />
        })
    }, [navigation])

    React.useEffect(() => {
        const collectionRef = collection(db, 'consumption');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsusbscribe');
            setConsumption(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    dosagedate: doc.data().dosagedate,
                    selectproduct: doc.data().selectproduct,
                    croptype: doc.data().croptype,
                    unit: doc.data().unit,
                    remark: doc.data().remark,
                    isDone: doc.data().isSold,
                    createdAt: doc.data().createdAt,
                }))
            );
        });
        return unsubscribe;
    }, [])


    return (
        <RN.View style={styles.container}>
            <RN.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <RN.Text style={styles.title}>Record</RN.Text>
                {consumption.map(consumptions => <ComsumptionRc key={consumptions.id} {...consumptions} />)}
            </RN.ScrollView>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F9',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        margin: 16,
    },
});