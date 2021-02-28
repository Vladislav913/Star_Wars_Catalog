import React, {useState} from 'react';
import {useEffect} from "react";
import {getData} from "../../api/cardListApi";
import Card from "../Card/Card";
import avatar from '../../assets/image/images.jpg';
import "./cardList.css"

const CardList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData().then(function (response) {
            setData(response.data.results)
        }).catch(function (error) {
            alert('Произошла ошибка')
        })
    }, []);

    const setComment = (name, value) => {
        setData([
            ...data.map(i => {
                if (i.name === name) {
                    return {
                        ...i,
                        comment: value
                    }
                } else {
                    return i
                }
            })
        ])
    };

    return (
        <section className="catalogList">
            <div className='container'>
                <div className='catalogList__wrap'>
                    <ul>
                        {data.length > 0 ? data.map((item, index) => {
                            return <Card
                                key={index}
                                name={item.name}
                                birth_year={item.birth_year}
                                comment={item.comment}
                                setComment={setComment}
                                avatar={avatar}
                            />
                        }) : null}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default CardList