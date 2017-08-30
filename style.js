'use strict';

import {StyleSheet, Dimensions} from 'react-native';

const { width} = Dimensions.get('window');

export default StyleSheet.create({
    cancelStyle: {
        borderRadius: 15,
        width: width * 0.1,
        height: width * 0.1,
        elevation:10,
        backgroundColor: '#ff3e0abb',
        alignItems:'center',
        alignContent:'center',
        margin:10,
    },
    acceptStyle: {
        borderRadius: 15,
        width: width * 0.1,
        height: width * 0.1,
        elevation:10,
        backgroundColor: '#81e200aa',
        alignItems:'center',
        alignContent:'center',
        margin:10,
    },
});