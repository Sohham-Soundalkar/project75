import * as React from 'react';
import {Text, View, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import db from '../config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppHeader from '../appheader';
import {SearchBar} from 'react-native-elements'

export default class ReadStoryrscreen extends React.Component{
    constructor(){
        super();
        this.state={
            allStories: [],
            dataSource: [],
            search: ''
        }
    }

    componentDidMount(){
        this.retrieveStories()
    }

    updateSearch=search=>{
        this.setState({search})
    }

    retrieveStories=()=>{
        try {
            var allStories = []
            var stories = db.collection("stories")
            .get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    allStories.push(doc.data())
                    console.log('This are the stories', allStories)
                })
                this.setState({allStories})
            })
        }
        catch(error){
            console.log(error);
        }
    };

    SearchFilterFunction(text) {
        const newData = this.state.allStories.filter((item)=> {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          dataSource: newData,
          search: text,
        });
      }

  render(){
      return(
        <SafeAreaProvider style ={styles.container}>
        <AppHeader/>
       <View styles ={{height:20,width:'100%'}}>
           <SearchBar
           placeholder="Type Here..."
           onChangeText={text => this.SearchFilterFunction(text)}
           onClear={text => this.SearchFilterFunction('')}
           value={this.state.search}
         />
       </View>
       
       <FlatList
             data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
             renderItem={({ item }) => (
               <View style={styles.itemContainer}>
                 <Text>  Title: {item.title}</Text>
                 <Text>  Author : {item.author}</Text>
               </View>
             )}
             keyExtractor={(item, index) => index.toString()}
             /> 
     </SafeAreaProvider>  
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: 'pink',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    itemContainer: {
        height: 80,
        width: '100%',
        borderWidth: 2,
        borderColor: 'pink',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    searchBar:{
        flexDirection: 'row',
        height: 45,
        width: 'auto',
        borderWidth: 0.5,
        alignItems: 'center',
        backgroundColor: 'yellow'
      },
      bar:{
        borderWidth: 2,
        height: 35,
        width: 300,
        paddingLeft: 10
      },
      searchButton:{
        borderWidth: 1,
        height: 35,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
      }
});

// to ishuend ({123}) hiii1122888 dhirfi228768 number 222 jehd9 sjdh6 oojj  6 6 jiick8 exxampl e 6 hhii99
