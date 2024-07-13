
import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
<div className="footer-content">
    <div className="footer-content-left">
<img src={assets.logo} alt="" />
<p>Lorem Isump is simply dummy text of printing and typesetting industry. Lorem ipsum have been the industrys standard dummy text since the 1500s, when an unknwon printer took a gallery of type and scrambled it to make a type specimen book </p>
<div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />
</div>
    </div>

    <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
        </div>

    <div className="footer-coontent-right">
<h2>GET IN TOUCH</h2>
<ul>
    <li>+1-212-456-7890</li>
    <li>contact@tomato.com</li>
</ul>
    </div>
  
</div>
<hr />
<p className="footer-copyright">Copyright 2024 @ Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer