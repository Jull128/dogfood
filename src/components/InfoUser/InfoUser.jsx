
import style from './style.module.css'



export function InfoUser({ user }) {

    return (
        <div className={style.container}>
            <div><h2>Личный кабинет</h2></div>
            <div className={style.block}>
                <div className={style.avatar}><img alt="" /></div>
                <div>
                    <p>
                        Фамилия Имя :
                        {' '}
                        <span>{user.name}</span>
                    </p>
                    <p>
                        Тип :
                        {' '}
                        <span>{user.about}</span>
                    </p>
                    <p>
                        группа :
                        {' '}
                        <span>{user.group}</span>
                    </p>
                    <p>
                        email :
                        {' '}
                        <span>{user.email}</span>
                    </p>
                </div>

            </div>
        </div>
    )
} 