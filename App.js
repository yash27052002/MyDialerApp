import React from 'react';
import { Button, NativeModules, Platform, PermissionsAndroid, Alert } from 'react-native';

const { DialerModule } = NativeModules;

const requestCallPhonePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CALL_PHONE,
                {
                    title: 'Phone Call Permission',
                    message: 'This app needs access to make phone calls.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true;
};

const App = () => {
    const makeDefaultDialer = async () => {
        if (Platform.OS === 'android') {
            DialerModule.requestDefaultDialerRole((response) => {
                console.log(response);
                Alert.alert('Request sent to make default dialer');
            });
        }
    };

    const dialNumber = async () => {
        const hasPermission = await requestCallPhonePermission();
        if (hasPermission) {
            DialerModule.dialNumber('1234567890');
        } else {
            Alert.alert('Permission Denied', 'Cannot make calls without permission.');
        }
    };

    return (
        <><Button title="Request Default Dialer" onPress={makeDefaultDialer} /><Button title="Dial Number" onPress={dialNumber} /></>
    );
};

export default App;
