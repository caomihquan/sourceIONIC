import { StyleSheet, Dimensions } from 'react-native';
import { Configs_Default } from '../config';

const DEVICE_WIDTH = Dimensions.get('window').width;
export const Login = {
    Form: StyleSheet.create({
        content: {
            flex: 1
        },
        wrapper: {
            flex: 1,
            backgroundColor: Configs_Default.Color.Background
        },
        body: {
            flex: 1,
            textAlign: 'center',
            justifyContent: 'center',
        },
        bannerWrapper: {
            flex: 0.7,
            flexDirection: 'row',
        },
        banner: {
            flex: 1,
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            resizeMode: 'contain',
        },
        container: {
            flex: 1,
            alignItems: 'center',
        },
        footer: {
            margin: 0,
            padding: 0,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        footerContent: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        footerCopyRight: {
            height: 30,
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Configs_Default.Color.Primary,
        },
        footerTextCopyRight: {
            fontSize: 13,
            color: Configs_Default.Color.Background,
        },
        buttonLanguageContainer: {
            width: 80,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonLanguageText: {
            fontSize: 16,
            fontWeight: 'bold',
            paddingVertical: 10,
            paddingHorizontal: 20,
            color: Configs_Default.Color.COLOR_4
        },
        buttonLanguageActive: {
            color: Configs_Default.Color.Secondary
        },
        borderLeft: {
            borderStartWidth: 1,
            borderColor: Configs_Default.Color.COLOR_4
        },
        borderRight: {
            borderEndWidth: 1,
            borderColor: Configs_Default.Color.COLOR_4
        },
        modal: {
            flex: 1,
            backgroundColor: Configs_Default.Color.Background,
        },
        inlineFooter: {
            height: 10
        },
        titleBio: {
            fontSize: 18,
            marginBottom: 5
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
            marginTop: 5,
            marginRight: 10,
            paddingVertical: 5,
            paddingHorizontal: 10,
            alignSelf: 'flex-end',
        },
        textLockoutBio: {
            textTransform: 'uppercase'
        },
        google: {
            width: 40,
            height: 40,
            marginTop: 15
        }
    }),
    LoginButton: StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        button: {
            height: 50,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Configs_Default.Color.Primary,
        },
        text: {
            color: Configs_Default.Color.Background,
            backgroundColor: 'transparent',
        },
    }),
    LoginInput: StyleSheet.create({
        inputWrapper: {
            height: 70,
            backgroundColor: 'transparent',
        },
        input: {
            height: 50,
            width: DEVICE_WIDTH - 50,
            marginHorizontal: 20,
            paddingLeft: 45,
            paddingRight: 45,
            borderRadius: 10,
            backgroundColor: 'transparent',
            color: Configs_Default.Color.COLOR_5,
            borderWidth: 2,
            borderColor: Configs_Default.Color.Primary,
            backgroundColor: Configs_Default.Color.Background,
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
    OTPLogin: StyleSheet.create({
        wrapper: {
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center'
        },
        modalOverlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        modalContainer: {
            width: "80%",
            paddingLeft: 0,
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: Configs_Default.Color.Background,
        },
        content: {
            flexDirection: "column",
            marginVertical: 10,
        },
        header: {
            marginBottom: 10,
            flexDirection: "row",
        },
        title: {
            flex: 1,
            fontSize: 18,
            marginLeft: 50,
            textAlign: "center",
            justifyContent: "center",
            alignSelf: "center",
            textAlign: "center"
        },
        footer: {
            marginBottom: 10,
            flexDirection: "column",
        },
        btnClose: {
            paddingHorizontal: 20,
            paddingVertical: 5,
            justifyContent: "center",
            alignItems: "flex-end",
            alignSelf: "center",
        },
        iconClose: {
            fontSize: 25
        },
        input: {
            height: 50,
            fontSize: 18,
            marginHorizontal: 20,
            paddingHorizontal: 20,
            borderWidth: 2,
            borderRadius: 10,
            color: Configs_Default.Color.COLOR_5,
            borderColor: Configs_Default.Color.Primary,
            backgroundColor: Configs_Default.Color.Background,
        },
        resend: {
            flexDirection: "row",
            justifyContent: "center"
        },
        btnSubmit: {
            backgroundColor: Configs_Default.Color.Primary,
            width: 100,
            fontSize: 18,
            paddingVertical: 15,
            marginTop: 5,
            marginBottom: 15,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 5
        },
        btnText: {
            color: Configs_Default.Color.Background
        },
        normal: {
            fontSize: 15,
            marginBottom: 0,
            marginRight: 10,
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
        },
        btnResend: {
            paddingVertical: 5,
            paddingHorizontal: 10,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
        },
        textResend: {
            fontSize: 16,
            color: Configs_Default.Color.Primary,
        },
        errorText: {
            color: "red",
            fontSize: 15,
            marginBottom: 5,
            textAlign: "center",
        }
    }),
};