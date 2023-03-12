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

    const ratingByProduct = reviews && ((reviews.reduce((acc, val) => acc + +val.rating, 0)) / reviews.length).toFixed(1);
    const ratings = document.querySelectorAll(".style_rate__9tXTT")

    if (ratings.length) {
        initRating()
    }

    function initRating(i = ratingByProduct) {
        const percent = i / 0.05;
        const ratingActive = ratings[0].querySelector('.style_rateActive__hcYwV');
        ratingActive.style.width = `${percent}%`
    }


    return (
        <div className={style.container}>
            <div className={style.rate}>
                <div className={style.rateActive}></div>
                <div className={style.rateAll}>
                    <input className={style.rateItem} type="radio" id="star-1" name="rating" value="1"></input>
                    <input className={style.rateItem} type="radio" id="star-2" name="rating" value="2"></input>
                    <input className={style.rateItem} type="radio" id="star-3" name="rating" value="3"></input>
                    <input className={style.rateItem} type="radio" id="star-4" name="rating" value="4"></input>
                    <input className={style.rateItem} type="radio" id="star-5" name="rating" value="5"></input>
                </div>
            </div>
            <div>{ratingByProduct}</div>
        </div>
    )
}