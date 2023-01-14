import { useState, useContext, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { NEXT_URL, API_URL } from './config/index'
// import styles from '../styles/Home.module.css'
import AuthContext from './context/AuthContext'
function App() {
  console.log('Logging')
	const context = useContext(AuthContext)
	const { user, checkUserLoggedIn } = context
  const [count, setCount] = useState(0)
	const [errors, setError] = useState(null)
	let [loading, setLoading] = useState(false)
	let [msg, setMsg] = useState(null)
	let [otp, setOtp] = useState(false)
	let [otpValue, setOtpValue] = useState(null)
	let [phoneNumber, setPhone] = useState(null)
	useEffect(() => {
		//!otp ? (document.querySelector('input').value = '') : null
		console.log('I am in the useEffect')
		console.log("User's value is: ", user)
		if (user) {
			// router.push('/Landing')
      console.log('redirect to landing page')
		}
	}, [user])

	const sendOTP = async (e) => {
		setLoading(true)
		setError(false)
		setMsg(null)
		const phone = document.querySelector('input').value
		console.log(phone)
		// fetch(`${NEXT_URL}/api/sendotp`, {
		await fetch(`${API_URL}/api/otp/sendotp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ phone }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				setMsg(data?.message)
				setLoading(false)
				// setError(false)
				data?.error || data.error == null ? setOtp(false) : setOtp(true)
				data?.error || data.error == null ? setError(true) : setError(false)
			})
			.catch((err) => {
				console.log(err)
				setMsg(err.message)
				setError(true)
				setLoading(false)
				// data?.error || data.error == null ? setOtp(false) : setOtp(true)
				// data?.error || data.error == null ? setError(true) : setError(false)
			})
		// setLoading(false)
	}

	const verifyOTP = async (e) => {
		setLoading(true)
		await fetch(`${API_URL}/api/otp/verifyotp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ otp: otpValue, phone: phoneNumber }),
		})
			.then((res) => res.json())
			.then((data) => {
				setMsg(data.message)
				console.log(data)
				setLoading(false)
				data.error || data.error == null ? setError(true) : setError(false)
				if (!data.error) {
					checkUserLoggedIn()
					// router.push('/Landing')
				}
			})
			.catch((err) => {
				console.log('Error occured while verifying OTP')
				console.log(err)
				setMsg(data.message)
				setLoading(false)
				data.error || data.error == null ? setError(true) : setError(false)
			})
	}


  return (
        <>
        			<section>
				{/* vertically and horizontally center align a div */}
				<form
					onSubmit={(e) => {
						e.preventDefault()
						setLoading(true)
						sendOTP(e)
					}}
				>
					<div
						style={{
							display: 'flex',
							gap: '1rem',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							height: '80vh',
						}}
					>
						<h1>Welcome to SMS App!</h1>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								// gap: '1rem',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<span
								style={{
									// fontFamily: inter,
									fontSize: '1.5rem',
								}}
							>
								+91-
							</span>
							<input
								type='text'
								style={{
									display: 'block',
									// fontFamily: inter,
									fontSize: '1.5rem',
									padding: '0.5rem',
									border: '1px solid #ccc',
									borderRadius: '0.5rem',
									outline: 'none',
									width: '60%',
									maxWidth: '160px',
									margin: '0 auto',
								}}
								disabled={otp}
								onKeyDown={(e) => {
									console.log(e.key)
									// accept only numbers backspace and delete and allow only 10 digits
									if (
										e.key !== 'Backspace' &&
										e.key !== 'Delete' &&
										!/[0-9]/.test(e.key)
									) {
										e.preventDefault()
									}
								}}
								onChange={(e) => {
									setPhone(e.target.value)
								}}
							/>
						</div>
						{loading && !otp ? <div>Sending SMS...</div> : null}
						{loading && otp ? <div>Verifying OTP...</div> : null}
						{msg ? (
							<div
								style={
									errors
										? { color: 'red', fontSize: 'small' }
										: { color: 'green', fontSize: 'small' }
								}
							>
								{msg}
							</div>
						) : null}
						{!otp ? (
							<>
								<button
									style={{
										// fontFamily: inter,
										fontSize: '1.5rem',
										padding: '0.5rem',
										// border: '1px solid #ccc',
										// borderRadius: '0.5rem',
										// outline: 'none',
										width: '50%',
										maxWidth: '150px',
										margin: '0 auto',
									}}
									type='submit'
									// disabled={otp}
								>
									Send OTP
								</button>
							</>
						) : (
							<>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										// gap: '1rem',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<span>Verify OTP</span>
									<input
										type='text'
										style={{
											display: 'block',
											// fontFamily: inter,
											fontSize: '1.5rem',
											padding: '0.5rem',
											border: '1px solid #ccc',
											borderRadius: '0.5rem',
											outline: 'none',
											width: '30%',
											maxWidth: '100px',
											margin: '0 auto',
										}}
										onChange={(e) => {
											setOtpValue(e.target.value)
										}}
										disabled={false}
										onKeyDown={(e) => {
											console.log(e.key)
											// accept only numbers backspace and delete and allow only 10 digits
											if (
												e.key !== 'Backspace' &&
												e.key !== 'Delete' &&
												!/[0-9]/.test(e.key)
											) {
												e.preventDefault()
											}
										}}
									/>
								</div>
								<button
									style={{
										// fontFamily: inter,
										fontSize: '1.5rem',
										padding: '0.5rem',
										// border: '1px solid #ccc',
										// borderRadius: '0.5rem',
										// outline: 'none',
										width: '30%',
										maxWidth: '100px',
										margin: '0 auto',
									}}
									type='button'
									// disabled={otp}
									onClick={(e) => {
										e.preventDefault()
										console.log('verify')
										verifyOTP(e)
									}}
								>
									Verify
								</button>
							</>
						)}
					</div>
				</form>
			</section>
        </>
  )
}

export default App
