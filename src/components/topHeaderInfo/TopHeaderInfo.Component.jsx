import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrency } from '../../redux/currencySlicer';

function TopHeaderInfoComponent() {

	const dispatch = useDispatch()
	const { currency } = useSelector((state) => state.currencyStore)
	
	useEffect(() => {
		localStorage.setItem("Currency", currency)
	},[currency])
	
	const currencyBtn = (e) => {
		dispatch(setCurrency(e.target.value))
	}
	const checkCurrency = () => {
		if (currency === "USD") {
			return "USD"
		}
		if (currency === "EUR") {
			return "EUR"
		}
		if (currency === "RSD") {
			return "RSD"
		}
	}
	return (
		<div className='topHeader'>
			<div className='container-fluid'>
				<div className='orderInfo'>
					<p>Free Shipping On Order Over $99 </p>

					<div className='rightSection'>
						<div className='dropdown'>
							<button
								className='btn dropdown-toggle'
								type='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'>
								English
							</button>
							<ul className='dropdown-menu'>
								<li>
									<Link className='dropdown-item' to='/'>
										Serbia
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										Italiano
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										Espanolo
									</Link>
								</li>
							</ul>
						</div>
						<div className='dropdown'>

							<select
								id='currency'
								defaultValue={checkCurrency()}
								onChange={currencyBtn}
							>
								<option value='USD'>USD</option>
								<option value='EUR'>EUR</option>
								<option value='RSD'>RSD</option>
							</select>

							{/* <button
								className='btn dropdown-toggle'
								type='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'>
								USD
							</button>
							<ul className='dropdown-menu'>
								<li>
									<Link className='dropdown-item' to='/'>
										EUR
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										RSD
									</Link>
								</li>
								<li>
									<Link className='dropdown-item' to='/'>
										VCD
									</Link>
								</li>
							</ul> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopHeaderInfoComponent;
