import React, { useEffect } from 'react'
import Layout from '../../components/Layout';
import Carousel from 'react-elastic-carousel';
import '../HomePage/style.css';
import one from '../../images/2.jpg';
import two from '../../images/3.jpg';
import three from '../../images/4.jpg';
import Rectangle from '../../components/Rectangle';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduct} from '../../actions';
import { generatePublicUrl } from '../../urlconfig';
import { Breed } from '../../components/MaterialUI';
import {
    IoIosArrowForward,
    IoIosStar,
    IoMdCart
} from 'react-icons/io';
export default function HomePage() {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    useEffect (() => {
        dispatch(getAllProduct());
    }, [])
    console.log(product);
    var min = 1;
    var max = 100;
    var rand =  Math.pow(Math.ceil(min + (Math.random() * (max-min))),4);
    const first=product.products[(rand+1)%4];
    const second=product.products[(rand+2)%4];
    const third=product.products[(rand+3)%4];
    const fourth=product.products[(rand+4)%4];
    const items = [
        { id: 1, url: one,slug:'Xiaomi-11T-Pro-5G',id:'62263dea9a047e4fc85075ec' },
        { id: 2, url: two,slug:'Xiaomi-11Lite-NE-(Jazz-Blue-128-GB)',id:'62263e6a9a047e4fc85075ee' },
        { id: 3, url: three,slug:'Mi-4A-Pro-108-cm-(43-inch)-Full-HD-LED-Smart-Android-TV',id:'62263eb89a047e4fc85075f0' },
    ]
    // console.log(breedList);
    return (
        <div>
            <Layout />
            <div className='body'>
                <Carousel>
                    {items.map(item => <Link to={`/${item.slug?item.slug:null}/${item.id?item.id:null}/p`}><img key={item.id} src={item.url}></img></Link>)}
                </Carousel>
                <div className='row'>
                    <Link className='link' to={`/${first?first.slug:null}/${first?first._id:null}/p`} >
                        <Rectangle
                            url={generatePublicUrl(first?first.productPictures[0].img:null)}
                            about={first?first.name.slice(0,50):null}
                            price={first?first.price:null}
                        />
                    </Link>
                    <Link className='link' to={`/${second?second.slug:null}/${second?second._id:null}/p`} 
                    >
                    <Rectangle
                        url={generatePublicUrl(second?second.productPictures[0].img:null)}
                        about={second?second.name.slice(0,50):null}
                        price={second?second.price:null}
                    />
                    </Link>
                    
                </div>
                <div className='row'>
                    <Link className='link' to={`/${third?third.slug:null}/${third?third._id:null}/p`} >
                    <Rectangle
                        url={generatePublicUrl(third?third.productPictures[0].img:null)}
                        about={third?third.name.slice(0,50):null}
                        price={third?third.price:null}
                    />
                    </Link>
                    <Link className='link' to={`/${fourth?fourth.slug:null}/${fourth?fourth._id:null}/p`} >
                    <Rectangle
                        url={generatePublicUrl(fourth?fourth.productPictures[0].img:null)}
                        about={fourth?fourth.name.slice(0,50):null}
                        price={fourth?fourth.price:null}
                    />
                    </Link>
                </div>
            </div>
            <Footer />
        </div >
    );
}
