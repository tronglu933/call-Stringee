import React, {Component} from 'react';
import './CssPhone.css';
class IconPhone extends Component {
    clickIcon(){
        var modal = document.getElementById("modal");
        modal.style.display = "block";
    }

    render() {
        return(
            <div className="hotline-phone-ring-wrap">
		        <div className="hotline-phone-ring">
			        <div className="hotline-phone-ring-circle"></div>
			        <div className="hotline-phone-ring-circle-fill"></div>
			            <div className="hotline-phone-ring-img-circle">
				            <a className="pps-btn-img">
                                <img alt="call" src={this.props.image} onClick={()=>this.clickIcon()}/>	            
                            </a>
			            </div>
	            </div>
	        </div>
        );
    }
}

export default IconPhone;