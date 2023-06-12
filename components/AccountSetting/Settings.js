import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Switch, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, FONTS, SIZES, images } from '../../constants'
import FeatherIcon from 'react-native-vector-icons/Feather';

const Settings = ({ navigation }) => {
    const SECTIONS = [
        {
            header: 'Preferences',
            icon: 'settings',
            items: [
                { icon: 'globe', color: '#fe9400', label: 'Language', type: 'link' },
                {
                    icon: 'moon',
                    color: '#007afe',
                    label: 'Dark Mode',
                    value: false,
                    type: 'boolean',
                },
                {
                    icon: 'wifi',
                    color: '#007afe',
                    label: 'Use Wi-Fi',
                    value: false,

                    type: 'boolean',
                },
                { icon: 'navigation', color: '#32c759', label: 'Location', type: 'link' },
                {
                    icon: 'users',
                    color: '#32c759',
                    label: 'Show collaborators',
                    value: false,
                    type: 'boolean',
                },
                {
                    icon: 'airplay',
                    color: '#fd2d54',
                    label: 'Accessibility mode',
                    value: true,
                    type: 'boolean',
                },
            ],
        },
        {
            header: 'Help',
            icon: 'help-circle',
            items: [
                { icon: 'flag', color: '#8e8d91', label: 'Report Bug', type: 'link' }

            ],
        },
        {
            header: 'Content',
            icon: 'align-center',
            items: [
                { icon: 'save', color: '#32c759', label: 'Saved', type: 'link' },
                { icon: 'download', color: '#fd2d54', label: 'Downloads', type: 'link' },
            ],
        },
    ];

    return (
        <LinearGradient style={{ flex: 1 }} colors={['rgba(137,215,188,0.4)', 'rgba(153,195,217,0.4)']}>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.container}>
                    <View >
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            padding: 20,
                        }}>Settings </Text>
                    </View>

                    {SECTIONS.map(({ header, items }) => (
                        <View style={styles.section} key={header}>
                            <Text style={styles.sectionHeader}>{header}</Text>
                            {items.map(({ label, icon, type, value, color }, index) => {
                                return (
                                    <TouchableOpacity
                                        key={label}
                                        onPress={() => {
                                            // handle onPress
                                        }}>
                                        <View style={styles.row}>
                                            <View style={[styles.rowIcon, { backgroundColor: color }]}>
                                                <FeatherIcon color="#fff" name={icon} size={18} />
                                            </View>

                                            <Text style={styles.rowLabel}>{label}</Text>

                                            <View style={styles.rowSpacer} />

                                            {type === 'boolean' && <Switch value={value} />}

                                            {type === 'link' && (
                                                <FeatherIcon
                                                    color="#0c0c0c"
                                                    name="chevron-right"
                                                    size={22}
                                                />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    section: {
        paddingHorizontal: 24,
    },
    sectionHeader: {
        paddingVertical: 12,
        fontSize: 12,
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: 1.1,
    },
    profile: {
        padding: 24,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999,
    },
    profileAvatarWrapper: {
        position: 'relative',
    },
    profileAction: {
        position: 'absolute',
        right: -4,
        bottom: -10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 9999,
        backgroundColor: '#007bff',
    },
    profileName: {
        marginTop: 20,
        fontSize: 19,
        fontWeight: '600',
        color: '#414d63',
        textAlign: 'center',
    },
    profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
    },
    rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 9999,
        marginRight: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '400',
        color: '#0c0c0c',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});