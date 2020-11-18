import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image} from "react-native";


const styles = StyleSheet.create({
    container: {
        
        flexDirection: 'row',
        paddingTop: 6
    },
    image : {
        marginLeft: 2,
        width : 10,
        height: 10
    }
});

export function Rating(props) {
    let { rating } = props;
    rating = rating / 2.0;
    var images =[]
    for (var i = 0; i < 5; i++) {
        rating >= 1 ? 
        images.push  (<Image style={styles.image} source={require('../assets/Rating_Full_Dot.png')} key={rating}/>)
        : 
        (rating > 0 ? 
            images.push  (<Image style={styles.image} source={require('../assets/Rating_Half_Dot.png')} key={rating}/>) 
            : images.push  (<Image style={styles.image} source={require('../assets/Rating_Empty_Dot.png')} key={rating}/>))
        
        rating--;
    }
    return (
        <View style = {[styles.container, props.style]}>
            {images}

        </View>
    )
}
