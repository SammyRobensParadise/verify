import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-elements';

import theme from '../theme/theme';
import { useAuth } from '../../utils/auth/auth-context';
const NO_IMAGE: string = 'no-image';
const AvatarIcon = ({
    size
}: {
    size: 'small' | 'medium' | 'large' | 'xlarge';
}): JSX.Element => {
    const [Loading, isLoading] = useState(true);
    const [source, setSource] = useState('');
    const { state } = useAuth();
    useEffect(() => {
        if (state?.userInfo) {
            console.log(state.userInfo);
            setSource(state.userInfo.picture);
            isLoading(false);
        }
    }, []);

    const getAvatar = (
        size: 'small' | 'medium' | 'large' | 'xlarge'
    ): JSX.Element => {
        return source === NO_IMAGE ? (
            <Avatar rounded size={size ? size : 'small'} activeOpacity={0.7} />
        ) : (
            <Avatar
                rounded
                source={{
                    uri: source
                }}
                activeOpacity={0.7}
            />
        );
    };
    return Loading ? (
        <ActivityIndicator color={theme.colors.primaryPurple} />
    ) : (
        getAvatar(size)
    );
};

export default AvatarIcon;
