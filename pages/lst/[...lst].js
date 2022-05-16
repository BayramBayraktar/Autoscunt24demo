import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMain from '../../layouts'
import ListPage from '../../containers/lst/index'


export const getServerSideProps = async (contex) => {


    var lstData

    const make = contex.params.lst[0]
    const model = contex.params.lst[1]



    if (!make && !model) {
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
        if (contex.query.priceto) {
            const Price = await fetch(`https://createpage2.herokuapp.com/lst?priceto=${contex.query.priceto}`)
            lstData = await Price.json()
        }
    } else {
        if (make) {

            if (!contex.query.pricefrom) {
                if (model) {
                    const lst = await fetch(`https://createpage2.herokuapp.com/lst/${make}/${model}`)
                    lstData = await lst.json()
                }
                const lst = await fetch(`https://createpage2.herokuapp.com/lst/${make}`)
                lstData = await lst.json()
            }



            if (contex.query.pricefrom) {
                if (make) {
                    const lst = await fetch(`https://createpage2.herokuapp.com/lst/${make}?pricefrom=${contex.query.pricefrom}`)
                    lstData = await lst.json()
                }

                if (model) {
                    const lst = await fetch(`https://createpage2.herokuapp.com/lst/${make}/${model}?pricefrom=${contex.query.pricefrom}`)
                    lstData = await lst.json()
                }

                if (contex.query.priceto) {
                    if (model) {
                        const lst = await fetch(`https://createpage2.herokuapp.com/lst/${make}/${model}?pricefrom=${contex.query.pricefrom}&priceto=${contex.query.priceto}`)
                        lstData = await lst.json()
                    }
                    const lst = await fetch(`https://createpage2.herokuapp.com/lst/${make}?pricefrom=${contex.query.pricefrom}&priceto=${contex.query.priceto}`)
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




