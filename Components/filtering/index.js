import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTranslation } from 'next-i18next'
import TopCars from '../Data/Cars/Tops.json'
import OtherCars from '../Data/Cars/Outher.json'
import Years from '../Data/Years/index.json'
import Prices from '../Data/Price/index.json'
import Countrys from '../Data/FilterCountrys/index.json'
import {
    Wrapper,
    Container,
    Nav,
    VehicleButton,
    VehicleFilterArea,
    SelectContainer,
    ChackedArea,
    CheckBoxs,
    CheckLable,
    InputWrapperSelection,
    InputSlecetSectıon,
    InputSection,
    Input,
    Downİcon,
    InputOptionsWrappre,
    OptionsTitle,
    InputOptions,

} from './style'
import axios from 'axios';

const Index = () => {

    const router = useRouter()
    const { t } = useTranslation()


    const [isActive, setİsActive] = useState('Cars')
    const [ChackedNew, setChackedNew] = useState(false)
    const [ChackedUsed, setChackedUsed] = useState(false)
    const [ChackedPre, setChackedPre] = useState(false)
    const [CarsİnputChange, setCarsİnputChange] = useState(false)
    const [ModelİnputChange, setModelİnputChange] = useState(false)
    const [SelectedCar, setSelectedCar] = useState("")
    const [SearchResultTop, setSearchResultTop] = useState([])
    const [SearchResult, setSearchResult] = useState([])
    const [Models, setModels] = useState([])
    const [SelectedModel, setSelectedModel] = useState("")

    const [YersInputChange, setYersInputChange] = useState(false)
    const [SelecterYear, setSelectedYear] = useState("")

    const [PriceInputChange, setPriceInputChange] = useState(false)
    const [SelectedPrice, setSelectedPrice] = useState("")


    const [CountrysChange, setCountrysChange] = useState(false)
    const [SelectedCountry, setSelectedCountry] = useState("")

    const [Result, setResult] = useState("")


    useEffect(() => {

        setSearchResultTop(TopCars.filter(car => {
            return car.brand.toUpperCase().includes(SelectedCar.toUpperCase())
        }))

        setSearchResult(OtherCars.filter(Car => {
            return Car.brand.toUpperCase().includes(SelectedCar.toUpperCase())
        }))

        if (!SelectedCar) {
            (async () => {
                await axios.get(`http://localhost:5000/lst?pricefrom=${SelectedPrice}`, { withCredentials: true }).then(res => {
                    setResult(res.data)
                })
            })()
        }
        if (SelectedCar) {
            (async () => {
                await axios.get(`http://localhost:5000/lst/${SelectedCar}?pricefrom=${SelectedPrice}`, { withCredentials: true }).then(res => setResult(res.data))
            })()
        }
        if (SelectedModel && SelectedCar) {
            (async () => {
                await axios.get(`http://localhost:5000/lst/${SelectedCar}/${SelectedModel}?pricefrom=${SelectedPrice}`, { withCredentials: true }).then(res => setResult(res.data))
            })()
        }

    }, [SelectedCar, SelectedModel, SelectedPrice])


    //Clearing the model input if the selected car value is equal to an empty value
    useEffect(() => {
        SelectedCar == "" ? setSelectedModel("") : ""
    }, [SelectedCar])



    const hanldeGetCarlst = async () => {
        if (!SelectedCar) {
            router.push(`/lst?pricefrom=${SelectedPrice}`)
        }
        if (SelectedCar) {
            router.push(`/lst/${SelectedCar}?pricefrom=${SelectedPrice}`)
        }

        if (SelectedCar && SelectedModel) {
            router.push(`/lst/${SelectedCar}/${SelectedModel}?pricefrom=${SelectedPrice}`)
        }


    }


    return (
        <Wrapper>
            <Container>
                <Nav>
                    <VehicleButton onClick={() => setİsActive('Cars')} className={isActive == 'Cars' && 'Active'} >{t('home:Cars')}</VehicleButton>
                    <VehicleButton onClick={() => setİsActive('Bikes')} className={isActive == 'Bikes' && 'Active'}>{t('home:Bikes')}</VehicleButton>
                    <VehicleButton onClick={() => setİsActive('Caravan')} className={isActive == 'Caravan' && 'Active'} >{t('home:Caravan')}</VehicleButton>
                    <VehicleButton onClick={() => setİsActive('Transporter')} className={isActive == 'Transporter' && 'Active'}>{t('home:Trnsporter')}</VehicleButton>
                    <VehicleButton onClick={() => setİsActive('Trailer')} className={isActive == 'Trailer' && 'Active'}>{t('home:Trailer')}</VehicleButton>
                </Nav>

                <VehicleFilterArea>
                    <SelectContainer>
                        <ChackedArea onClick={() => setChackedNew(!ChackedNew)}>
                            <CheckBoxs bgChacked={ChackedNew ? "data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E%3C/style%3E%3Cpath d='M9 19c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 16.6 19.3 6.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z' fill='%23333'/%3E%3C/svg%3E" : ""} type="checkbox" id='New' />
                            <CheckLable htmlFor="New" >{t('home:New')}</CheckLable>
                        </ChackedArea>

                        <ChackedArea onClick={() => setChackedUsed(!ChackedUsed)}>
                            <CheckBoxs bgChacked={ChackedUsed ? "data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E%3C/style%3E%3Cpath d='M9 19c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 16.6 19.3 6.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z' fill='%23333'/%3E%3C/svg%3E" : ""} type="checkbox" id="Used" />
                            <CheckLable htmlFor="Used" >{t('home:Used')}</CheckLable>
                        </ChackedArea>

                        <ChackedArea onClick={() => setChackedPre(!ChackedPre)}>
                            <CheckBoxs bgChacked={ChackedPre ? "data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 24 24' xml:space='preserve'%3E%3Cstyle%3E%3C/style%3E%3Cpath d='M9 19c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 16.6 19.3 6.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z' fill='%23333'/%3E%3C/svg%3E" : ""} type="checkbox" id="Pre" />
                            <CheckLable htmlFor="Pre" >{t('home:PreRegister')}</CheckLable>
                        </ChackedArea>

                    </SelectContainer>

                    <InputWrapperSelection>
                        <InputSlecetSectıon>
                            <InputSection>
                                <Input onChange={(e) => setSelectedCar(e.target.value)} type="text" value={SelectedCar} onFocus={() => setCarsİnputChange(true)} alt='CarSelect' placeholder={t('home:Make')} />
                                <Downİcon src='/Drop.png' alt='SelectCar' />

                                {CarsİnputChange &&
                                    <InputOptionsWrappre>
                                        <OutsideClickHandler onOutsideClick={() => setCarsİnputChange(false)}>

                                            {SearchResultTop.length > 0 && <OptionsTitle>Top Makes</OptionsTitle>}

                                            {SearchResultTop.map(Car => (
                                                <InputOptions onClick={() => { setSelectedCar(Car.brand); setModels(Car.models); setCarsİnputChange(false) }} >{Car.brand}</InputOptions>
                                            ))}

                                            {SearchResult.length > 0 && <OptionsTitle>Other Makes</OptionsTitle>}

                                            {SearchResult.map(Car => (
                                                <InputOptions onClick={() => { setSelectedCar(Car.brand); setModels(Car.models); setCarsİnputChange(false) }}>{Car.brand}</InputOptions>
                                            ))}

                                        </OutsideClickHandler>
                                    </InputOptionsWrappre>}
                            </InputSection>

                            <InputSection>
                                <Input type="text" alt='CarModel' value={SelectedModel} placeholder={SelectedModel ? SelectedModel : "Model"} onFocus={() => setModelİnputChange(true)} disabled={SelectedCar == "" ? true : false} />
                                <Downİcon src='/Drop.png' alt='SelectCar' />

                                {ModelİnputChange &&
                                    <InputOptionsWrappre>
                                        <OutsideClickHandler onOutsideClick={() => setModelİnputChange(false)}>

                                            {Models.map(CarModel => (
                                                <InputOptions onClick={() => { setSelectedModel(CarModel); setModelİnputChange(false) }} >{CarModel}</InputOptions>
                                            ))}

                                        </OutsideClickHandler>
                                    </InputOptionsWrappre>}
                            </InputSection>

                            <InputSection>
                                <Input onChange={(e) => setSelectedYear(e.target.value)} type="text" alt='FirsRegistration' value={SelecterYear} placeholder={t("home:FirstRegistration")} onFocus={() => setYersInputChange(true)} />
                                <Downİcon src='/Drop.png' alt='SelectCar' />

                                {YersInputChange &&
                                    <InputOptionsWrappre>
                                        <OutsideClickHandler onOutsideClick={() => setYersInputChange(false)} >
                                            {Years.map(Year => (
                                                <InputOptions onClick={() => { setSelectedYear(Year); setYersInputChange(false) }} >{Year}</InputOptions>
                                            ))}
                                        </OutsideClickHandler>
                                    </InputOptionsWrappre>}
                            </InputSection>

                            <InputSection>
                                <Input onChange={(e) => setSelectedPrice(e.target.value)} type="text" alt='Price' value={SelectedPrice} placeholder={t('home:Price')} onFocus={() => setPriceInputChange(true)} />
                                <Downİcon src='/Drop.png' alt='SelectCar' />

                                {PriceInputChange &&
                                    <InputOptionsWrappre>
                                        <OutsideClickHandler onOutsideClick={() => setPriceInputChange(false)} >
                                            {Prices.map(Price => (
                                                <InputOptions onClick={() => { setSelectedPrice(Price); setPriceInputChange(false) }} > ${Price}</InputOptions>
                                            ))}
                                        </OutsideClickHandler>
                                    </InputOptionsWrappre>}
                            </InputSection>


                            <InputSection>
                                <Input type="button" alt='Country' className='Country' imgUrl={SelectedCountry === "" ? 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg' : SelectedCountry.Flag} value={SelectedCountry === "" ? 'Europa' : SelectedCountry.Country} onClick={() => setCountrysChange(true)} />
                                <Downİcon src='/Drop.png' alt='SelectCar' />

                                {CountrysChange &&
                                    <InputOptionsWrappre>
                                        <OutsideClickHandler onOutsideClick={() => setCountrysChange(false)} >
                                            {Countrys.map((item) => (
                                                <InputOptions className='Country' imgUrl={item.Flag} onClick={() => { setSelectedCountry(item); setCountrysChange(false) }} >{item.Country}</InputOptions>
                                            ))}
                                        </OutsideClickHandler>
                                    </InputOptionsWrappre>}
                            </InputSection>

                            <InputSection>
                                <Input type="button" onClick={() => hanldeGetCarlst()} className='result' value={Result.length + " result"} />
                            </InputSection>
                        </InputSlecetSectıon>
                    </InputWrapperSelection>

                </VehicleFilterArea>
            </Container>
        </Wrapper>
    )
}

export default Index