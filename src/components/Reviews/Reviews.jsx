import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'


export function Reviews() {
    const { id } = useParams();
    const token = useSelector(getTokenSelector);

    const {
        data: reviews,
    } = useQuery({
        queryKey: ['reviews', id],
        queryFn: () => api.getReviewsById(id, token),
        enabled: !!token,
    })


    return (reviews?.map((review) => (
        <div key={review['_id']} className={style.container}>
            <div className={style.avatar}><img alt="" src={review.author.avatar} /></div>
            <div className={style.box__comment}>
                <div className={style.line}>
                    <p>
                        {` ${review.author.name}`}
                    </p>
                    <p>
                        Оценка:
                        {` ${review.rating}`}
                        /5
                    </p>
                </div>
                <div className={style.comment}>
                    <div>Комментарий</div>
                    <div> {`${review.text}`}</div>
                </div>
            </div>
        </div>
    ))
    )
}