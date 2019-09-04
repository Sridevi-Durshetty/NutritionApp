import React, { Component } from 'react'
import * as urls from '../api/endpoints';
import {
    apiCallGet, apiCallPost
} from '../api/api-calls';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import SelectedFood from './selected-food';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import MenuItem from '@material-ui/core/MenuItem';

const styles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        minWidth: 500,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    avatar: {
        margin: 10,
        width: 80,
        height: 400,
    },
}));

class FoodDetails extends Component {
    state = {
        intakeFood: {
            'nix_item_id': '',
            'food_name': '',
            'serving_unit': '',
            'serving_weight_grams': 0,
            'serving_qty': '0',
            'nf_calories': 0,
            'serving_size': 0,
            'meal_type': 'breakfast',
            'thumb': '',
            "meal_type": [],
            "serving_size": [],
            "selected_meal_type": "mealtype1"
        },
        selectedMealType: "mealtype1",
        intakeFoodList: [],
       // isFoodSelected:false,
        foodSelectedDetails:null
    }

    componentDidMount() {
        //  console.log("selectedDetailFood :",this.props.selectedDetailFood)
        console.log("selectedDetailFoodName :", this.props.selectedDetailFoodName)

        // console.log('before add ', this.query);
        apiCallPost(urls.BASE_URL + urls.NUTRIENTS_URL, { 'query': this.props.selectedDetailFoodName })
            .then((resp) => {
                console.log("nutrient info:", resp.data.foods)
                var entries = resp.data.foods
                entries.map(f => {
                    this.setState({
                        intakeFoodList: [{
                            "nix_item_id": f.nix_item_id,
                            "food_name": f.food_name,
                            "serving_unit": f.serving_unit, // units like cup , slice, oz
                            "serving_weight_grams": f.serving_weight_grams,
                            "serving_qty": f.serving_qty,     // 0.5 cup or 1 slice - per serving quantity
                            "nf_calories": f.nf_calories,
                            "meal_type": [
                                { id: "mealtype1", name: "Breakfast" },
                                { id: "mealtype2", name: "Lunch" },
                                { id: "mealtype3", name: "Snacks" },
                                { id: "mealtype4", name: "Dinner" }],
                            "thumb": f.photo["thumb"],
                            "serving_size": [    // can show no of quantitites - user can select no of quantities eat 
                                { id: 1, name: 1 * f.serving_qty },
                                { id: 2 , name: 2 * f.serving_qty },
                                { id: 3, name: 3 * f.serving_qty }
                            ],
                            "selected_meal_type": "mealtype1", // selected meal type like breakfast, lunch
                            "selected_serving_size": 1, // selected no of quantities user ate 
                            "cal_calories":f.nf_calories,
                            "cal_weight_grams":f.serving_weight_grams
                        }]
                    })
                })

                console.log("intakeFoodList:", this.state.intakeFoodList)

            }).catch((err) => {
                console.log('nutrients  error', err);
                // this.setState({ status: err });
            });

    }

    handleChange = (selFood, e) => {
        // console.log("selected fod", selFood)
        const { name, value } = e.target
         console.log("Name :", name)
         console.log("Value :", value)

        const { intakeFoodList } = { ...this.state }
        const currentState = intakeFoodList
        currentState.map(i => {            
            if (i.food_name === selFood.food_name) {
                if (name === "selected_serving_size") {
                  
                    i.selected_serving_size = value
                    i.cal_weight_grams = value * i.serving_weight_grams
                    i.cal_calories = value * i.nf_calories
                }
               
                if (name === "selected_meal_type") i.selected_meal_type = value;
            }
        })

        this.setState({ intakeFoodList: currentState })

        console.log("currentState", this.state.intakeFoodList)

    }
    addFood = (addfood) => {       
        // const { intakeFood } = { ...this.state }
        // const currentState = intakeFood
        // currentState['nix_item_id'] = addfood.nix_item_id
        // currentState['food_name'] = addfood.food_name
        // currentState['serving_unit'] = addfood.serving_unit
        // currentState['serving_weight_grams'] = addfood.serving_weight_grams
        // currentState['serving_qty'] = addfood.serving_qty
        // currentState['nf_calories'] = addfood.nf_calories
        // currentState['serving_size'] = addfood.serving_size
        // currentState['meal_type'] = addfood.meal_type
        // this.setState({ intakeFood: currentState })

        // console.log("currentState", this.state.intakeFood)
        console.log("selected food ", addfood)   
        this.setState({
            foodSelectedDetails : addfood
        })

    }

    render() {
        const { intakeFoodList, foodSelectedDetails } = this.state
        const { classes } = this.props;

        const intakeFood = intakeFoodList.map(inf => <div>
            {/* <p>Food Name: {inf.food_name}</p>
        <p>calories: {inf.nf_calories}</p>
        <p>Serving Qty: {inf.serving_qty}</p>
        <p>Grams : {inf.serving_weight_grams}</p>
        <p>Serving Unit : {inf.serving_unit}</p>
        <p>Serving Size: {inf.serving_size}</p>
        <p>Image : <img src={inf.photo.thumb} alt={inf.photo.thumb}></img></p>
        <p>Meal Type : {inf.meal_type}</p> */}

            <Card className={classes.card}>
                <CardContent>
                    <Avatar className={classes.avatar}
                        alt={`Avatar-${inf.thumb}`}
                        src={inf.thumb}
                    />
                    <Typography variant="h5" component="h1">
                        {inf.food_name}
                    </Typography>
                    <Divider />

                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <InputLabel htmlFor="servingSelect">Servings</InputLabel>
                            <Select native value={inf.selected_serving_size} onChange={(e) => this.handleChange(inf, e)}
                                name="selected_serving_size">
                                {
                                    inf.serving_size.map((item) =>
                                        <option key={item.id} value={item.id}>{item.name}</option>)
                                }
                            </Select>

                            <Typography className={classes.pos} color="textSecondary">
                                {inf.serving_unit}
                            </Typography>

                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h5" component="h2">
                                {inf.cal_weight_grams}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Grams
                                </Typography>

                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h5" component="h2">
                                {inf.cal_calories}
                            </Typography>
                            <Typography variant="body2" component="p">
                                Calories
                                </Typography>

                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                    </Grid>
                    <Divider />


                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p">
                                <InputLabel htmlFor="serving_today">ADD TO TODAY</InputLabel>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                native
                                value={inf.selected_meal_type}
                                onChange={(e) => this.handleChange(inf, e)}
                                name="selected_meal_type"
                            >
                                {
                                    inf.meal_type.map((item) =>
                                        <option key={item.id} value={item.id}>{item.name}</option>)
                                }
                            </Select>
                        </Grid>
                    </Grid>
                    {/* </FormControl> */}

                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => this.addFood(inf)}>Add</Button>
                    
                </CardActions>
            </Card>

        </div>)

        return (
            <React.Fragment>
            {
                (!foodSelectedDetails )  &&
                <Paper className={classes.root}>
                {intakeFood}
                </Paper>
            }
            {
                 (foodSelectedDetails)  && <SelectedFood  selectedFoodDetail={foodSelectedDetails}/>
            }

            </React.Fragment>

        );
    }
}

export default withStyles(styles)(FoodDetails);