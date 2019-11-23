import React, {useState, useEffect} from "react";
import {View,Text,ScrollView, Image, TouchableOpacity, Button} from 'react-native';
import axios from 'axios'
import styles from '../styles/individualRecipeStyles.js'
import editIcon from '../assets/edit_icon.png';
import clock from '../assets/timer.png';
import logo from '../assets/background.png';
import IndividualRecipeIngredients from './individualRecipeIngredients';
import placeholder from '../assets/recipe-image-placeholder.png';
import styled from 'styled-components';

const Innovator = styled.View`
    flexDirection : row;
`;

const CookTime = styled.View`
    flexDirection : row;
`;


const IndividualRecipe = props => {
    const [recipe, setRecipe] = useState([])
    const [color, setColor] = useState({active: 'Ingredients'})
    const id =  props.navigation.getParam('recipeID', 'params not passed')
    console.log('id from navigation in <IndividualRecipe>', id);

    useEffect(() =>{
       // console.log('useEffect navigation props in <IndividualRecipe/>', props.navigation);
        axios.get(`https://recipeshare-development.herokuapp.com/recipes/${id}`)
        .then(res => setRecipe(res.data))
        .catch(err => console.log(err));
    },[id]);


    const tabsDisplay = (cat) => {
        const newActive= cat
        setColor({active: newActive})
      }

      const capitalize = (string) => {
        const newString = string.replace(/^\w/, c => c.toUpperCase());
        return newString
      }

    const navigateToEdits = () => {
        props.navigation.navigate('Edit', {recipe} )
    }

    return (
     <ScrollView>

            <Image source={recipe.img ? {uri : recipe.img} : placeholder} style={styles.placeholder} />

            <Text style={styles.title}>{recipe.title}</Text>

            <View style={styles.innovatorTime}>
                <Innovator>
                    <Image source={logo} style={styles.icon}/> 
                    <Text>{recipe.innovator_name}</Text>
                </Innovator>

                <CookTime>
                    <Image source={clock} style={styles.icon}/> 
                    <Text>{recipe.minutes} minutes</Text>
                </CookTime>
            </View>


            
         <Text style={styles.tags}>Tags</Text>
             <View style={{borderBottomWidth: 0.3, borderBottomColor: '#6B6F70',}}>
         <View style={styles.tagBox}>
        {recipe.categories && recipe.categories.map( cat => {
            return(
                <View key={cat}>
                    <Text style={styles.individualTags}>{capitalize(cat)}</Text>
                </View>
            )
        })}
        </View>
        </View>

        <TouchableOpacity onPress={navigateToEdits}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.editButtonView}>
        <Image source={editIcon} style={styles.editButton}/> 
        </View>
            <Text style={{marginLeft: 10}}>Make changes to recipe</Text>
        </View>
        </TouchableOpacity>
        
        <View style={styles.ingredients}> 
            <TouchableOpacity onPress={() => tabsDisplay('Ingredients')}>
                <View style={color.active.includes('Ingredients') ? styles.titlesViewBorderIng : styles.titlesViewBorderIngOff}>
                    <Text style={color.active.includes('Ingredients') ? styles.titlesColorWhite : styles.titlesColorBlue}>Ingredients</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => tabsDisplay('Instructions')}>
                <View style={color.active.includes('Instructions') ? styles.titlesViewBorderInstOn : styles.titlesViewBorderInst}>
                    <Text style={color.active.includes('Instructions') ? styles.titlesColorWhite : styles.titlesColorBlue}>Instructions</Text>
                </View>
            </TouchableOpacity>
        </View >
        <View style={styles.details}>
      {recipe.ingredients && recipe.ingredients.map( ing => { return <IndividualRecipeIngredients ing={ing} key={ing.name}color={color}/>})}
         
         {recipe.steps && recipe.steps.map( (step, index) => {
            return(
                <View key={index} style={color.active.includes('Ingredients') ? styles.hidden : styles.stepTextView}>
                        {/* .split('.')[0] */}
                    <Text style={styles.stepText}>{step.ordinal}. {step.body}</Text>
                </View>
            )
        })}
        <View style={{paddingRight:'80%'}}>
        <Text style={ color.active.includes('Ingredients') ? styles.hidden : styles.notes}>NOTES</Text>
       </View>
        <Text style={ color.active.includes('Ingredients') ? styles.hidden :styles.stepTextView}>{recipe.notes}</Text>
        </View>

    </ScrollView>
    );
  };

  export default IndividualRecipe;




//   const im = ()=>{
    //     if(recipe.img==null){
    //         return(
    //             <Image source={placeholder}
    //             style={{width: '100%', height: 345}} />
    //         )
    //     }else{
    //         return(
    //             <Image source={{uri: recipe.img}}
    //             style={{width:'100%', height: 345}} />
    //         )
    //     }
    // }