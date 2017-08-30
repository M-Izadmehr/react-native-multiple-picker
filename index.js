'use strict';

import React, {
    PropTypes
} from 'react';

import {
    View,
    Dimensions,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import PickerCategory from'./PickerCategory';
import styles from './style';
import BaseComponent from './BaseComponent';
import LinearGradient from 'react-native-linear-gradient'

const {width} = Dimensions.get('window');

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.array,
    label: PropTypes.array,
};

const defaultProps = {
    data: [],
    onChange: () => {
    },
    initValue: [],
    style: {},
    selectStyle: {},
    cancelStyle: {},
    label: [],
};


export default class ModalPicker extends BaseComponent {

    constructor(props) {
        super(props);

        this._bind(
            'onChange',
            'open',
            'close',
            'renderChildren',
            'accept',
        );
        this.state = {
            animationType: 'fade',
            modalVisible: false,
            transparent: false,
            selected: 'please select',
            selection: new Array(this.props.data.length),
        };
    }

    currentCatId = 0;

    componentDidMount() {
        this.setState({selection: this.props.initValue});
        this.setState({cancelText: this.props.cancelText});

    }

    onChange = (item, catId) => {
        const selection = this.state.selection;
        selection[catId] = item;
        this.setState(selection);


    }

    close() {
        if (this.props.initValue) {
            const initValue = this.props.initValue;
            this.setState({selection: initValue})
        }

        this.setState({
            modalVisible: false
        });
    }

    accept() {
        const {selection} = this.state;
        this.props.onChange(selection);

        this.setState({
            modalVisible: false
        });
    }

    open() {
        this.setState({
            modalVisible: true
        });
    }

    renderChildren() {

        if (this.props.children) {
            return this.props.children;
        }
        return (
            <Text>Please Select an Item!</Text>
        );
    }


    renderOptionList(catItem, catId, catNum) {
        let borderLeft = catId===0 ? 0: 20;
        let borderRight = catId===catNum-1 ?0 :20;

        return (
            <View key={catId} style={{width: width * 0.8 / this.props.data.length}}>
                <View style={{
                    paddingVertical: 8,
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: '#ffffff05',
                    borderBottomRightRadius:borderRight,
                    borderBottomLeftRadius: borderLeft,
                    marginBottom: 2,
                    elevation: 1
                }}>
                    <Text style={{color: '#f9976c', fontSize: 20}}>{this.props.label[catId]}</Text>
                </View>
                <PickerCategory key={catId}
                                catId={catId}
                                catNum={catNum}
                                data={catItem}
                                onPress={this.onChange}
                />
            </View>
        );
    }


    renderCategory() {
        const catNum = this.props.data.length;
        let catId = -1;
        let catShow = this.props.data.map((catItem) => {
            catId++;
            return this.renderOptionList(catItem, catId, catNum);
        });

        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                <View style={{
                    height: '88%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {catShow}
                </View>

                <View style={{
                    height: '12%',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>

                    <TouchableOpacity onPress={this.close}>
                        <View style={styles.cancelStyle}>
                            <Text style={{fontSize: 25}}>✗</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.accept}>
                        <View style={styles.acceptStyle}>
                            <Text style={{fontSize: 25}}>✓</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    render() {


        const dp = (

            <Modal transparent={true} ref="modal" visible={this.state.modalVisible} onRequestClose={this.close}
                   animationType={this.state.animationType}>

                <TouchableWithoutFeedback onPress={this.close}>
                <LinearGradient
                    start={{x: 0.0, y: 0}}
                    end={{x: 1, y: 1.0}}
                    locations={[0, 1]}
                    colors={['#743e4efa', '#221d33fa']}
                    style={{
                        height: '100%',
                        width: '100%'
                    }}>

                    {this.renderCategory()}
                </LinearGradient>
                </TouchableWithoutFeedback>

            </Modal>
        );

        return (
            <View style={this.props.style}>
                {dp}
                <TouchableOpacity onPress={this.open}>
                    {this.renderChildren()}
                </TouchableOpacity>
            </View>
        );
    }
}

ModalPicker.propTypes = propTypes;
ModalPicker.defaultProps = defaultProps;
