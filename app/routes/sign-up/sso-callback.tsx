// ** React Import
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "@remix-run/react"
import { LinksFunction } from "@remix-run/react/dist/routeModules"

// ** Clerk Import
import { useSignUp } from "@clerk/remix"

// ** Styles Import
import styles from "~/styles/sso-callback.css"

// Import styles
export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: styles },
]

function SSOCallback() {
    const { signUp, setActive } = useSignUp()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        const fetchData = async () => {
            if (signUp && searchParams) {
                const username = searchParams.get("name") ?? ''
                const phoneNumber = searchParams.get("phone") ?? ''
                const firstSpaceIndex = username.indexOf(" ");
                const firstName = firstSpaceIndex > -1 ? username.substring(0, firstSpaceIndex) : username;
                const lastName = firstSpaceIndex > -1 ? username.substring(firstSpaceIndex + 1) : "";
                try {
                    await signUp.update({
                        firstName,
                        lastName,
                        phoneNumber
                    })
                    if (signUp?.status === "complete") {
                        await setActive({ session: signUp.createdSessionId })
                        navigate('/')
                    }
                } catch (err: any) {
                    console.error("An unexpected error occured.")
                }
            }
        }
        fetchData()
    }, [searchParams, signUp])

    return (
        <div className="container">
            <div className="loader" />
        </div>
    )
}

export default SSOCallback