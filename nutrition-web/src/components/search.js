import React, { Component } from 'react';
import * as urls from '../api/endpoints';
import {
    apiCallGet, apiCallPost, apiCallPut, apiCallDelete
} from '../api/api-calls';
import FoodDetails from './food-details';

class Search extends Component {
    state = {
        commonFood: {
            common_type: null,
            food_name: '',
            locale: '',
            photo: { thumb: '' },
            serving_qty: '',
            serving_unit: '',
            tag_id: '',
            tag_name: ''
        },
        brandedFood: {
            brand_name: '',
            brand_name_item_name: '',
            brand_type: 0,
            food_name: '',
            locale: '',
            nf_calories: 0,
            nix_brand_id: '',
            nix_item_id: '',
            photo: { thumb: '' },
            region: 0,
            serving_qty: 0,
            serving_unit: ''
        },
        commonFoodList: [],
        brandedFoodList: [],
        isFoodDetailOpen:false,
        selectedFood:null,
        selectedFoodName:''
    }

    getFoodByName = (e) => {
        console.log("ful url:", urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value)
        apiCallGet(urls.BASE_URL + urls.SEARCH_URL + '?query=' + e.target.value,'')
            .then(foods => {
              //  console.log("foods :", foods.data["common"])
              //  console.log("foods :", foods.data["branded"])
                this.setState({
                    isFoodDetailOpen:false,
                    commonFoodList: foods.data["common"],
                    brandedFoodList: foods.data["branded"]
                })
            })
    }
    handleFoodDetailClick=(selFood)=>{
        console.log("sel food :",selFood)
        this.setState({
            isFoodDetailOpen:true,
            selectedFood:selFood
        })
    }
    handleFoodName=(e)=>{
        console.log("sel food name :",e.target.value)
        this.setState({
            isFoodDetailOpen:true,
            selectedFoodName:e.target.value
        })
    }

    render() {
        const { commonFoodList, brandedFoodList,isFoodDetailOpen,selectedFood ,selectedFoodName } = this.state
        const commonFood = commonFoodList.map(c => <div>
            {/* <button onClick={()=>this.handleFoodDetailClick(c)} >{c.food_name}</button> */}
            <button onClick={this.handleFoodName} value={c.food_name}>Click {c.food_name}</button>
        </div>)
        const brandedFood = brandedFoodList.map(b => <div>
             <button onClick={this.handleFoodName} value={b.food_name}>{b.food_name}</button>
        </div>)
        return (
            <div>
                Search
                <input type="text" onChange={this.getFoodByName} />
                <p></p>
                <b>Common</b>
                {!isFoodDetailOpen && commonFood}
                <b>Branded</b>
                {!isFoodDetailOpen && brandedFood}

                {isFoodDetailOpen && <FoodDetails selectedDetailFood={selectedFood} selectedDetailFoodName={selectedFoodName}/>}
            </div>
        );
    }
}

export default Search;