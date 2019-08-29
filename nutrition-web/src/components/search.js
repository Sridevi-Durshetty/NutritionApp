import React, { Component } from 'react';
import * as urls from '../api/endpoints';
import {
    apiCallGet, apiCallPost, apiCallPut, apiCallDelete
} from '../api/api-calls';

class Search extends Component {
    state = {
    
    commonFood :{
        common_type: null,
        food_name: '',
        locale: '',
        photo: {thumb: ''},
        serving_qty: '',
        serving_unit: '',
        tag_id: '',
        tag_name: ''
    },
    brandedFood :{
        brand_name: '',
        brand_name_item_name: '',
        brand_type: 0,
        food_name: '',
        locale: '',
        nf_calories: 0,
        nix_brand_id: '',
        nix_item_id: '',
        photo: {thumb: ''},
        region: 0,
        serving_qty: 0,
        serving_unit: ''
    }, 
    commonFoodList: [],
    brandedFoodList: []
    }

    getFoodByName = (e) => {
        console.log("ful url:", urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value)
        apiCallGet(urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value)          
            .then(foods => {
                console.log("foods :", foods.data["common"])
                console.log("foods :", foods.data["branded"])
                this.setState({
                    commonFoodList: foods.data["common"],
                    brandedFoodList: foods.data["branded"]
                })
            })
    }
    render() {
        const {commonFoodList,brandedFoodList} = this.state
        const commonFood = commonFoodList.map(c=><div>
            {c.food_name}
        </div>)
        const brandedFood = brandedFoodList.map(b=><div>
            {b.food_name}
        </div>)
        return (
            <div>
                Search
                <input type="text" onChange={this.getFoodByName} />
                <p></p>
                <b>Common</b>
                {commonFood}
                <b>Branded</b>
                {brandedFood}
            </div>
        );
    }
}

export default Search;