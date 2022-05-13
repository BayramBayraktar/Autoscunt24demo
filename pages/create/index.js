import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Create from '../../Containers/Create'
import axios from 'axios'

//Create Page
export default () => {

    const [Verify, setVerify] = useState(false)

    const router = useRouter()



    useEffect(() => {
        (async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/create`)
                .then((response) => {
                    console.log(response)
                    response == "successful" ? setVerify(true) : setVerify(false) & router.push('/')
                })
                .catch((err) => console.log(err))
        })()

    })

    return (
        true && <Create />
    )
}


