import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

import { useUser } from "../../../../context/UserContext";
import { useTranslation } from '../../../../hooks/useTranslations';
import AccountEditModal from "../../AccountEditModal/AccountEditModal";
import MyAccountInput from "../MyAccountInput/MyAccountInput";
import config from "../../../../config/env.config";

export default function MyAccountSection({ section }) {
    const { user, updateProfileImage } = useUser();
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const sectionTitles = {
        personalData: t("title_personal_data"),
        shippingData: t("title_shipping_data"),
        password: t("title_password"),
    };

    const openEditModal = () => setIsModalOpen(true);
    const closeEditModal = () => setIsModalOpen(false);

    const defaultAddress = user?.addresses?.find(addr => addr.isDefault);

    const isEditingAddress = section === "shippingData";
    const isEditingPersonalData = section === "personalData";

    const userDataToEdit = isEditingPersonalData
        ? user
        : isEditingAddress && defaultAddress
            ? { ...defaultAddress, userId: user._id }
            : null;

    const handleAvatarClick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            handleImageChange(result.assets[0]);
        }
    };

    const handleImageChange = async (image) => {
        setIsUploading(true);
        // This part needs to be adapted. `updateProfileImage` expects a file object.
        // We need to create a FormData object to upload the image.
        const localUri = image.uri;
        const filename = localUri.split('/').pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        formData.append('profileImage', { uri: localUri, name: filename, type });

        const result = await updateProfileImage(formData); // Assuming updateProfileImage can handle FormData
        
        setIsUploading(false);

        if (result.success) {
            Alert.alert('Success', t('myaccount_edit_profile_image_success'));
        } else {
            Alert.alert('Error', t('myaccount_edit_profile_image_error'));
        }
    };

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}>{sectionTitles[section]}</Text>
                {section === "personalData" || section === "password" ? (
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={openEditModal}>
                        <Icon name="pencil-square-o" size={24} color="#333" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('UserAddresses')}>
                        <Text style={styles.addressesButton}>{t('myaccount_addresses_button')}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {user && (
                <View style={styles.sectionContent}>
                    {isEditingPersonalData && (
                        <>
                            <View style={styles.avatarContainer}>
                                {isUploading ? (
                                    <ActivityIndicator size="large" color="#000" />
                                ) : (
                                    user.profileImage ? (
                                        <Image
                                            source={{ uri: `${config.FILES_URL}/${user.profileImage}` }}
                                            style={styles.avatarImage}
                                        />
                                    ) : (
                                        <Icon name="user-circle" size={80} color="#ccc" />
                                    )
                                )}
                                <TouchableOpacity
                                    style={styles.avatarEditButton}
                                    onPress={handleAvatarClick}
                                    disabled={isUploading}
                                >
                                    <Icon name="camera" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <MyAccountInput label={t('checkout_user_name')} value={`${user.name} ${user.lastName}`} />
                            <MyAccountInput label={t('myaccount_profile_section_email_label')} value={user.email} />
                            <MyAccountInput label="DNI" value={user.dni} />
                        </>
                    )}

                    {isEditingAddress && defaultAddress && (
                        <>
                            <MyAccountInput
                                label={t('myaccount_profile_section_address_label')}
                                value={`${defaultAddress.street}, ${defaultAddress.neighborhood}`}
                            />
                            <MyAccountInput label={t('myaccount_profile_section_province_label')} value={defaultAddress.province} />
                            <MyAccountInput label={t('myaccount_profile_section_zipcode_label')} value={defaultAddress.zipCode} />
                        </>
                    )}

                    {section === "password" && (
                        <MyAccountInput label={t('myaccount_profile_section_password_label')} value="********" />
                    )}
                </View>
            )}

            {isModalOpen && userDataToEdit && (
                <AccountEditModal
                    closeModal={closeEditModal}
                    userData={userDataToEdit}
                    isAddress={isEditingAddress}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    editButton: {
        padding: 5,
    },
    addressesButton: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    sectionContent: {
        // Add styles if needed
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarEditButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 8,
        borderRadius: 15,
    },
});