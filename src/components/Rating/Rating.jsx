import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import { getTokenSelector } from "../../redux/slices/tokenSlice";
import style from './style.module.css'


export function Rating() {
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
    const ratingCount = reviews && reviews.length

    let ratings;
    setTimeout(() => {
        ratings = document.querySelectorAll("#rate");
        if (ratings.length > 0) {
            initRating()
        }
    }, 10)

    function initRating(i = ratingByProduct) {
        const percent = i / 0.05;
        let ratingActive = ratings[0].querySelector('#rateActive');
        ratingActive.style.width = `${percent}%`
    }

    function ratingCountFun(ratingCount, words) {
        ratingCount = Math.abs(ratingCount) % 100;
        let num = ratingCount % 10;
        if (ratingCount > 10 && ratingCount < 20) return words[2];
        if (num > 1 && num < 5) return words[1];
        if (num === 1) return words[0];
        return words[2];
    }

    return (
        <div className={style.container}>
            <div className={style.rate} id='rate'>
                <div className={style.rateActive} id='rateActive'></div>
                <div className={style.rateAll}>
                    <input className={style.rateItem} type="radio" id="star-1" name="rating" value="1"></input>
                    <input className={style.rateItem} type="radio" id="star-2" name="rating" value="2"></input>
                    <input className={style.rateItem} type="radio" id="star-3" name="rating" value="3"></input>
                    <input className={style.rateItem} type="radio" id="star-4" name="rating" value="4"></input>
                    <input className={style.rateItem} type="radio" id="star-5" name="rating" value="5"></input>
                </div>
            </div>
            <div>
                {ratingCount}
                {ratingCountFun(ratingCount, [' отзыв', ' отзыва', ' отзывов'])}
            </div>
        </div>
    )
}