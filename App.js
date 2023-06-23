
import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, SafeAreaView, ActivityIndicator, View, Text, FlatList, Image} from 'react-native';
import filter from "lodash.filter";

const API_ENDPOINT = 'https://fakestoreapi.com/products';

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [error, setError] = useState(null);
  consta [ fullData, setFullData] = useState([]);

  useEffect(()=> {
    setIsLoading(true);
    fetchData(API_ENDPOINT);
  }, []);

  const fetchData = async(url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);

      console.log(json.results);
      setFullData(json.results)
      setIsLoading(false);
    }
    catch(error){
      setError(error);
      console.log(error);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase;
    const filterredData = filter(fullData, (user) =>{
      return codegenNativeCommands(user, formattedQuery);
    });
    setData(filterredData);
  };

  const contains = ({title, category, query}) => {
    if(title.includes(query) || category.includes(query))
    {
      return true;
    }
    return false;

  }


    if(isLoading){

      return(
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'} />
        </View>
      )

    }

    if(error){
      <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <Text>
          Error in fetching Data. Please check your internet connection
          </Text>
      </View>

    }


  return (
    <SafeAreaView style={{flex:1,marginHorizontal:20}}>
      <TextInput placeholder='Search'
       clearButtonMode='always'
       style={styles.SearchBox}
       autoCapitalize='none'
       autoCorrect={false}
       value={searchQuery}
       onChangeText={(query) => handleSearch(query)}
       />

       <FlatList
        data={data}
        keyExtractor={(item) =>item.id}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image source={{url: item.image}} style={styles.image}/>
            <View>
              <Text style={styles.textTitle}>{item.title}</Text>
              <Text style={styles.textPrice}>{item.price}</Text>
              <Text style={styles.textDesc}>{item.description}</Text>
              <Text style={styles.textCat}>{item.category}</Text>
              <Text style={styles.textRate}>{item.rating.rate}</Text>
              <Text style={styles.textRate}>{item.rating.count}</Text>
            </View>
          </View>
        ) }/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SearchBox: {paddingHorizontal:20,
    paddingVertical:10,
    borderWidth:1,
    borderRadius:8,
},
itemContainer:{
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 10,
  marginTop: 10,
},

image: {
  width: 50,
  height: 50,
  borderWidth: 25,
},

textTitle: {
  fontSize: 17,
  marginLeft: 10,
  fontWeight: '600',
},
textPrice: {
  fontSize: 13,
  marginLeft: 10,
  fontWeight: '600',
},
textDesc: {
  fontSize: 12,
  marginLeft: 10,
  fontWeight: '600',
},
textCat: {
  fontSize: 13,
  marginLeft: 10,
  fontWeight: '600',
},
textRate: {
  fontSize: 15,
  marginLeft: 10,
  fontWeight: '600',
}
});
