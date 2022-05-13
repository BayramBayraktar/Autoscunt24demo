import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMain from '../../layouts'
import ListPage from '../../Containers/lst/index'


export const getServerSideProps = async (contex) => {


    var lstData

    if (!contex.query.pricefrom) {
        const lst = await fetch(`https://createpage2.herokuapp.com/lst`)
        lstData = await lst.json()
    }
    if (contex.query.pricefrom) {
        if (contex.query.priceto) {
            const data = await fetch(`https://createpage2.herokuapp.com/lst?pricefrom=${contex.query.pricefrom}&priceto=${contex.query.priceto}`)
            lstData = await data.json()
        } else {
            const data = await fetch(`https://createpage2.herokuapp.com/lst?pricefrom=${contex.query.pricefrom}`)
            lstData = await data.json()
        }
    }


    return {
        props: {
            ...(await serverSideTranslations(contex.locale, ['home'])),
            lstData
        }
    }
}

const Lst = (props) => {
    return (
        <LayoutMain title="Used cars for sale - AutoScout24">
            <ListPage data={props.lstData} />
        </LayoutMain>
    )
}


export default Lst




