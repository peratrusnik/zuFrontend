import React from 'react';
import noImage from '../../../assets/img/noImage.png'
import { useDispatch } from 'react-redux';
import Stars from '../../stars/Stars';

function QuickView({ ad }) {

    // console.log(ad);

    const ShowView = () => {
        return <div className='quick-view-box container'>
            <div className="row">

            <div className="col-xl-4 col-md-6 col-sm-12">
                <img className='img-fluid' src={ad.imgUrl? ad.imgUrl : noImage} alt="" />
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12">
                <h3 className='title'>{ad.title}</h3>
                <p className='price'>{ad.price} $</p>
                    <p className='description'>{ad.description}</p>
                    <Stars
                            rating={ad?.rating}
                            all={false}
                            ratingStar={ad?.rating}
                        />
                
            </div>
            </div>
        </div>
    }
 
    
    return (
        <div>
            {ShowView()}
        </div>
    );
}

export default QuickView;