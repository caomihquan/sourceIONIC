import { StyleSheet, Dimensions } from 'react-native';
import { Configs_TienThu } from '../config';

const DEVICE_WIDTH = Dimensions.get('window').width;
export const Login = {
    Form: StyleSheet.create({
        content: {
            flex: 1,
            backgroundColor: Configs_TienThu.Color.Background,
        },
        container: {
            flex: 1,
            zIndex: 2,
            alignItems: 'center',
        },
        containerBio: {
            minHeight: 150
        },
        bannerWrapper: {
            flex: 1,
            width: '100%',
        },
        noneBanner: {
            height: 0
        },
        banner: {
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            resizeMode: 'contain'
        },
        headerWrapper: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: "center",
            backgroundColor: Configs_TienThu.Color.Primary,
        },
        header: {
            width: 50,
            height: 50,
            alignSelf: 'stretch',
        },
        headerText: {
            fontSize: 25,
            paddingLeft: 10,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            textAlignVertical: 'center',
            color: Configs_TienThu.Color.Title,
        },
        mainWrapper: {
            flex: 0.4,
            justifyContent: "center",
        },
        mainContent: {
            flexDirection: 'row',
            alignItems: 'stretch',
        },
        mainText: {
            flex: 1,
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: "center",
            textTransform: 'uppercase',
        },
        mainText1: {
            color: Configs_TienThu.Color.TextColor,
        },
        mainText2: {
            color: Configs_TienThu.Color.Primary,
        },
        footer: {
            zIndex: 2,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Configs_TienThu.Color.BackgroundHeader,
        },
        footerText: {
            fontSize: 25,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: Configs_TienThu.Color.TextColor,
        },
        footerVersion: {
            fontWeight: 'bold',
            color: Configs_TienThu.Color.TextColor,
        },
        footerLang: {
            width: '100%',
            paddingRight: 15,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
        },
        buttonLanguageContainer: {
            width: 60,
            opacity: 0.3,
            alignItems: 'center',
        },
        buttonLanguageActive: {
            opacity: 1
        },
        buttonLanguageImage: {
            width: 35,
            height: 35,
        },
        modal: {
            flex: 1,
            backgroundColor: Configs_TienThu.Color.Background,
        },
        titleBio: {
            fontSize: 18,
        },
        userBio: {
            fontSize: 15,
            marginBottom: 13
        },
        unlockBio: {
            marginTop: 10,
            paddingVertical: 5,
            paddingHorizontal: 20,
            alignItems: 'center',
            flexDirection: 'row',
        },
        iconUnlockBio: {
            fontSize: 30,
            marginRight: 10,
        },
        lockoutBio: {
            marginRight: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignSelf: 'flex-end',
        },
        textLockoutBio: {
            textTransform: 'uppercase'
        },
    }),
    LoginButton: StyleSheet.create({
        container: {
            paddingTop: 15,
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundColor: Configs_TienThu.Color.Background,
        },
        button: {
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Configs_TienThu.Color.Primary,
        },
        text: {
            color: Configs_TienThu.Color.Title
        },
    }),
    LoginInput: StyleSheet.create({
        inputWrapper: {
            height: 55,
            backgroundColor: Configs_TienThu.Color.Background,
        },
        input: {
            height: 50,
            width: DEVICE_WIDTH - 50,
            marginHorizontal: 20,
            paddingLeft: 45,
            paddingRight: 45,
            color: Configs_TienThu.Color.TextColor,
            borderWidth: 1,
            borderColor: Configs_TienThu.Color.BackgroundHeader,
            backgroundColor: Configs_TienThu.Color.Title,
        },
        inlineImg: {
            position: 'absolute',
            zIndex: 99,
            width: 22,
            height: 25,
            left: 35,
            top: 12,
        },
        inlineImgContainer: {
            position: 'absolute',
            zIndex: 99,
            width: 50,
            height: 50,
            right: 20,
        },
        inlineImgWithContainer: {
            position: 'absolute',
            zIndex: 99,
            width: 25,
            height: 25,
            right: 15,
            top: 12,
        },
        inlineImg2: {
            position: 'absolute',
            zIndex: 99,
            width: 22,
            height: 25,
            right: 35,
            top: 12,
        }
    }),
};