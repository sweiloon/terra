import * as React from 'react';
import * as RN from 'react-native';
import { db } from '../../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';

export default function ConsumptionRc({
    id,
    dosagedate,
    selectproduct,
    croptype,
    unit,
    remark,
    isDone,
}) {


    const onDelete = () => {
        const docRef = doc(db, 'consumption', id);
        deleteDoc(docRef);
    }

    const onEdit = () => {
        const docRef = doc(db, 'consumption', id);
        updateDoc(docRef, {
            isDone: true,
        });
    }

    return (
        <RN.View>
            <RN.View style={styles.productContainer}>
                <RN.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AntDesign onPress={onDelete} name="delete" size={24} color="black" />
                </RN.View>
                <RN.Text style={styles.name}>{dosagedate}</RN.Text>
                <RN.Text style={styles.name}>{selectproduct}</RN.Text>
                <RN.Text style={styles.name}>{croptype}</RN.Text>
                <RN.Text style={styles.name}>{unit}</RN.Text>
                <RN.Text style={styles.price}>{remark}</RN.Text>
                {isDone ? (
                    <RN.TouchableOpacity
                        style={[styles.button, { backgroundColor: 'gray' }]}>
                        <RN.Text style={styles.buttonText}>Done</RN.Text>
                    </RN.TouchableOpacity>
                )
                    : (
                        <RN.TouchableOpacity
                            onPress={onEdit}
                            style={styles.button}>
                            <RN.Text style={styles.buttonText}>In Progess</RN.Text>
                        </RN.TouchableOpacity>
                    )}

            </RN.View>
        </RN.View>
    )
}

const styles = RN.StyleSheet.create({
    productContainer: {
        padding: 16,
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 8,
    },
    emoji: {
        fontSize: 100,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'gray',
    },
    button: {
        backgroundColor: '#0FA5E9',
        padding: 10,
        marginVertical: 6,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
});