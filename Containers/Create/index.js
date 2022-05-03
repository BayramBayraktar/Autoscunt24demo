import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import OutsideClickHandler from 'react-outside-click-handler';
import CarTops from '../../Components/Data/Cars/Tops.json'
import CarOuther from '../../Components/Data/Cars/Outher.json'
import Priceİnput from '../../mask/PriceInput'
import KmInput from '../../mask/KmInput'
import axios from 'axios';


import {
    Wrapper,
    Container,
    Title,
    İnputContainer,
    İnputDropMenu,
    İnput,
    TextArea,
    Label,
    Button,
    List,
    İtem
} from './style';

const CreatePage = () => {

    const router = useRouter();

    const [Show, setShow] = useState("")
    const [make, setmake] = useState("")
    const [models, setmodels] = useState("")
    const [model, setmodel] = useState("")
    const [Price, setPrice] = useState("")
    const [km, setkm] = useState("")
    const [first, setfirst] = useState("")
    const [photos, setphotos] = useState("")
    const [Getriebe, setGetriebe] = useState("")
    const [Komfort, setKomfort] = useState("")
    const [Sicht, setSicht] = useState("")
    const [Sicherheit, setSicherheit] = useState("")
    const [Entertainment, setEntertainment] = useState("")
    const [PostedByDescraption, setPostedByDescraption] = useState("")



    const handleCarAndmodels = (make, models) => {
        setmake(make);
        setmodels(models);
        setShow("");
    }


    const hanldeCreatePost = async (e) => {

        const formData = new FormData()
        for (let i = 0; i < photos.length; i++) {
            formData.append('photos', photos[i]);
        }

        formData.append('make', make)
        formData.append('model', model)
        formData.append('price', Price)
        formData.append('km', km)
        formData.append('firstRegistration', first)
        formData.append('Getriebe', Getriebe)
        formData.append('Komfort', Komfort)
        formData.append('Sicht', Sicht)
        formData.append('Sicherheit', Sicherheit)
        formData.append('Entertainment', Entertainment)
        formData.append('PostedByDescraption', PostedByDescraption)


        await axios.post('http://localhost:5000/create', formData, { withCredentials: true }).then((response) => {
            if (response.data == "unsuccessful") {
                router.push('/login')
            }
        })

    }



    return (
        <Wrapper>
            <Container >

                <Title>Clock Your Car</Title>

                <İnputContainer>
                    <Label htmlFor='make'>make</Label>
                    <İnputDropMenu >
                        <İnput onClick={() => setShow("make")} required value={make == "" ? "make" : make} type="text" id='make' alt='make' name='make' placeholder='make' />
                        {Show == "make" && <List>
                            <OutsideClickHandler onOutsideClick={() => setShow("")}>
                                {CarTops.map((car, i) => (
                                    <İtem key={i} onClick={() => handleCarAndmodels(car.brand, car.models)} >{car.brand}</İtem>
                                ))}
                                {CarOuther.map((car, i) => (
                                    <İtem key={i} onClick={() => handleCarAndmodels(car.brand, car.models)} >{car.brand}</İtem>
                                ))}

                            </OutsideClickHandler>
                        </List>}
                    </İnputDropMenu>
                </İnputContainer>

                <İnputContainer>
                    <Label htmlFor='model'>model</Label>
                    <İnputDropMenu >
                        <İnput disabled={make == "" && true} onClick={() => setShow("model")} required value={model == "" ? "model" : model} type="text" id='model' alt='model' name='model' placeholder='model' />
                        {Show == "model" && <List>
                            <OutsideClickHandler onOutsideClick={() => setShow("")}>
                                {models.map((model, i) => (
                                    <İtem key={i} onClick={() => { setmodel(model); setShow("") }}>{model}</İtem>
                                ))}
                            </OutsideClickHandler>
                        </List>}
                    </İnputDropMenu>
                </İnputContainer>


                <İnputContainer>
                    <Label htmlFor='price'>Price</Label>
                    <İnputDropMenu >
                        <Priceİnput onChange={(e) => setPrice(e.target.value)} value={Price} id="price" className="Style" required placeholder="$0.00" type="text" />
                    </İnputDropMenu>
                </İnputContainer>


                <İnputContainer>
                    <Label htmlFor='km'>km</Label>
                    <İnputDropMenu >
                        <KmInput onChange={(e) => setkm(e.target.value)} value={km} id="km" className="Style" placeholder="km" type="text" />
                    </İnputDropMenu>
                </İnputContainer>


                <İnputContainer>
                    <Label htmlFor='Year'>Year</Label>
                    <İnputDropMenu >
                        <İnput required onChange={(e) => setfirst(e.target.value)} value={first} type="date" id='Year' placeholder="2013-01-08" alt='Year' name='Year' />
                    </İnputDropMenu>
                </İnputContainer>


                <İnputContainer>
                    <Label htmlFor='Photos'>Photos</Label>
                    <İnputDropMenu >
                        <İnput onChange={e => setphotos(e.target.files)} required type="file" multiple id='Photos' alt='Photos' name='photos' placeholder='Photos' />
                    </İnputDropMenu>
                </İnputContainer>


                <İnputContainer>
                    <Label htmlFor='Getriebe'>Getriebe</Label>
                    <İnputDropMenu >
                        <TextArea onChange={(e) => setGetriebe(e.target.value)} value={Getriebe} id='Getriebe' alt='Getriebe' name='Getriebe' placeholder='Getriebe' />
                    </İnputDropMenu>
                </İnputContainer>


                <İnputContainer>
                    <Label htmlFor='Komfort'>Komfort</Label>
                    <İnputDropMenu >
                        <TextArea onChange={(e) => setKomfort(e.target.value)} value={Komfort} id='Komfort' alt='Komfort' name='Komfort' placeholder='Komfort' />
                    </İnputDropMenu>
                </İnputContainer>

                <İnputContainer>
                    <Label htmlFor='Sicht'>Sicht</Label>
                    <İnputDropMenu >
                        <TextArea onChange={(e) => setSicht(e.target.value)} value={Sicht} id='Sicht' alt='Sicht' name='Sicht' placeholder='Sicht' />
                    </İnputDropMenu>
                </İnputContainer>

                <İnputContainer>
                    <Label htmlFor='Sicherheit'>Sicherheit</Label>
                    <İnputDropMenu >
                        <TextArea onChange={(e) => setSicherheit(e.target.value)} value={Sicherheit} id='Sicherheit' alt='Sicherheit' name='Sicherheit' placeholder='Sicherheit' />
                    </İnputDropMenu>
                </İnputContainer>

                <İnputContainer>
                    <Label htmlFor='Entertainment'>Entertainment</Label>
                    <İnputDropMenu >
                        <TextArea onChange={(e) => setEntertainment(e.target.value)} value={Entertainment} id='Entertainment' alt='Entertainment' name='Entertainment' placeholder='Entertainment' />
                    </İnputDropMenu>
                </İnputContainer>


                <İnputContainer>
                    <Label htmlFor='PostedByDescraption'>PostedByDescraption</Label>
                    <İnputDropMenu >
                        <TextArea onChange={(e) => setPostedByDescraption(e.target.value)} value={PostedByDescraption} id='PostedByDescraption' alt='PostedByDescraption' name='PostedByDescraption' placeholder='PostedByDescraption' />
                    </İnputDropMenu>
                </İnputContainer>

                <İnputContainer>
                    <Button onClick={() => hanldeCreatePost()} > Add Post</Button >
                </İnputContainer>
            </Container >
            <Container>
                <img src="https://wallpaperforu.com/wp-content/uploads/2020/12/car-wallpaper-2012211339497-scaled.jpg" alt="" />
            </Container>

        </Wrapper>

    )
}

export default CreatePage