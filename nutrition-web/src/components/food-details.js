import React,{Component} from 'react'
import * as urls from '../api/endpoints';
import {
    apiCallGet, apiCallPost
} from '../api/api-calls';

class FoodDetails extends Component {
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
        // }

        intakeFood:{
            'nix_item_id': '', 
            'food_name': '',
            'serving_unit': '',
            'serving_weight_grams':0,       
            'serving_qty': 0,     
            'nf_calories': 0,
            'serving_size' :0, 
            'meal_type': 'breakfast',
            'thumb': ''
        },
        intakeFoodList:[]
    
     }
     componentDidMount(){
        //  console.log("selectedDetailFood :",this.props.selectedDetailFood)
        console.log("selectedDetailFoodName :",this.props.selectedDetailFoodName)
        // console.log("ful url:", urls.BASE_URL + urls.NUTRIENTS_URL + '?query=' + this.props.selectedDetailFoodName)
        // apiCallGet(urls.BASE_URL + urls.NUTRIENTS_URL)
        //     .then(foods => {
        //       //  console.log("foods :", foods.data["common"])
        //       //  console.log("foods :", foods.data["branded"])
        //         this.setState({
        //             isFoodDetailOpen:false,
        //             commonFoodList: foods.data["common"],
        //             brandedFoodList: foods.data["branded"]
        //         })
        //     })
        // this.setState({
        //     query:this.props.selectedDetailFoodName
        // })       
        // console.log('before add ', this.query);
        apiCallPost(urls.BASE_URL + urls.NUTRIENTS_URL, {'query':this.props.selectedDetailFoodName} )
            .then((resp) => {
                    console.log("nutrient info:",resp.data.foods)
                    // this.setState({ status: 'Venue Details are successfully created!' });
                    // this.setState({ user: resp.data });
                    this.setState({
                        // intakeFood:{
                        //     'nix_item_id': '', 
                        //     'food_name': '',
                        //     'serving_unit': '',
                        //     'serving_weight_grams':0,       
                        //     'serving_qty': 0,     
                        //     'nf_calories': 0,
                        //     'serving_size' :0, 
                        //     'meal_type': 'breakfast',
                        //     'thumb': ''
                        // }
                        intakeFoodList:resp.data.foods
                    })  
                    console.log("intakeFoodList:",this.state.intakeFoodList)
            }).catch((err) => {
            console.log('nutrients  error', err);
            // this.setState({ status: err });
            });

     }
    render() { 
        const {intakeFoodList} =this.state
      const intakeFood = intakeFoodList.map(inf=><div>
          <p>Food Name: {inf.food_name}</p>
          <p>calories: {inf.nf_calories}</p>
          <p>Serving Qty: {inf.serving_qty}</p>
          <p>Grams : {inf.serving_weight_grams}</p>
          <p>Serving Unit : {inf.serving_unit}</p>
          <p>Serving Size: {inf.serving_size}</p>
          <p>Image : <img src={inf.photo.thumb} alt={inf.photo.thumb}></img></p>
          <p>Meal Type : {inf.meal_type}</p>
      </div>)
        return ( 
            <div>
                Food Detail page    
                {intakeFood}           
            </div>
         );
    }
}
 
export default FoodDetails;