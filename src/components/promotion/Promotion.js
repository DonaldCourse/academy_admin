import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CDropdown, CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CPagination,
    CSpinner
} from '@coreui/react';
import PromotionService from '../../services/PromotionService';
import { DocsLink } from '../../reusable';
import { formatUnit } from '../../utils/unitUtils';
import { formatDate, formatDateTime } from '../../utils/datetimeFormatter';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid'
import PromotionPopup from './PromotionPopup';

// Spinner : Import
import { css, jsx } from '@emotion/react'
import HashLoader from "react-spinners/HashLoader";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

Promotion.propTypes = {

};

const fieldsPromotions = [
    { key: 'id', label: 'STT', sorter: false, filter: false },
    { key: 'type_name', label: 'Loại giảm giá', sorter: false, filter: false },
    { key: 'promotion_discount', label: 'Giảm giá' },
    { key: 'username', label: 'Người tạo' },
    { key: 'description', label: 'Mô tả', _style: { minWidth: '130px' }, sorter: false, filter: false },
    { key: "start_date", label: 'Ngày bắt đầu', _style: { minWidth: '90px' } },
    { key: "expire_date", label: 'Ngày hết hạn', _style: { minWidth: '90px' } },
    { key: "created_at", label: 'Ngày tạo', _style: { minWidth: '90px' } },
    { key: "updated_at", label: 'Cập nhật lúc', _style: { minWidth: '90px' } },
    { key: 'is_active', label: 'Kích hoạt', _style: { minWidth: '100px' }, filter: false },
    { key: 'is_expire', label: 'Hết hạn', _style: { minWidth: '100px' }, filter: false },
    { key: 'actions', label: 'Hoạt động', _style: { minWidth: '50px' }, filter: false },
]

const getBadge = isActive => {
    return isActive ? 'success' : 'danger'
}

const getShowStatus = isActive => {
    return isActive ? 'Đã kích hoạt' : 'Chưa kích hoạt'
}

const getBadgeExpire = isActive => {
    return isActive ? 'danger' : 'success'
}
const getShowExpire = isActive => {
    return isActive ? 'Đã hết hạn' : 'Chưa hết hạn'
}

function Promotion(props) {

    const [promotionTypes, setPromotionTypes] = useState([]);
    const [promotionDiscounts, setPromotionDiscounts] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [openPromotionPopup, setOpenPromotionPopup] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState("#3c4b64");
    useEffect(() => {
        getPromotionType();
        getPromotionDiscount();
    }, []);



    useEffect(() => {
        getPromotions(limit, page);
        return () => {

        }
    }, [page])

    const getPromotionType = () => {
        PromotionService.GetAllPromotionType().then(res => {
            if (res.status == 200) {
                setPromotionTypes(res.data);
            }
        }).catch(err => {

        })
    };

    const getPromotionDiscount = () => {
        PromotionService.GetAllPromotionDiscount().then(res => {
            if (res.status == 200) {
                setPromotionDiscounts(res.data);
            }
        }).catch(err => {

        })
    };

    const getPromotions = (limit, page) => {
        PromotionService.GetAllPromotion(limit, page).then(res => {
            console.log(res);
            if (res.status == 200) {
                setPromotions(res.data.list);
                setTotalPage(res.data.totalPages);
            }
        }).catch(err => {

        })
    };

    const onClosePromotionPopup = () => {
        setOpenPromotionPopup(!openPromotionPopup);
    }

    const pageChange = newPage => {
        setPage(newPage);
    }

    const onHandleActive = async (item) => {
        setLoading(true);
        try {
            const body = {
                isActive: !item.is_active,
                promotionID: item.id
            }
            PromotionService.ActivePromotion(item.id, body).then(res => {
                setLoading(false);
                window.location.reload();
            }).catch(err => {
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
        }
    }

    const onHandleDelete = item => {
        setLoading(true);
        try {
            PromotionService.DeletedPromotion(item.id).then(res => {
                setLoading(false);
                window.location.reload();
            }).catch(err => {
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="backdrop" hidden={!loading}>
                <HashLoader color={color} loading={loading} css={override} size={50} />
            </div>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Danh sách các mã giảm giá
                            <CButton onClick={onClosePromotionPopup} style={{ 'float': 'right' }} title="Thêm mã giảm giá" className="action" color="danger" size="sm">
                                <FontAwesomeIcon icon={faPlusCircle} />
                                Thêm
                            </CButton>
                        </CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={promotions}
                                fields={fieldsPromotions}
                                rowClicked
                                hover
                                sorter
                                striped
                                bordered
                                noItemsView={{ noItems: 'Không có dữ liệu' }}
                                clickableRows
                                size="sm"
                                itemsPerPage={100}
                                pagination
                                scopedSlots={{
                                    'id': (item, index) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {index + 1} </td>
                                    },
                                    'description': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.description} </td>
                                    },
                                    'type_name': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.type_name} </td>
                                    },
                                    'promotion_discount': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.discounts + " " + formatUnit(item.unit)} </td>
                                    },
                                    'username': (item) => {
                                        return <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }}> {item.username} </td>
                                    },
                                    'is_expire':
                                        (item) => (
                                            <td style={{ verticalAlign: 'middle' }}>
                                                <CBadge color={getBadgeExpire(item.is_expire)}>
                                                    {getShowExpire(item.is_expire)}
                                                </CBadge>
                                            </td>
                                        ),
                                    'is_active':
                                        (item) => (
                                            <td style={{ verticalAlign: 'middle' }}>
                                                <CBadge color={getBadge(item.is_active)}>
                                                    {getShowStatus(item.is_active)}
                                                </CBadge>
                                            </td>
                                        ),
                                    'start_date': ({ start_date }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(start_date, true)}</td>;
                                    },
                                    'expire_date': ({ expire_date }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(expire_date, true)}</td>;
                                    },
                                    'created_at': ({ created_at }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(created_at, true)}</td>;
                                    },
                                    'updated_at': ({ updated_at }) => {
                                        return <td style={{ verticalAlign: 'middle' }}>{formatDate(updated_at, true)}</td>;
                                    },
                                    'actions':
                                        (item, index) => {
                                            const canActive = item.is_active
                                            return (
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <CDropdown>
                                                        <CDropdownToggle className="c-header-nav-link" caret={false}>
                                                            <CButton title="Hoạt động" variant="outline" className="action" color="primary" size="sm">
                                                                <CIcon name="cil-options" />
                                                            </CButton>
                                                        </CDropdownToggle>
                                                        <CDropdownMenu className="pt-0" placement="right">
                                                            {(!canActive && !item.is_expire) ?
                                                                <CDropdownItem onClick={() => onHandleActive(item)}>
                                                                    <CButton title="Kích hoạt promotion" variant="outline" className="action" color="primary" size="sm">
                                                                        <CIcon name="cil-check-circle" />
                                                                    </CButton>
                                                                    <span style={{ marginLeft: "5px" }}>Kích hoạt</span>
                                                                </CDropdownItem> : <></>}
                                                            <CDropdownItem>
                                                                <CButton title="Chỉnh promotion" variant="outline" className="action" color="info" size="sm">
                                                                    <CIcon name="cil-pencil" />
                                                                </CButton>
                                                                <span style={{ marginLeft: "5px" }}>Chỉnh sửa</span>
                                                            </CDropdownItem>
                                                            <CDropdownItem onClick={() => onHandleDelete(item)}>
                                                                <CButton title="Xóa promotion" variant="outline" className="action" color="danger" size="sm">
                                                                    <CIcon name="cil-trash" />
                                                                </CButton>
                                                                <span style={{ marginLeft: "5px" }}>Xoá</span>
                                                            </CDropdownItem>
                                                        </CDropdownMenu>
                                                    </CDropdown>
                                                </td>
                                            )
                                        },
                                }}
                            />
                            <CPagination
                                activePage={page}
                                onActivePageChange={pageChange}
                                pages={totalPage}
                                doubleArrows={false}
                                align="center"
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <PromotionPopup open={openPromotionPopup}
                onClose={onClosePromotionPopup}
                defaultValues={{ types: promotionTypes, discounts: promotionDiscounts }}>
            </PromotionPopup>
        </div>
    );
}

export default Promotion;