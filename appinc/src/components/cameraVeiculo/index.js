import React, { Component } from 'react';
import {
    View, Text, StyleSheet, ScrollView, Alert,
    Image, TouchableOpacity, NativeModules, Dimensions, TextInput, AsyncStorage
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsividade } from '../../styles';

var ImagePicker = NativeModules.ImageCropPicker;


class Camera extends React.Component {

    state = {
        avatarSource: null,
        videoSource: null,
        imagePath: null,
        image: null,
        images: [],
        inputSave: '',
        arrayCamera: [],
    };

    pickSingleWithCamera(cropping) {
        const { data } = this.props;
        ImagePicker.openCamera({
            cropping: cropping,
            includeExif: false,
            includeBase64: true,
            width: 600,
            height: 600,
        }).then(image => {
            this.setState({
                image: {
                    uri: image.path,
                    width: image.width,
                    height: image.height
                },
                images: [
                    ...this.state.images,
                    {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mine: image.mime,
                    }
                ],
                arrayCamera: [
                    ...this.state.arrayCamera,
                    {
                        uri: image.path,
                        type: 'image/jpeg',
                        name: `Teste.jpg`,
                    }
                ],
                imagePath: image.path
            });

        }).catch();
    }

    pickSingle(cropit, circular = false) {
        ImagePicker.openPicker({
            cropping: cropping,
            includeExif: false,
            includeBase64: true,
        }).then(image => {
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height },
                images: null,
                imagePath: image.path
            });
        }).catch(e => {
            console.log(e);
        });
    }



    pickSingleBase64(cropit) {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: cropit,
            includeBase64: true,
            includeExif: true,

        }).then(image => {
            console.log('received base64 image');
            this.setState({
                image: { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height },
                images: null
            });
        }).catch();
    }

    cleanupImages() {
        ImagePicker.clean().then(() => {
            console.log('removed tmp images from tmp directory');
        }).catch(e => {
            //alert(e);
        });
    }

    cleanupSingleImage() {
        let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
        console.log('will cleanup image', image);

        ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
            console.log(`removed tmp image ${image.uri} from tmp directory`);
        }).catch(e => {
            //alert(e);
        })
    }

    cropLast() {
        if (!this.state.image) {
            //return Alert.alert('Sem imagem', 'Por favor , selecione uma imagem');
        }

        ImagePicker.openCropper({
            path: this.state.image.uri,
            width: 200,
            height: 200
        }).then(image => {
            console.log('received cropped image', image);
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
                images: null
            });
        }).catch(e => {
            console.log(e);
            // Alert.alert(e.message ? e.message : e);
        });
    }

    pickSingle(cropit, circular = false) {
        ImagePicker.openPicker({
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 640,
            compressImageMaxHeight: 480,
            compressImageQuality: 0.5,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(image => {
            this.setState({
                image: { uri: image.path, width: image.width, height: image.height },
                images: null,
                imagePath: image.path
            });
        }).catch(e => {
            console.log(e);
        });
    }

    pickMultiple() {
        const { data } = this.props;
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
        }).then(images => {
            images.map(image => {
                this.setState({
                    images: [
                        ...this.state.images,
                        {
                            uri: image.path,
                            width: image.width,
                            height: image.height,
                            mine: image.mime,
                        }
                    ],
                    arrayCamera: [
                        ...this.state.arrayCamera,
                        {
                            uri: image.path,
                            type: 'image/jpeg',
                            name: `${data.data_name}.jpg`,
                        }
                    ],
                })
            });
        });//.catch(e => alert(e));
    }

    scaledHeight(oldW, oldH, newW) {
        return (oldH / oldW) * newW;
    }

    renderVideo(video) {
        return (<View style={{ height: 300, width: 300 }}>
            <Video source={{ uri: video.uri, type: video.mime }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                rate={1}
                paused={false}
                volume={1}
                muted={false}
                resizeMode={'cover'}
                onError={e => console.log(e)}
                onLoad={load => console.log(load)}
                repeat={true} />
        </View>);
    }

    renderImage(image) {
        return <Image resizeMode="contain" style={styles.avatar} source={image} />
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }

    saveGroupCamera = info => {
        const { imageData, imagePath, image, arrayCamera } = this.state;
        const {
            form,
            getSaveStateForm,
            startControlArray,
            data,
            index,
            saveDataGroup,
            group,
            groupMother,
            startControlArrayGroup,
        } = this.props;
        if (imagePath || image) {
            saveDataGroup({
                index,
                groupMother,
                name: info.data_name,
                data: {
                    uri: image.uri,
                    type: 'image/jpeg',
                    name: `${info.data_name}.jpg`
                },
                extra: image,
                type: data.component_type
            })
        }
        startControlArrayGroup(info.data_name)
    }

    saveFormInput = info => {

        const { imageData, imagePath, image, inputSave, images, arrayCamera } = this.state;
        const {
            form,
            getSaveStateForm,
            startControlArray,
            saveDataGroup, //importa
            data, // importa
            index, //importa
            group, // importa
        } = this.props;
        const size = arrayCamera.length;


        if (size > 0) {
            for (var key in form.step) {
                if (key === info.data_name) {
                    const form = {};
                    form[info.data_name] = {
                        key: info.data_name,
                        value: arrayCamera,
                        data: images,
                        filled: true,
                        type: info.component_type,
                    };

                    getSaveStateForm(form);
                    form[`leg_${info.data_name}`] = {
                        key: `leg_${info.data_name}`,
                        value: inputSave, data: null,
                        filled: true,
                        type: 'text',
                    };


                    getSaveStateForm(form);
                }
            }

        } else {
            for (var key in form.step) {
                if (key === info.data_name && info.data_name.filled === false) {
                    const form = {};
                    form[info.data_name] = {
                        key: info.data_name,
                        value: {
                            uri: '',
                            type: '',
                            name: ''
                        },
                        data: image,
                        filled: false
                    };
                    getSaveStateForm(form);
                    form[`leg_${info.data_name}`] = { key: `leg_${info.data_name}`, value: inputSave, data: null, filled: true };

                    getSaveStateForm(form);
                }
            }
        }
        startControlArray();
    }

    render() {
        const { group } = this.props;
        const { largura_tela } = responsividade;
        return (

            <View style={styles.container}>

                <ScrollView
                    horizontal
                    pagingEnabled
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true, duration: 3000 });
                    }}
                >
                    {/*this.state.image ? this.renderAsset(this.state.image) : null*/}
                    {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
                </ScrollView>
                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarContainer2}>
                                <Icon name="add-a-photo" color="black" size={largura_tela < 430 ? 20 : 30} style={styles.icon} />
                                <View style={styles.text_foto}>
                                    <Text style={styles.text1}>Tirar foto</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.pickMultiple(false)} style={styles.button}>
                        <View style={styles.avatarContainer1}>
                            <View style={styles.avatarContainer2}>
                                <Icon name="photo-library" color="white" size={largura_tela < 430 ? 20 : 30} style={styles.icon} />
                                <View style={styles.text_foto}>
                                    <Text style={styles.text}>Abrir galeria</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerText}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        autoCorrect={true}
                        placeholder={"Descrição..."}
                        maxLength={100}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        value={this.state.inputSave}
                        onChangeText={inputSave => this.setState({ inputSave })}
                    />
                </View>
            </View>
        );
    }

}

export default Camera;
