
function Footer() {
  return (
    // Footer
    <footer className="container-fluid footer_area section_padding_130_0">
      <div className="container">
        <div className="row">
          {/* Single Widget */}
          <div className="col-12 col-sm-6 col-lg-4 battambang">
            <div className="single-footer-widget section_padding_0_130">
              {/* Footer Logo */}
              <div className="footer-logo mb-3"></div>
              <p>អនុវិទ្យាល័យមោង គឺជាអនុវិទ្យាល័យមួយដែលស្ថិតនៅក្នុង​ភូមិមោងជើង ឃុំមោង ស្រុកស្រីស្នំ ខេត្តសៀមរាប</p>
              {/* Copywrite Text */}
              <div className="copywrite-text mb-5">
                <p className="mb-0">អភិវឌ្ឍន៍គេហទំព័រដោយ ៖<i className="lni-heart mr-1"></i><a className="ml-1" href="https://www.facebook.com/sambrathnajr">ខុង សំប្រាថ្នា</a></p>
              </div>
              {/* Footer Social Area */}
              <div className="footer_social_area"><a href="http://bit.ly/3G51ox2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i className="fa fa-facebook"></i></a><a href="https://t.me/sambrathna20" data-toggle="tooltip" data-placement="top" title="" data-original-title="telegram"><i className="fa fa-telegram"></i></a><a href="mailto:khongsambrathna.me@gmail.com" data-toggle="tooltip" data-placement="top" title="" data-original-title="envelope"><i className="fa fa-envelope"></i></a><a href="tel:+85585925752" data-toggle="tooltip" data-placement="top" title="" data-original-title="phone"><i className="fa fa-phone"></i></a></div>
            </div>
          </div>
          {/* Single Widget */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title */}
              <h5 className="widget-title koulen">អាស័យដ្ឋាន</h5>
              {/* Footer Menu */}
              <div className="footer_menu battambang">
                <ul>
                  <li><a>ភូមិមោងជើង ឃុំមោង ស្រុកស្រីស្នំ ខេត្តសៀមរាប</a></li>
                  <li><a href="https://maps.app.goo.gl/AneCEq83vD659bGS8">ផែនទី​ហ្គូហ្គល</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single Widget */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title */}
              <h5 className="widget-title koulen">ទាញយក</h5>
              {/* Footer Menu */}
              <div className="footer_menu battambang">
                <ul>
                  <li><a href={`${import.meta.env.VITE_API_URL}/logo/moung.jpg`} target="_blank">ឡោហ្គោ</a></li>
                  <li><a href="#">ពាក្យសុំច្បាប់</a></li>
                  <li><a href="#">ពាក្យសុំចូលរៀន</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Single Widget */}
          <div className="col-12 col-sm-6 col-lg">
            <div className="single-footer-widget section_padding_0_130">
              {/* Widget Title */}
              <h5 className="widget-title koulen">ទំនាក់ទំនង</h5>
              {/* Footer Menu */}
              <div className="footer_menu battambang">
                <ul>
                  <li><a href="tel:+85585925752">ហៅទូស័ព្ទ</a></li>
                  <li><a href="mailto:khongsambrathna.me@gmail.com">ផ្ញើរអ៊ីម៉ែល</a></li>
                  <li><a href="https://t.me/sambrathnajr">ផ្ញើរតេលេក្រាម</a></li>
                  <li><a href="http://bit.ly/3G51ox2">ផ្ញើរឆាត</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
