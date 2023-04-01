import './Footer.scss'

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-info">
                                <h3>TuongNM2001</h3>
                                <p>
                                    Số 01, Hồ Bá Kiện, Phường 15, Quận 10 , Thành phố Hồ Chí Minh<br /><br />
                                    <strong>Phone:</strong> +84865093330<br />
                                    <strong>Email:</strong> tuongnm2001@gmail.com<br />
                                </p>
                                <div className="social-links mt-3">
                                    <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                                    <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                                    <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <span>Home</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>About us</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>Services</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>Terms of service</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>Privacy policy</span></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><i className="bx bx-chevron-right"></i> <span>Web Design</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>Web Development</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>Product Management</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>Marketing</span></li>
                                <li><i className="bx bx-chevron-right"></i> <span>Graphic Design</span></li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-6 footer-newsletter">
                            <h4>Our Newsletter</h4>
                            <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                            <form method="post">
                                <input type="email" name="email" /><input type="submit" value="Subscribe" />
                            </form>

                        </div>

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="copyright">
                    &copy; Copyright <strong><span>Medicio</span></strong>. All Rights Reserved 2023
                </div>
                <div className="credits">

                    Designed by <a href="https://www.linkedin.com/in/nguyenminhtuong/">TuongNM2001</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;