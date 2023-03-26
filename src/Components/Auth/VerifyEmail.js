import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { postVerifyBookingAppoitment } from "../../service/userService";
import Header from "../Header/Header";
import './VerifyEmail.scss'

const VerifyEmail = (props) => {

    const [statusVerify, setStatusVerify] = useState(false)
    const [errCode, setErrCode] = useState(0)
    const [idEmail, setIdEmail] = useState('')
    const { search } = useLocation();

    let params = useParams();
    let id = params.id

    useEffect(() => {
        verifyEmail()
    }, [])



    const verifyEmail = async () => {
        // let urlParams = new URLSearchParams(props.location.search);
        // let token = urlParams.get('token');

        const parameters = new URLSearchParams(search);
        const token = parameters.get('token');
        const doctorId = parameters.get('doctorId');


        let res = await postVerifyBookingAppoitment({
            token: token,
            doctorId: doctorId
        })
        if (res && res.errCode === 0) {
            setStatusVerify(true)
            setErrCode(res.errCode)
        } else {
            setStatusVerify(true)
            setErrCode(res && res.errCode ? res.errCode : -1)
        }
    }

    return (
        <>
            <Header />

            <div className="verifyEmail-container">
                {
                    statusVerify === false ?
                        <div>
                            Loading data...
                        </div>
                        :
                        <div>
                            {
                                +errCode === 0 ?
                                    <div className="success">
                                        Xác nhận lịch hẹn thành công ✔
                                    </div>
                                    :
                                    <div className="faild">
                                        Lịch hẹn đã tồn tại hoặc được xác nhận!
                                    </div>
                            }
                        </div>
                }
            </div>

        </>
    );
}

export default VerifyEmail;