import React, { useState } from 'react';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from './firebaseConfig'; 

const PerfilScreen = ({ route, navigation }) => {
    const { fullName, username, email, userId, profilePicture } = route.params;
    const [imageUri, setImageUri] = useState(profilePicture || null);
    const [loading, setLoading] = useState(false);

    // Função para abrir a galeria ou a câmera
    const pickImage = () => {
        Alert.alert(
            'Escolher uma opção',
            'Escolha uma opção para alterar sua foto de perfil:',
            [
                {
                    text: 'Galeria',
                    onPress: () => openGallery(),
                },
                {
                    text: 'Câmera',
                    onPress: () => openCamera(),
                },
                { text: 'Cancelar', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    // Função para abrir a galeria
    const openGallery = async () => {
        launchImageLibrary({ mediaType: 'photo', quality: 1 }, async (response) => {
            if (response.didCancel) {
                console.log('Imagem não selecionada');
            } else if (response.errorCode) {
                console.log('Erro na seleção da imagem:', response.errorMessage);
                Alert.alert('Erro', 'Erro ao selecionar a imagem.');
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
                setLoading(true);

                try {
                    const response = await fetch(uri);
                    const blob = await response.blob();
                    const imageRef = ref(storage, `profilePictures/${userId}/profile.jpg`);

                    await uploadBytes(imageRef, blob);
                    const downloadURL = await getDownloadURL(imageRef);

                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, { profilePicture: downloadURL });

                    Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
                    setImageUri(downloadURL);
                } catch (error) {
                    console.error('Erro ao carregar a imagem:', error);
                    Alert.alert('Erro', 'Não foi possível atualizar a foto de perfil.');
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    // Função para abrir a câmera
    const openCamera = async () => {
        launchCamera({ mediaType: 'photo', quality: 1 }, async (response) => {
            if (response.didCancel) {
                console.log('Imagem não tirada');
            } else if (response.errorCode) {
                console.log('Erro na captura da imagem:', response.errorMessage);
                Alert.alert('Erro', 'Erro ao capturar a imagem.');
            } else {
                const uri = response.assets[0].uri;
                setImageUri(uri);
                setLoading(true);

                try {
                    const response = await fetch(uri);
                    const blob = await response.blob();
                    const imageRef = ref(storage, `profilePictures/${userId}/profile.jpg`);

                    await uploadBytes(imageRef, blob);
                    const downloadURL = await getDownloadURL(imageRef);

                    const userRef = doc(db, 'users', userId);
                    await updateDoc(userRef, { profilePicture: downloadURL });

                    Alert.alert('Sucesso', 'Foto de perfil atualizada com sucesso!');
                    setImageUri(downloadURL);
                } catch (error) {
                    console.error('Erro ao carregar a imagem:', error);
                    Alert.alert('Erro', 'Não foi possível atualizar a foto de perfil.');
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.cimas}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.MenuInicial}>
                    <Image source={require('./assets/voltarImg.png')} style={styles.voltarImg} />
                </TouchableOpacity>
                <Text style={styles.textCima}>Perfil</Text>
                <Image source={require('./assets/configImg.png')} style={styles.Config} />
            </View>

            <View style={styles.botoes}>
                <Image source={imageUri ? { uri: imageUri } : require('./assets/mcigPerfil.jpg')} style={styles.perfilImage} />
                <Text style={styles.name}>{fullName}</Text>
                <Text style={styles.username}>@{username}</Text>
                <Text style={styles.email}>{email}</Text>

                <TouchableOpacity onPress={pickImage} style={styles.button}>
                    <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Alterar Foto'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    perfilImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        color: 'white',
        marginBottom: 10,
        fontFamily: 'Raleway-Bold'
    },
    username: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
    },
    email: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'sans-serif',
    },
    button: {
        backgroundColor: '#9F3EFC',
        width: 240,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    botoes: {
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    cimas: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    MenuInicial: {
        marginRight: 'auto',
    },
    Config: {
        marginLeft: 'auto',
    },
    voltarImg: {
        width: 24,
        height: 24,
    },
});

export default PerfilScreen;
