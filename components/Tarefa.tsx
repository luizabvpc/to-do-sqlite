import { SQLiteDatabase } from "expo-sqlite"
import _tarefa from "../types/tarefa"
import { Button, Text, View, StyleSheet, TouchableOpacity, TextComponent } from "react-native"

type _propsTarefa = {
    dados: _tarefa,
    db: SQLiteDatabase,
    recarregar: any
}

export default function Tarefa(props: _propsTarefa) {

    const concluir = async()=>{
        await props.db.runAsync("UPDATE tarefas SET concluido=1 WHERE id=?", props.dados.id);
        await props.recarregar();
    }

    const excluir = async()=>{
        await props.db.runAsync("DELETE FROM tarefas WHERE id=?", props.dados.id);
        await props.recarregar();
    }

    const renderStatus = () => {
        if (props.dados.concluido)
            return <Text style={styles.textoConcluido}>✓</Text>;
        return <TouchableOpacity onPress={concluir} style={styles.botaoConcluir}>
                    <Text style={styles.textoBotaoConcluir}>Concluir</Text>
                </TouchableOpacity>;
    }

    return <View>
        <Text style={styles.textoTarefa}>{props.dados.texto}</Text>
        {renderStatus()}
        <TouchableOpacity onPress={excluir} style={styles.botaoExcluir}>
            <Text style={styles.textoBotaoExcluir}>Excluir</Text>
        </TouchableOpacity>;
    </View>;
}
const styles = StyleSheet.create({
    botaoConcluir:{
        backgroundColor: '#fce083',
        paddingVertical: '5%',
        paddingLeft: 10,
        width:'60%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '5%',
        alignSelf: 'center', 
    },
  textoBotaoConcluir:{
        color: '#d49708',
        fontWeight: 'bold',
        fontSize: 15
  },
  textoConcluido:{
     alignSelf: 'center', 
     backgroundColor: '#028900',
     color: '#bada55',
     width: '10%',
     textAlign: 'center',
     borderRadius: 5,
     fontWeight: 'bold',
  },
   botaoExcluir:{
        backgroundColor: '#b787cc',
        paddingVertical: '5%',
        paddingLeft: 10,
        width:'60%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '5%',
        alignSelf: 'center', 
    },
  textoBotaoExcluir:{
        color: '#660066',
        fontWeight: 'bold',
        fontSize: 15
  },
  textoTarefa:{
    alignSelf: 'center',
  }
});
