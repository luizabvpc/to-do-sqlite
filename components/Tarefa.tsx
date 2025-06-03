import { SQLiteDatabase } from "expo-sqlite";
import _tarefa from "../types/tarefa";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";

type _propsTarefa = {
    dados: _tarefa,
    db: SQLiteDatabase,
    recarregar: any
};

export default function Tarefa(props: _propsTarefa) {

    const concluir = async () => {
        await props.db.runAsync("UPDATE tarefas SET concluido=1 WHERE id=?", props.dados.id);
        await props.recarregar();
    };

    const excluir = async () => {
        await props.db.runAsync("DELETE FROM tarefas WHERE id=?", props.dados.id);
        await props.recarregar();
    };

    const renderStatus = () => {
        if (props.dados.concluido)
            return <Text style={styles.textoConcluido}>✓</Text>;
        return (
            <TouchableOpacity onPress={concluir} style={styles.botaoConcluir}>
                <Text style={styles.textoBotaoConcluir}>Concluir</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.containerTarefa}>
            <View style={styles.linhaTarefa}>
                <Text style={styles.textoTarefa}>{props.dados.texto}</Text>
                {renderStatus()}
            </View>
            <TouchableOpacity onPress={excluir} style={styles.botaoExcluir}>
                <Text style={styles.textoBotaoExcluir}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTarefa: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ffb6c1',
        paddingTop: 10,
        paddingBottom: 10,

    },
    linhaTarefa: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    textoTarefa: {
        fontSize: 16,
        flex: 1,
    },
    botaoConcluir: {
        backgroundColor: '#fce083',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    textoBotaoConcluir: {
        color: '#d49708',
        fontWeight: 'bold',
        fontSize: 15
    },
    textoConcluido: {
        backgroundColor: '#028900',
        color: '#bada55',
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        fontWeight: 'bold',
    },
    botaoExcluir: {
        backgroundColor: '#b787cc',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        width: '28%',
        marginLeft: 265,
        
    },
    textoBotaoExcluir: {
        color: '#660066',
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center',
        borderRadius: 5,
        fontWeight: 'bold'
    }
});
