import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput, Alert, ToastAndroid } from 'react-native';

const Edit = ({navigation, route}) => {
    const[name,setName] = useState(route.params.name);
    const[pic,setPic] = useState(route.params.pic);

    return (
        <View>
            <StatusBar/>
            <Text>Card Name:</Text>
            <TextInput value={name} style={{borderWidth:1}} onChangeText={(text)=>setName(text)}/>
            <Text>Card Pic URL:</Text>
            <TextInput value={pic} style={{borderWidth:1}} onChangeText={(text)=>setPic(text)}/>
            <Text> </Text>

            {/* UPDATE */}
            <Button title='Update'
                    onPress={()=>{
                        Alert.alert(`Are you sure you want to update this card?`, '', [
                            {
                                text: 'Yes', onPress: () => {
                                    fetch(
                                        "https://onlinecardappwebservice-09rt.onrender.com/updatecard/" + route.params.id,
                                        {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                card_name: name,
                                                card_pic: pic
                                            })
                                        }
                                    )
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((myJson) => {
                                            ToastAndroid.show("Card updated successfully!", ToastAndroid.SHORT);
                                            navigation.navigate('Home');
                                        })
                                }
                            },
                            { text: 'No' }
                        ]);
                    }}
            />

            <Text> </Text>

            {/* DELETE */}
            <Button title='Delete'
                    onPress={()=>{
                        Alert.alert(`Are you sure you want to delete this card?`, '', [
                            {
                                text: 'Yes', onPress: () => {
                                    fetch(
                                        "https://onlinecardappwebservice-09rt.onrender.com/deletecard/" + route.params.id,
                                        {
                                            method: "DELETE",
                                        }
                                    )
                                        .then((response) => {
                                            return response.json();
                                        })
                                        .then((myJson) => {
                                            ToastAndroid.show("Card deleted successfully!", ToastAndroid.SHORT);
                                            navigation.navigate('Home');
                                        })
                                }
                            },
                            { text: 'No' }
                        ]);
                    }}
            />
        </View>
    );
};

export default Edit;
