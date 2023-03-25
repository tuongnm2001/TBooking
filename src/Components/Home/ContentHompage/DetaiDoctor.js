import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailInforDoctor } from "../../../service/userService";
import DoctorSchedule from "../../Admin/Content/DoctorSchedule/DoctorSchedule";
import Header from "../../Header/Header";
import './DetailDoctor.scss'
import DoctorExtraInfor from "./DoctorExtraInfor";

const DetailDoctor = (props) => {

    const [detailDoctors, setDetailDoctors] = useState({})

    let params = useParams();

    let id = params.id

    useEffect(() => {
        getInforDoctor()
    }, [])

    const getInforDoctor = async () => {
        let res = await getDetailInforDoctor(id)
        if (res.errCode === 0) {
            setDetailDoctors(res.data)
        }
    }

    let nameVi = ''

    if (detailDoctors && detailDoctors.positionData) {
        nameVi = `${detailDoctors.positionData.valueVi}, ${detailDoctors.lastName} ${detailDoctors.firstName}`
    }

    return (
        <>

            <Header />

            <div className="doctor-detail-container">

                <div className="intro-doctor">
                    <div className="content-left">
                        <img src={detailDoctors.image} />
                    </div>

                    <div className="content-right">
                        <div className="up">
                            {`${nameVi}`}
                        </div>

                        <div className="down">
                            {
                                detailDoctors.Markdown && detailDoctors.Markdown.description
                                &&
                                <span>
                                    {detailDoctors.Markdown.description}
                                </span>

                            }
                        </div>
                    </div>
                </div>

                <div className="schedule-doctor">
                    <div className="content-left">
                        <DoctorSchedule />
                    </div>

                    <div className="content-right">
                        <DoctorExtraInfor />
                    </div>
                </div>

                <div className="detail-doctor">
                    {
                        detailDoctors && detailDoctors.Markdown && detailDoctors.Markdown.contentHTML
                        &&
                        <div dangerouslySetInnerHTML={{
                            __html: detailDoctors.Markdown.contentHTML
                        }} />
                    }
                </div>

                <div className="commnet-doctor">

                </div>
            </div>
        </>
    );
}

export default DetailDoctor;