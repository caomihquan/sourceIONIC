import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, Share, } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { IPConfig } from '../../../IPConfig';
import { Configs } from '../../../AppConfig';
import { connect } from 'react-redux';
import { CommonHandler, HrmNotification } from '../SharedConfig';
import HrmI18n from '../../../i18n/HrmI18n';
import { CommonConst, HrmNavigation } from '../../../libs/HrmLibs';

class ModalAttchFile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filePreviewText: '',
        }
    }

    downloadFile = async (v) => {
        const fileName = CommonHandler.ConvertViToEn(v.FileName);
        let fileLocation = FileSystem.documentDirectory + fileName.replace(/\?|\^/g, '').replace(/\s/g, '_');
        const sessionID = this.props.SessionID;
        const url = IPConfig.IP + 'Export/AttactmentFile?ss=' + sessionID + '&token=' + v.ID;
        const { status } = await MediaLibrary.getPermissionsAsync();
        if (status !== 'granted') {
            await MediaLibrary.requestPermissionsAsync();
        }

        HrmNotification.Toast(HrmI18n.t('NOTIFY.StartDownloading'));
        FileSystem.downloadAsync(url, fileLocation)
            .then(async ({ uri }) => {
                HrmNotification.Toast(HrmI18n.t('NOTIFY.FinishDownloading'));

                if (Platform.OS != "ios") {
                    const asset = await MediaLibrary.createAssetAsync(uri);
                    await MediaLibrary.createAlbumAsync("SureHCS", asset, false);

                    // Sharing the downloded file
                    Sharing.shareAsync(fileLocation);
                }
                else {
                    const result = await Share.share({ url: uri });
                }
            })
            .catch(error => console.log(error));
    }

    openFile = async (uri) => {
        FileSystem.readAsStringAsync(uri)
            .then((fileContents) => {
                HrmNavigation.navigate(CommonConst.SCENE.Read, { data: fileContents });
            });
    }

    render() {
        return (
            <View>
                <Modal animationType="slide" transparent={true} visible={this.props.showModal} style={styles.modal}>
                    <View style={styles.modalWrapper}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity style={styles.btnCancel} onPress={this.props.closeModal}>
                                    <Text style={styles.btnCancelText}>Đóng</Text>

                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalContent}>
                                <Container>
                                    <Content>
                                        <View style={styles.title}>
                                            <Text>{HrmI18n.t("BUSINESS_TRIP.ListAttachment")}</Text>
                                        </View>
                                        {this.props.listFiles.length > 0 ?
                                            (this.props.listFiles.map((v, i) => {
                                                return (
                                                    <View style={styles.itemWrapper} key={i}>
                                                        <View style={styles.itemFile}>
                                                            <View style={styles.leftItem}>
                                                                <Text style={styles.textFile}>
                                                                    {v.FileName}
                                                                </Text>
                                                            </View>
                                                            <View style={styles.rightItem}>
                                                                <TouchableOpacity style={styles.btnDowload}
                                                                    onPress={() => this.downloadFile(v)}
                                                                >
                                                                    <Icon style={styles.iconDowload} name="download" />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                )
                                            }))
                                            :
                                            (<View style={styles.noData}>
                                                <Text>{HrmI18n.t("COMMON.NoDataFound")}</Text>
                                            </View>)
                                        }
                                    </Content>
                                </Container>
                            </View>
                        </View>
                    </View>
                </Modal >
            </View>
        )
    }
}
const mapStateToProps = state => ({
    LoginInfo: state.loginInfo
});
export default connect(mapStateToProps)(ModalAttchFile);
const styles = Configs.Theme.Styles.Screens.News;