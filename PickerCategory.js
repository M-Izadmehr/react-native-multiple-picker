import React, {Component} from 'react';
import {Text, View, FlatList, TouchableWithoutFeedback} from 'react-native';
class PickerCategory extends Component {
    constructor(props) {
        super(props);
        if(this.props.initValue){
            var initValue = this.props.initValue[this.props.catId];
        }

        this.state = {
            selectedId: initValue,
        }
    }

    buttonPress = (item) => {
        this.setState({selectedId: item.key});
        this.props.onPress(item.key,this.props.catId);
    };


    renderItem = (item) => {
        const {selectedId} = this.state;
        const {items,textStyle,textStyleSelected} = styles;
        const isSelected = selectedId === item.key;
        let selectedItem = styles.selectedItemMiddle;

        if (this.props.catId === 0) {
            selectedItem = styles.selectedItemFirst;
        } else if (this.props.catId === this.props.catNum-1) {
            selectedItem = styles.selectedItemLast;
        }
        return (
            <TouchableWithoutFeedback onPress={() => this.buttonPress(item)}>
                <View style={[items,isSelected  && selectedItem]}>
                    <Text style={[textStyle,isSelected && textStyleSelected]}>{item.label}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };


    render() {
        return (
            <View style={{flex: 1,width:'100%'}}>

                <FlatList style={{flex: 1,width:'100%'}}
                          data={this.props.data}
                          removeClippedSubviews={true}
                          renderItem={({item}) => {
                              return this.renderItem(item)
                          }}
                />
            </View>
        );
    }
}
const styles = {
    items: {
        paddingVertical: 10,
        alignItems: 'center'
    },
    selectedItemFirst: {
        elevation:5,
        backgroundColor: '#fa986c',
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
    },
    selectedItemLast: {
        elevation:15,
        backgroundColor: '#fa986c',
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40,
    },
    selectedItemMiddle: {
        elevation:15,
        backgroundColor: '#fa986c',
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40,
    },
    textStyle:{
        color: '#fff8',
        fontSize: 20
    },
    textStyleSelected:{
        color: '#fff',
        fontSize: 25

    },
};

export default PickerCategory;