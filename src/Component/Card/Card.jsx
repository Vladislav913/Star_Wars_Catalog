import './card.css'
import {useState} from "react";

const Card = ({name, birth_year, avatar, setComment, comment}) => {

    const [data, setData] = useState('')
    const [status, changeStatus] = useState(true)

    const onChangeValue = (e) => {
        const value = e.target.value
        setData(value)
    }

    const addComment = () => {
        if (data.length > 0) {
            setComment(name, data)
            setData('')
            changeStatus(false)
        }
    }

    return (
        <li className="card">
            <img className="card__avatar" src={avatar} alt="img"/>
            <div className="card__content">
                <h3 className="card__title">{name}</h3>
                <p className="card__birth">{birth_year}</p>
                {comment ?
                    <p className="cart__comment-text">{comment}</p> : null}
                {status ?
                    <div className="card__comment">
                        <textarea onChange={onChangeValue}
                                  value={data}
                                  className="card__textarea"
                                  name="comment"></textarea>
                        <button onClick={addComment} className="card__btn">Add</button>
                    </div> : null
                }
            </div>
        </li>
    )
}

export default Card