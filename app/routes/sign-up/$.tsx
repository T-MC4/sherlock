// ** React Import
import { useState, FormEvent } from "react"
import { useNavigate } from "@remix-run/react"
import { LinksFunction } from "@remix-run/react/dist/routeModules"

// ** Clerk Hook Import
import { useSignUp } from "@clerk/remix"

// ** Icon Import
import { FiEyeOff, FiEye } from "react-icons/fi"
import { BsArrowRight } from "react-icons/bs"

// ** Third-party Component Import
import PhoneInput from 'react-phone-number-input'

// ** Styles Import
import styles from "~/styles/sign-up.css"
import phoneInputCSS from 'react-phone-number-input/style.css'

// Import styles
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: phoneInputCSS }
]

export default function SignUpPage() {

  // Hook
  const navigate = useNavigate()
  const { isLoaded, signUp, setActive } = useSignUp()

  // State
  const [errors, setErrors] = useState<any[]>([])
  const [userCreated, setUserCreated] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [phoneFocused, setPhoneFocused] = useState<boolean>(false)

  // Input State
  const [agree, setAgree] = useState<boolean>(false)
  const [username, setUserName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [emailAddress, setEmailAddress] = useState<string>("")

  // Submit clerk basic sign-up form
  const handleBasicSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLoaded) {
      return
    }

    if (!agree) {
      setErrors([{
        paramName: 'agree',
        message: 'You need to accept terms to submit.'
      }])
      return
    }

    try {
      const firstSpaceIndex = username.indexOf(" ");
      const firstName = firstSpaceIndex > -1 ? username.substring(0, firstSpaceIndex) : username;
      const lastName = firstSpaceIndex > -1 ? username.substring(firstSpaceIndex + 1) : "";
      await signUp.create({
        firstName,
        lastName,
        phoneNumber,
      })
      const expectedMissingFields = ['email_address', 'phone_number']
      if (
        signUp.status === "missing_requirements" || 
        signUp.missingFields.every(field => expectedMissingFields.includes(field))
      ) {
        setUserCreated(true)
      }
    } catch (err: any) {
      setErrors(err?.errors ?? [])
    }
  }

  // Submit clerk crendential sign-up form
  const handleCrendentialSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isLoaded) {
      return
    }

    try {
      await signUp.update({
        emailAddress,
        password,
      })
      
      if (signUp.status === "complete") {
        await setActive({ session: signUp.createdSessionId })
        redirectHome()
      }
    } catch (err: any) {
      setErrors(err?.errors ?? [])
    }
  }

  // Submit clerk oauth sign-up form
  const attachGoogleAccount = async () => {
    await signUp
      ?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: `/sign-up/sso-callback?name=${username}&phone=${encodeURIComponent(phoneNumber)}`,
        redirectUrlComplete: "/"
      })
  }

  // Get the message from field name
  const getErrorMessage = (fieldName: string) => {
    let error = errors.find(item => (item.paramName || item.meta.paramName) === fieldName)?.message ?? null
    if (error === 'is invalid') {
      error = fieldName.split('_').join(' ') + ' is invalid'
      error = error.charAt(0).toUpperCase() + error.slice(1)
    }
    return error
  }

  // Navigate to home page
  const redirectHome = () => {
    navigate('/')
  }

  const renderBasicForm = () => {
    return (
      <div className="custom-section">
        <img src="/image/logo.jpg" className="image-logo" />
        <h4 className="signup-description">Create your account</h4>
        <div className="signup-sub-description">to continue to Sherlock</div>
        <hr />
        <form onSubmit={handleBasicSubmit} className="signup-form signup-basic-form">
          {/* Input Full Name */}
          <div className="custom-form-item">
            <label htmlFor="userName">Full Name</label>
            <input 
              id="userName" 
              type="text" 
              value={username} 
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter Full Name"
            />
            <div className="err-msg">{getErrorMessage('first_name') ?? getErrorMessage('last_name')}</div>
          </div>
          {/* Input Phone Number */}
          <div className={`custom-form-item${phoneFocused ? ' focused' : ''}`}>
            <label htmlFor="userPhone">Phone</label>
            <PhoneInput
              placeholder="Enter Phone Number"
              onBlur={() => setPhoneFocused(false)}
              onFocus={() => setPhoneFocused(true)}
              value={phoneNumber}
              onChange={(v) => setPhoneNumber(v ?? '')}
            />
            <div className="err-msg">{getErrorMessage('phone_number')}</div>
          </div>
          {/* Checkbox Terms and Condition */}
          <div className="agree_tnc">
            <input   
              id="checkTnC"
              type="checkbox"
              checked={agree} 
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="checkTnC">I agree to terms and conditions.</label>
          </div>
          <div className="err-msg">{getErrorMessage('agree')}</div>
          {/* Button Submit */}
          <button type="submit" className="btn-submit" disabled={!isLoaded}>
            Continue
          </button>
        </form>
      </div>
    )
  }

  const renderOAuthForm = () => {
    return (
      <div className="custom-section">
        <img src="/image/logo.jpg" className="image-logo" />
        <h4 className="signup-description">Create your account</h4>
        <div className="signup-sub-description">to continue to Sherlock</div>
        <form className="signup-form signup-credential-form" onSubmit={handleCrendentialSubmit}>
          {/* BUTTON WITH GOOGLE */}
          <button type="button" className="btn-oauth" onClick={attachGoogleAccount}>
            <img src="/image/google_logo.png" width={15} className="g_logo" />
            Continue with Google
            <div className="arrow-right ml-auto">
              <BsArrowRight size={15} />
            </div>
          </button>
          <hr />
          {/* Input Email Address */}
          <div className="custom-form-item">
            <label htmlFor="userEmail">Email</label>
            <input 
              id="userEmail" 
              type="email" 
              value={emailAddress} 
              onChange={(e) => setEmailAddress(e.target.value)} 
              placeholder="Enter Email Address"
            />
            <div className="err-msg">{getErrorMessage('email_address')}</div>
          </div>
          {/* Input Password */}
          <div className="custom-form-item">
            <label htmlFor="userPassword">Password</label>
            <div className="input-password">
              <input 
                id="userPassword"
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <div className="pwd-option" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff size={16} color="#5d5d5d" /> : <FiEye size={16} color="#5d5d5d" />}
              </div>
            </div>
            <div className="err-msg">{getErrorMessage('password')}</div>
          </div>
          {/* Button Submit */}
          <button type="submit" className="btn-submit" disabled={!isLoaded}>
            Continue
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="container">
      {userCreated ? (
        renderOAuthForm()
      ) : (
        renderBasicForm()
      )}
    </div>
  )
}
