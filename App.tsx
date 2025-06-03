import { StatusBar } from 'expo-status-bar';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';
import _tarefa from './types/tarefa';
import Tarefa from './components/Tarefa';

const db = SQLite.openDatabaseSync("to-do.sqlite");

export default function App() {

  const [novaTarefa, setNovaTarefa] = useState<string>('');
  const [tarefas, setTarefas] = useState<_tarefa[]>([]);

  useEffect(
    () => {
      db.execSync(`CREATE TABLE IF NOT EXISTS tarefas (
              id INTEGER PRIMARY KEY NOT NULL,
              texto VARCHAR(100),
              concluido INTEGER DEFAULT 0
        )`);
        recarregar();
    }
  , []);


  const recarregar = async () => {
    let temp : _tarefa[] = await db.getAllAsync("SELECT * FROM tarefas");
    setTarefas(temp);
  }

  const adicionar = async() => {
    if(novaTarefa == ""){
      Alert.alert("Insira um texto!");
      return;
    }

    await db.runAsync(`INSERT INTO tarefas 
      (texto) VALUES (?)`, novaTarefa);

    setNovaTarefa('');
    await recarregar();
  }

  const renderLista = () =>{
    let t = tarefas.map(t => 
            <Tarefa 
                dados={t} 
                db={db} 
                recarregar={recarregar} 
                key={t.id}/>
          );
    return t;
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={novaTarefa} onChangeText={setNovaTarefa} />
      <TouchableOpacity onPress={adicionar} style={styles.botao}>
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>
      <ScrollView>
        {renderLista()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    alignSelf: 'center',
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#e0f5ee',
    borderColor: '#66cdaa',
    color: '#1f493d',
  },
  container:{
    flex: 1,
    paddingTop: 350,
    backgroundColor: '#fedcd3',
    gap: 10,
  },
  
  botao:{
    backgroundColor: '#66cdaa',
    paddingVertical: '5%',
    paddingLeft: 10,
    width:'60%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: '5%',
     alignSelf: 'center', 
  },
  textoBotao:{
    color: '#007667',
    fontWeight: 'bold',
    fontSize: 15
  }
});
