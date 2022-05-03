import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMain from '../../Layouts/Main'
import ListPage from '../../Containers/lst/index'


export const getServerSideProps = async (contex) => {


    var lstData

    const make = contex.params.lst[0]
    const model = contex.params.lst[1]


    if (!make && !model) {
        if (!contex.query.pricefrom) {
            const lst = await fetch(`http://localhost:5000/lst`)
            lstData = await lst.json()
        }
        if (contex.query.pricefrom) {
            if (contex.query.priceto) {
                const data = await fetch(`http://localhost:5000/lst?pricefrom=${contex.query.pricefrom}&priceto=${contex.query.priceto}`)
                lstData = await data.json()
            } else {
                const data = await fetch(`http://localhost:5000/lst?pricefrom=${contex.query.pricefrom}`)
                lstData = await data.json()
            }
        }
        if (contex.query.priceto) {
            const Price = await fetch(`http://localhost:5000/lst?priceto=${contex.query.priceto}`)
            lstData = await Price.json()
        }
    } else {
        if (make) {

            if (!contex.query.pricefrom) {
                if (model) {
                    const lst = await fetch(`http://localhost:5000/lst/${make}/${model}`)
                    lstData = await lst.json()
                }
                const lst = await fetch(`http://localhost:5000/lst/${make}`)
                lstData = await lst.json()
            }
            if (contex.query.pricefrom) {
                if (contex.query.priceto) {
                    if (model) {
                        const lst = await fetch(`http://localhost:5000/lst/${make}/${model}?pricefrom=${contex.query.pricefrom}&priceto=${contex.query.priceto}`)
                        lstData = await lst.json()
                    }
                    const lst = await fetch(`http://localhost:5000/lst/${make}?pricefrom=${contex.query.pricefrom}&priceto=${contex.query.priceto}`)
                    lstData = await lst.json()
                }

                if (model) {
                    const lst = await fetch(`http://localhost:5000/lst/${make}/${model}?pricefrom=${contex.query.pricefrom}`)
                    lstData = await lst.json()
                }

            }


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




