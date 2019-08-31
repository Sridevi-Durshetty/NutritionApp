import React,{Component} from 'react'
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

const styles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
      },
      card: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
    }));

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
             
        // console.log('before add ', this.query);
        apiCallPost(urls.BASE_URL + urls.NUTRIENTS_URL, {'query':this.props.selectedDetailFoodName} )
            .then((resp) => {
                    console.log("nutrient info:",resp.data.foods)                   
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
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
    //   const intakeFood = intakeFoodList.map(inf=><div>
    //       <p>Food Name: {inf.food_name}</p>
    //       <p>calories: {inf.nf_calories}</p>
    //       <p>Serving Qty: {inf.serving_qty}</p>
    //       <p>Grams : {inf.serving_weight_grams}</p>
    //       <p>Serving Unit : {inf.serving_unit}</p>
    //       <p>Serving Size: {inf.serving_size}</p>
    //       <p>Image : <img src={inf.photo.thumb} alt={inf.photo.thumb}></img></p>
    //       <p>Meal Type : {inf.meal_type}</p>
    //   </div>)

    const intakeFood = intakeFoodList.map(inf=><div>
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
                        <Avatar
                            alt={`Avatar-${inf.photo.thumb}`}
                            src={inf.photo.thumb}
                        />
          <Typography variant="h5" component="h2">
                {inf.food_name}
          </Typography>
          <Divider />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="servingSelect">Servings</InputLabel>
                    <Select
                    native
                    value={inf.serving_qty}
                  //  onChange={handleChange('age')}
                    inputProps={{
                        name: 'Servings',
                        id: 'servingSelect',
                    }}
                    >
                    <option value="" />
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    </Select>
                    <Typography className={classes.pos} color="textSecondary">
                        {inf.serving_unit}
                    </Typography>
            </FormControl>
            <Divider />
          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add</Button>
        </CardActions>
      </Card>

    </div>)
    
        return ( 

        //     <Paper className={classes.root}>
        //     <Typography variant="h5" component="h3">
        //       Food Detail Page
        //     </Typography>
        //     <Typography component="p">
        //       Paper can be used to build surface or other elements for your application.
        //       {intakeFood}  
        //         <Button >Add</Button>  
        //     </Typography>
        //   </Paper>  
        
        <Paper className={classes.root}>
        {intakeFood} 
       </Paper> 
         );
    }
} 

export default withStyles(styles)(FoodDetails);