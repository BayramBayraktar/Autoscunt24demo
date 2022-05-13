import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layoutmain from '../../layouts'
import Backbar from '../../Components/TurnBack'
import Card from '../../Components/Offer/Card'
import HeaderBar from '../../Components/Offer/OfferDetails/Header'
import Detail from '../../Components/Offer/OfferDetails/DetailSection'




export const getServerSideProps = async (contex) => {

    var lstData
    const make = contex.params.make[0]
    const model = contex.params.make[1]
    const id = contex.query.id

    if (make && model && id) {
        const data = await fetch(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/offers/${make}/${model}?id=${id}`)
        lstData = await data.json()
    }

    return {

        props: {
            ...(await serverSideTranslations(contex.locale, ['home'])),
            lstData
        }
    }
}

const Make = ({ lstData }) => {


    return (

        <Layoutmain title={"Used"}>
            <Backbar />
            <Card Data={lstData.Post} User={lstData.User} />
            <HeaderBar Data={lstData.Post} />
            <Detail Data={lstData.Post.Descraption} />

        </Layoutmain>
    )
}


export default Make