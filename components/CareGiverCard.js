import React from "react";
import {Content,Card, CardItem, Text, Body, H1 } from "native-base";
import { View } from 'react-native'

const CareGiverCard = ({caregiver}) => {
  console.log(caregiver)
  return (
      <View>
    <Card style={{width:'100%'}}>
        <CardItem>
            <H1>{caregiver.name}</H1>
        </CardItem>
        <CardItem>
            <Text styles={{'textColor':'#F4892C'}}>{caregiver.relationship}</Text>
        </CardItem>
        <CardItem>
            <Text>{caregiver.email}</Text>
        </CardItem>
    </Card>
    </View>
  );
};

export default CareGiverCard;
