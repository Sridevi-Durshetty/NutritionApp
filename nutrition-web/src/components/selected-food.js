import React,{Component} from 'react'
class SelectedFood extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const selFood = this.props.selectedFoodDetail
        console.log("Selected food comp ", selFood)
        return ( 
        <div>
            {selFood}
        </div> 
        );
    }
}
 
export default SelectedFood;