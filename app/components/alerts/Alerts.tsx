import { Alert } from 'react-native';

export interface ButtonsProps {
    title: string;
    event: VoidFunction;
    style: 'default' | 'cancel' | 'destructive' | undefined;
}

export interface ButtonAlertProps {
    title: string;
    message: string;
    buttons: Array<ButtonsProps>;
}

export const createOneButtonAlert = ({
    buttons,
    title,
    message
}: ButtonAlertProps): void =>
    Alert.alert(
        title,
        message,
        [
            {
                text: buttons[0].title,
                onPress: buttons[0].event,
                style: buttons[0].style
            }
        ],
        { cancelable: false }
    );

export const createTwoButtonAlert = ({
    buttons,
    title,
    message
}: ButtonAlertProps): void =>
    Alert.alert(
        title,
        message,
        [
            {
                text: buttons[0].title,
                onPress: buttons[0].event,
                style: buttons[0].style
            },
            {
                text: buttons[1].title,
                onPress: buttons[1].event,
                style: buttons[1].style
            }
        ],
        { cancelable: false }
    );

export const createThreeButtonAlert = ({
    buttons,
    title,
    message
}: ButtonAlertProps): void =>
    Alert.alert(
        title,
        message,
        [
            {
                text: buttons[0].title,
                onPress: buttons[0].event,
                style: buttons[0].style
            },
            {
                text: buttons[1].title,
                onPress: buttons[1].event,
                style: buttons[1].style
            },
            {
                text: buttons[2].title,
                onPress: buttons[2].event,
                style: buttons[2].style
            }
        ],
        { cancelable: false }
    );
