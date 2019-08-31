import React, { Component } from 'react';
import * as urls from '../api/endpoints';
import {
    apiCallGet, apiCallPost, apiCallPut, apiCallDelete
} from '../api/api-calls';
import FoodDetails from './food-details';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import '../styles/autocomplete.css'

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
        isFoodDetailOpen: false,
        selectedFoodName: ''

        // The active selection's index
        // activeSuggestion: 0
    }

    constructor(props) {
        super(props)
    }

    getFoodByName = (e) => {
        console.log("ful url:", urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value)
        apiCallGet(urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value, '')
            .then(foods => {
                console.log("foods :", foods.data["common"].slice(0, 5))
                console.log("foods :", foods.data["branded"].slice(0, 5))
                this.setState({
                    commonFoodList: foods.data["common"].slice(0, 5),
                    brandedFoodList: foods.data["branded"].slice(0, 5)
                    //activeSuggestion: 0
                })
            })
    }

    handleFoodName = (fName) => {
        console.log("sel food name :", fName)
        this.setState({
            isFoodDetailOpen: true,
            selectedFoodName: fName
            //activeSuggestion: 0
        })
    }

    render() {
        const { classes } = this.props;
        const { commonFoodList, brandedFoodList, isFoodDetailOpen, selectedFoodName } = this.state

        commonFoodList.unshift('common')
        brandedFoodList.unshift('branded')
        console.log("filcommonFoodList : :", commonFoodList)
        const foodList = [commonFoodList, brandedFoodList]
        const filteredFoodList = foodList.map(fil =>
            // console.log("filter :",fil[0]) 
            <React.Fragment>
                {(fil.length > 1) &&
                    <li key={fil[0]}>
                        <ul>
                            <ListSubheader> {fil[0]}</ListSubheader>
                            {fil.map(item => (
                                (item !== "common" && item !== "branded") &&
                                <ListItem key={`item-${item.food_name}`} button onClick={() => this.handleFoodName(item.food_name)}>
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={`Avatar-${item.food_name}`}
                                            src={item.photo["thumb"]}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={item.food_name} primary={item.food_name} />
                                </ListItem>
                            ))}
                        </ul>

                    </li>
                }
            </React.Fragment>
        )


        return (
            <div className={classes.root}>
                <TextField label="Search food" onChange={this.getFoodByName} />
                {!isFoodDetailOpen &&
                    <List dense >
                        {filteredFoodList}
                    </List>
                }
                {isFoodDetailOpen && <FoodDetails selectedDetailFoodName={selectedFoodName} />}
            </div>
        );
    }
}

export default withStyles(styles)(Search);