import ManSys from '../../assets/management_system.png';
import Imglayout from '../../assets/monglayout.png'
function About() {
  return (
        <div className="container battambang text-justify">
        <div className="row">
            <div className="col-xl-7">
                <article className="article">
                    {/* រចនាសម្ព័ន្ធគ្រប់គ្រង */}
                    <a name="structure"></a>
                    <h4 className="koulen text-center">រចនាសម្ព័ន្ធគ្រប់គ្រង</h4>
                    <img className="w-100" src={ManSys} alt="School management"/>
                    {/* ចក្ខុវិស័យ */}
                    <a name="vision"></a>
                    <h4 className="koulen text-center">ចក្ខុវិស័យ</h4>
                    <p>
                        អនុវិទ្យាល័យមោង ធានាផ្ដល់សេវាអប់រំដែលមានគុណភាព ប្រសិទ្ធភាព ប្រកបដោយសមធម៍
                        បរិបន្នសម្រាប់កុមារដែលរៀនចប់ថ្នាក់ទី៦ ដោយផ្ដល់លទ្ធភាព និងគាំទ្រតាមជម្រើសផ្សេងៗ
                        សម្រាប់ការសិក្សាពេញមួយជីវិត ដើម្បីប្រែក្លាយឱ្យទៅជាកុមារមេត្រីកម្រិតអភិវឌ្ឍ។
                    </p>
                    <a name="mission"></a>
                    <h4 className="koulen text-center">បេសកកម្ម</h4>
                    <p>
                        អនុវិទ្យាល័យមោង គ្រប់គ្រង ដឹកនាំការបង្រៀននិងរៀន ប្រកបដោយប្រសិទ្ធភាពខ្ពស់ និង សហការ
                        ល្អជាមួយសហគមន៍អាជ្ងាធរដែនដីគ្រប់លំដាប់ថ្នាក់ អង្គការដៃគូរអភិវឌ្ឍ សប្បុរសជននានា ដើម្បីប្រែក្លាយឱ្យទៅជាកុមារមេត្រីកម្រិតអភិវឌ្ឍ
                        សាលារៀនឱ្យក្លាយទៅជាមជ្ឈមណ្ឌលផ្ដល់ចំណេះដឹងពេញលេញសម្រាប់សិស្សានុសិស្សក្នុងការកសាងធនធាន មនុស្សឱ្យ
                        ឆ្លើយតមទៅនឹង គោលនយោបាយអប់រំ និងគោលដៅអភិវឌ្ឍប្រកបដោយចីរភាពស្របតាមយុគសម័យថ្មីបច្ចេកវិទ្យា
                        ឧស្សាហកម្ម ៤.០(ឌីជីថល)។
                    </p>
                </article>
            </div>
            <div className="col-xl-5">
                <article className="article">
                    <a name="schoollayout"></a>
                    {/*ប្លង់សាលារៀន*/}
                    <h4 className="koulen text-center">ប្លង់សាលារៀន</h4>
                    <img className="w-100" src={Imglayout} alt="layout"/>
                </article>
            </div>
        </div>
    </div>
  )
}

export default About;

