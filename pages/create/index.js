import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Create from '../../Containers/Create'
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'

//Create Page
export default () => {

    const [Verify, setVerify] = useState(false)

    const router = useRouter()



    useEffect(() => {
        (async () => {
            await axios.get('http://localhost:5000/create', { withCredentials: true })
                .then((response) => {
                    response.data == "successful" ? setVerify(true) : setVerify(false) & router.push('/')
                })
                .catch((err) => console.log(err))
        })()

    })

    return (
        Verify && <Create />
    )
}


/* 
export async function getServerSideProps() {


    const loggedin = false

    if (loggedin) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            loggedin,
        }
    }
}



 */