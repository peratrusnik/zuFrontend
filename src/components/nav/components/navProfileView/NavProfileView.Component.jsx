import {AiOutlineSearch, AiOutlineUser} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {removeUser} from '../../../../redux/user.slicer';
import {removeUserFromLocalStorage} from '../../../../services/auth.service';
import { useState, useEffect } from 'react';

function NavProfileViewComponent() {
    const [compareProductNum,setCompareProductsNum] = useState(0);
    const dispatch = useDispatch();
    const userStore = useSelector((store) => store.userStore.user);
    const compareStore = useSelector((store)=>store.compareStore.comparedProducts);
	const navigate = useNavigate();
	const onLogOut = () => {
		removeUserFromLocalStorage();
		dispatch(removeUser());
		navigate('/');
    };
    
    useEffect(()=>{
        setCompareProductsNum(compareStore.length);
    }, [compareStore])
    
    return (
        <>
            <div className='dropdown'>
                <button
                    className='btn  dropdown-toggle'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'>
                    <AiOutlineUser/>
                </button>
                <span className='m-2'>{userStore && userStore.firstName}</span>
                <ul className='dropdown-menu'>
                    <li>
                        <Link className='dropdown-item' to='/productCompare'>
                            Compare {`(${compareProductNum})`}
                        </Link>
                    </li>
                 
                    <li>
                        {!userStore?.email ? (
                            <>
                                <Link className='dropdown-item' to='/login'>
                                    Sign In
                                </Link>
                                <Link className='dropdown-item' to='/register'>
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <>
                                {/* <Link className='dropdown-item' to='/user'>
                                    My profile
                                </Link> */}                               

                                    
                                <Link
                                    className='dropdown-item'
                                    to={`/wishlist/${userStore._id}`}>
                                    Wishlist
                                </Link>                   
                                <Link className='dropdown-item' to='/user'>
                                    My profile
                                </Link>
                                <Link className='dropdown-item' to='/user/products'>
                                    My products
                                </Link>
                                <Link className='dropdown-item' to='/product/create'>
                                    Add product
                                </Link>
                                
                                    <button className='d-flex m-auto btn btn-dark mt-2 btn-sm' onClick={(e) => onLogOut()}>Log out</button>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavProfileViewComponent;
