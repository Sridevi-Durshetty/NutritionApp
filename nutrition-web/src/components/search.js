import React, { Component } from 'react';
import * as urls from '../api/endpoints';
import {
    apiCallGet, apiCallPost, apiCallPut, apiCallDelete
} from '../api/api-calls';
import FoodDetails from './food-details';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/styles';
import '../styles/autocomplete.css'
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const styles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 300,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
}));

class Search extends Component {
    
    state = {
        // commonFood: {
        //     common_type: null,
        //     food_name: '',
        //     locale: '',
        //     photo: { thumb: '' },
        //     serving_qty: '',
        //     serving_unit: '',
        //     tag_id: '',
        //     tag_name: ''
        // },
        // brandedFood: {
        //     brand_name: '',
        //     brand_name_item_name: '',
        //     brand_type: 0,
        //     food_name: '',
        //     locale: '',
        //     nf_calories: 0,
        //     nix_brand_id: '',
        //     nix_item_id: '',
        //     photo: { thumb: '' },
        //     region: 0,
        //     serving_qty: 0,
        //     serving_unit: ''
        // },
        commonFoodList: [],
        brandedFoodList: [],
        isFoodDetailOpen:false,
        //selectedFood:null,
        selectedFoodName:'',
        food:{
            type:'',
            food_name:'',
            thumb:''
        },
        foodList:[],
        // The active selection's index
        activeSuggestion: 0
    }

   constructor(props){
       super(props)
   }
     
    getFoodByName = (e) => {
        console.log("ful url:", urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value)
        apiCallGet(urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value,'')
            .then(foods => {
               console.log("foods :", foods.data["common"].slice(0,5))
               console.log("foods :", foods.data["branded"].slice(0,5))
            //    for(var i= 0 ; i<5;i++){
            //     console.log("name :", foods.data["common"][i]["food_name"])
            //     console.log("image :", foods.data["common"][i]["photo"]["thumb"])
                this.setState({
                    commonFoodList:foods.data["common"].slice(0,5),
                    brandedFoodList:foods.data["branded"].slice(0,5),
                    activeSuggestion: 0
                })
               
              // }
               
            //    console.log("foods :", foods.data["branded"].length)
            //     this.setState({
            //         isFoodDetailOpen:false,
            //         commonFoodList: foods.data["common"],
            //         brandedFoodList: foods.data["branded"]
            //     })
                // this.setState(state=>{
                //     const lst= state.food.type
                // })
            })
    }
    // handleFoodDetailClick=(selFood)=>{
    //     console.log("sel food :",selFood)
    //     this.setState({
    //         isFoodDetailOpen:true,
    //         selectedFood:selFood
    //     })
    // }
    handleFoodName=(fName)=>{
        console.log("sel food name :",fName)
        this.setState({
            isFoodDetailOpen:true,
            selectedFoodName:fName,
            activeSuggestion: 0
        })
    }

    render() {     
        const { classes } = this.props;  
        const { commonFoodList, brandedFoodList,isFoodDetailOpen, selectedFoodName,activeSuggestion } = this.state
        const commonFood = commonFoodList.map(c => <div>
            <Button onClick={()=>this.handleFoodName(c.food_name)} value={c.food_name} color="primary">{c.food_name}</Button>
        </div>)
        const brandedFood = brandedFoodList.map(b => <div>      
             <Button onClick={this.handleFoodName} value={b.food_name} color="primary">{b.food_name}</Button>
        </div>)
        commonFoodList.push('common')
        brandedFoodList.push('branded')
        console.log("filcommonFoodList : :",commonFoodList)
        const filteredSuggestions = [commonFoodList,brandedFoodList]
        // const sug=filteredSuggestions.map(fil=>
        //     //console.log("filter :",fil) 
        //         <li>
        //             <ul >
        //                 {fil.length>0 && fil[5] ==="common" ? 
        //                     <ListSubheader>Common</ListSubheader> : <ListSubheader>Branded</ListSubheader>}
        //                 {fil.map(item => (
        //                     (item !== "common" && item !=="branded") &&
        //                 <ListItem key={`item-${item.food_name}`}>
        //                     <ListItemText primary={`${item.food_name}`} />
        //                 </ListItem>
        //                 ))}
        //             </ul>
        //         </li>
        //    )
        const sug1= filteredSuggestions.map(fil=>
            //console.log("filter :",fil) 
                <li>
                    <ul >
                        {fil.length>0 && fil[5] ==="common" ? 
                            <ListSubheader>Common</ListSubheader> : <ListSubheader>Branded</ListSubheader>}
                        {fil.map(item => (
                            (item !== "common" && item !=="branded") &&
                         <ListItem key={`item-${item.food_name}`} button onClick={()=>this.handleFoodName(item.food_name)}>
                         <ListItemAvatar>
                           <Avatar
                             alt={`Avatar n°${item.food_name}`}
                             src={item.photo["thumb"]}
                           />
                         </ListItemAvatar>
                         <ListItemText id={item.food_name} primary={item.food_name} />               
                       </ListItem>
                        ))}
                    </ul>
                </li>
           )


        return (
            <div>
                 <TextField  label="Search food" onChange={this.getFoodByName}/>


                {/* <p></p>                
                <b>Common</b>
                {!isFoodDetailOpen && commonFood}
                <b>Branded</b>
                {!isFoodDetailOpen && brandedFood}

                {isFoodDetailOpen && <FoodDetails  selectedDetailFoodName={selectedFoodName}/>} */}
 
                 {/* <List className={classes.root} subheader={<li />}>
                     {sug}                
                 </List> */}
                {!isFoodDetailOpen && 
                    <List dense className={classes.root}>
                        {sug1}
                    </List>   
                } 
                 {isFoodDetailOpen && <FoodDetails  selectedDetailFoodName={selectedFoodName}/>}          
            </div>
        );
    }
}

//export default Search;
export default withStyles(styles)(Search);