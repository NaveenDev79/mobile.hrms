import {View, Text} from 'react-native'
import React from 'react'
import {images} from '../constants'
import {Image} from 'react-native'

const AuthBanner = () => {
    return (
        <View className="w-full relative z-20 h-full">
            <Image
                className="w-full absolute right-10 scale-150 bottom-14 z-20 h-full "
                resizeMode='cover'
                source={images.authbanner}/>
        </View>
    )
}

export default AuthBanner
