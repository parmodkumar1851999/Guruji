import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Colors from '../Constants/Colors'


const AppWapper = ({children,containerProps}) => {
  return (
    <View style={{...styles.container,...containerProps}}>
        <SafeAreaView>
     {children}
        </SafeAreaView>
    </View>
  )
}

export default AppWapper

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.White,
    }
})