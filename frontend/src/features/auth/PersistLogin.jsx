import { Outlet, Link , useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState  } from "react";
import { useRefreshMutation} from "./authApiSlice.js";
import usePersist from "../../hooks/usePersist.js";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice.js";

const PersistLogin = () => {
    const [persist] = usePersist()
    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)

    const effectRan = useRef(false)

    const [trueSuccess,setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    //const response =
                    await refresh()
                    // const { accessToken } = response.data
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }

            }
            //If you refresh the page state is wipedout, and weed need to check token
            if (!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true
    },[])

    let content
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet/>
    } else if ( isLoading ) { // persist: yes, token: no
        console.log('loading')
        content = <p>Loading</p>
    } else if ( isError ) { // persist: yes , token: no
        console.log('error, redirecting to login')

       content = (
           <>
            <p> {error?.data?.message} </p>
            <p>

                <Link to="/login">Please login again</Link>
            </p>
           </>
        )


    } else if (isSuccess && trueSuccess) {  // persist: yes, toke: yes
        console.log('success')
        content = <Outlet/>
    } else if ( token && isUninitialized ) { // persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet/>

    }



    return (
        content
    )
}
export default PersistLogin
