import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
import {
    Wrapper,
    Section,
    BannerCar,
    Container,
    Title,
    İnputContainer,
    Label,
    İnput,
    ButtonContainer,
    Button
} from './style'
const Register = () => {


    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")

    const [message, setMessage] = useState("")


    const handlelogin = async () => {
        const obj = {
            email: email,
            password: password
        }

        await axios.post(`${process.env.NEXT_PUBLIC_ANALYTICS_ID}/login`, obj).then((response) => {
            try {
                if (response.data == "successful") {
                    Router.push('/create')
                } else {
                    setMessage(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }



    return (
        <Wrapper>
            <Section>
                <BannerCar src='https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='bgCar' />
            </Section>
            <Section>
                <Container>
                    <Title>Login</Title>

                    <İnputContainer>
                        <Label htmlFor='email'>Email</Label>
                        <İnput type="email" id='email' onChange={(e) => setEmail(e.target.value)} required={email.length >= 1 && true} placeholder='Email..' name='email' />
                        <span>{message == "notEmail" && "no such email record"}</span>
                    </İnputContainer>

                    <İnputContainer>
                        <Label id='password'>Password</Label>
                        <İnput type="password" id='password' onChange={(e) => setpassword(e.target.value)} minLength="3" required={password.length >= 1 && true} placeholder='password..' inputMode='numeric' name='password' />
                        <span>{message == "notPassword" && "no such email record"}</span>
                    </İnputContainer>

                    <ButtonContainer>
                        <Button onClick={() => handlelogin()}>Login</Button>
                        <Link href="/register">
                            <Button className='login'>
                                {'Sign up   >'}
                            </Button>
                        </Link>
                    </ButtonContainer>

                </Container>
            </Section>
        </Wrapper>
    )
}

export default Register