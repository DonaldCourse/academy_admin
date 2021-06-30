import { postAPI, getAPI, delAPI } from './index';

const CreatePromotionType = data => {
    return postAPI('/api/promotion-types', data);
};

const GetAllPromotionType = () => {
    return getAPI('/api/promotion-types')
};

const CreatePromotionDiscount = data => {
    return postAPI('/api/promotion-discounts', data);
};

const GetAllPromotionDiscount = () => {
    return getAPI('/api/promotion-discounts')
};

const CreatePromotion = data => {
    return postAPI('/api/promotions', data);
};

const GetAllPromotion = (limit, page) => {
    return getAPI(`/api/promotions?limit=${limit}&page=${page}`)
};

const ActivePromotion = (id, body) => {
    return postAPI(`/api/promotions/${id}`, body)
};

const DeletedPromotion = (id) => {
    return delAPI(`/api/promotions/${id}`)
};

export default {
    GetAllPromotion,
    GetAllPromotionType,
    GetAllPromotionDiscount,
    CreatePromotion,
    CreatePromotionType,
    CreatePromotionDiscount,
    ActivePromotion,
    DeletedPromotion
};
