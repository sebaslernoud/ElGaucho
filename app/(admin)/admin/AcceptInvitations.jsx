import { useRouter } from 'expo-router';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');

const requests = [
    { id: '1', name: "Sebastian Lernoud", role: "Asistido", course: 'RELUL 2020'},
    { id: '2', name: "Pucho Lopez", role: "Tallerista", course:'RELUL 2022'},
    { id: '3', name: "Juan Maria Quotre", role: "Tallerista", course: 'RELAL 2023'},
    // Agrega más cursos aquí según sea necesario
];

const RequestList = () => {
    const router = useRouter();
    const renderItem = ({ item, index }) => {
        return(
        <View style={styles.blockItem}>
            <View style={styles.nameBoxItem}>
                <Text style={styles.nameItem}>{item.name}</Text>
                <TouchableOpacity style={styles.acceptButtom} title="Ir a Curso"
        onPress={() => router.push({ pathname: '/admin/AcceptInvitations', params: { screen: 'CourseAdmin' } })}>
                    <Image style={styles.acceptImage} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACT0lEQVR4nO2ZPWhUQRDHf36gYqJETIIgCBYpFEylWGos7GLIh502YpnYidjlo7EN2KZKlUo9GzttbMQk2mihpAqCKJyeMQGNriz8Hzww4e2+XPbtJfuDbY6ZnZm3s7szt5BIJLZCNzAFLAIrgAk8VoAFYBLoKhvECNCowHmzyfgODJUJ4q8meARcAtoITxtwGXgsX/4Agz7plK3EXeLhnnz6BnS6KEzlViI2avJtwkX4jYRtOsVGn3yzB0AhPyTcTnwckW829QvJTolYMa7+pUACYdKKBObgTliREeAjcLaVA7kIrMr2nVYN5CSwLLszBbLRBmIvubey+QI40IqB7AWeyN574JiDTpSBTMvWV6DHUSe6QG7Lzi8Vg65EFchV4Leat5ueuqaZgewD5oBb+HMGqMuG7X2oMpBhydgvOubhhO0+l6RrP8QeD91tS61R9dBW9oGD/CHgpeRfA4ddnAm1R24o1638Qx2nG2G//KzklnUBlsVs12a/BqxJxzq7fwOZ8Vxn1+sxd/BTqy/3z0tNaZRxXXtpHej3nLeS4/cC8EW6z1V6nAd+6jefQ6Hye+Qc8En6r4DPuf3TLEyoC/E08CE3z7NN9k1ZTMib/YQq2ndAB83FhC5RjgOnaD4mplprK5gUSGSYXbcijYj/xD6ae70qZFHC9qUoNq7It3kX4UkJ2+eu2Hgq32wRWkiXls7ouSsW7sunuu4oJ4ZyTVNN1W0Ve6Zd6ZSthPVpwHeSQT08mkhGvUwQGZ16eJzPPcmFHA21xeM+6ZRIJPiPfwtEbQPoqffwAAAAAElFTkSuQmCC'}}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.courseBoxItem}>
                <Text style={styles.roleItem}>{item.course}{"    "}{item.role}</Text>
                <TouchableOpacity style={styles.denyButtom} >
                    <Image style={styles.denyImage} source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADnUlEQVR4nO2aSU8UURDHf0aEMRiRQUBvcjQY9UuooKjIze2m0YtL0KvLGT2ZmPA5NEggUYMrAu6JAsrJ5aLx5ghRM6biv5MKztLd07NI+CedDLyq6nqv6tWrqtewjKWLNNALXAGGgGngG7Cgx36/1ZjR7AeaqRGkgKPAKPAbyEZ8fgEjwBGgoRoTWA2cAz47peaBO8AFWWazVnyVnmb9z8YuAnfFE/B/Avq1OBXBHmDOKTAJHAOaYshaBxwHppy890A3ZYSt1KB74VNgZ4Lyu4DnTv71clhngxS3F3wHTgErk34Jf2WeATLO2u1JCe+QubOKOlsoP7YCM3rnO+lQElqdwAlgPZVDM/BA756TV8RCyrnTI6CRyqMRGHduFmvPDDp3ssOuWmhxXmEBIHKIDTZ2JfZEmD2TkU4W3UIfdsE5YdGpVnDWbf5QLnbenRPlCLFxUQe8kG42qYJoUKpgxDuoPeyWbp+LWeWIixBhcU8pRlsMxdpk+fsh6Ve4SHqoEOGoiCx3CosJ8byOOJk28Rjvkwh8J8QznI8grbR6PmIC6BUKO5k4PP6gtPrmZz49D0jwbeJlAK/cubMxAm2cE3tM/HtzDV7VoNUTcRBmlUuxhMdlyRggB4Y0uI/4KGSZJCyx2HtukAOzGrQqrhTkWvWkLBGgU7KsL/APvmrQcptSsVjxJCeBsnCT94UcWNBgPcnAu1IS7rT44A76BFWZSKFoFgUFJ7JkXGt2qWz2IQ1aBzAuCoXYKIdmMfQVCr/BgWjNs//6QOzVoHULoyLKYZeEZcbE35MvGQuSRusA1mrSmHZJ49p8RCMSbm3MsJhMII23UiAsTornViGiwyKyQiksHpdYWE1JRhhYYfVMOh4sdtB8FOEuag890u1DmGuIfhE/q8Hmw0vpdjoMQ8r1eq2hXCvol04zUS6FusWUUXOs2tgO/JBOka8yrrsVSCL/iotWNeVMl2txBKRcaB2vUhN7jTosQaeloZTVmHax3v6uFNLAQ3cdV/KFT4czrbnZNiqzJ97pnZaVb0pKcLtzs4x6rxYOk0adotMP505J1C//7JkgAGTVUE7q9nWFrjJeOvnXyn333uXMHnTtT8T8iiGt3ClIO7JypSRvi4ta56xLZ7LKSC29vqS+U6fCdr2eFl0a9YlmzPUJgrTjdLW+gGhQV3xYJUA24vNTlenBak0gF5rUi7Wq7aaKpq/uoxr7/Ubl6YBo89YTy+A/xx+3026HVKnF7QAAAABJRU5ErkJggg=='}}></Image>
                </TouchableOpacity></View>
        </View>
        )
    };
  
    return (
      <FlatList style = {styles.coursesList}
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    );
};


const AcceptInvitations = (props) => {

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Aceptar participantes</Text>
            </View>
            <View style = {styles.bigBlock}>
                <View style = {styles.requestTitleContainer}>
                    <Text style={styles.requestTitle}>Solicitudes</Text>
                </View>
                <View style = {styles.requestsContainer}>
                    <RequestList></RequestList>
                </View>
            </View>

        </View>
    )

};

const styles = StyleSheet.create({
    titleContainer:{
        alignItems:'center',
        marginTop:35
    },
    title:{
        fontSize:25
    },
    bigBlock:{
        marginTop:40    ,
        width:0.9*width,
        height:0.7*height,
        backgroundColor:"white",
        alignSelf:'center',
        borderRadius:9
    },
    requestTitleContainer:{
        alignItems:'center',
        marginTop:20,
    },
    requestTitle:{
        fontSize:20
    },
    blockItem:{
        backgroundColor:"lightblue",
        marginTop:30,
        marginBottom:15,
        height:90,
        marginLeft: 15,
        marginRight: 15,
        borderRadius:9
    },
    nameBoxItem:{
        flexDirection: 'row', // Poner en horizontal
        marginBottom:15,
        marginTop:10,
        alignSelf:'center'
    },
    courseBoxItem:{
        flexDirection: 'row',
        alignSelf:'center'
    },
    acceptImage:{
        width:30,
        height:30,
    },
    denyImage:{
        width:30,
        height:30,
    },
    acceptButtom:{
        marginLeft:50
    },
    denyButtom:{
        marginLeft:35
    }
});



export default AcceptInvitations;