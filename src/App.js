import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import './AppStyle.css';
import './Normalize.css';
import logo from './images/logo.svg';
import conference_img from './images/conference-img.svg';
import support_logo1 from './images/support_logo1.png'
import support_logo2 from './images/support_logo2.png'
import support_logo3 from './images/support_logo3.png'
import support_logo4 from './images/support_logo4.png'
import support_logo5 from './images/support_logo5.png'
import video_available from './images/beforetranslation.svg'
import beforetranslationchat from './images/beforetranslationchat.svg'
import policy from '../src/files/policy.pdf';
import { authLogin, getStatus } from "./store/actions/auth";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.recaptchaRef = React.createRef();
  }
  
  state = {
    first_name: "",
    last_name: "",
    nickname: "",
    region: 0,
    name_organization: "",
    email: "",
    rules_bool: "",
    translation_frame: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239031&hash=71bf506d94d84b31" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    //translation_frame: null,

    streamed_frame: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239022&hash=19acaeb5fb17550c&hd=2" width="853" height="480" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame2: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239023&hash=300ca056085b7cd6" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame3: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239024&hash=afaeb9c5633b30f1" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame4: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239025&hash=472df4a991dbab48" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame5: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239026&hash=208e5b3a680abf97" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame6: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239027&hash=af79500a9ca66fe1" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame7: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239028&hash=43e9b59212a8b093" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame8: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239029&hash=f5bf41a884c54fb7" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame9: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239030&hash=450a46eb815abe81" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',
    streamed_frame10: '<iframe src="https://vk.com/video_ext.php?oid=-214262457&id=456239031&hash=71bf506d94d84b31" width="426" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen></iframe>',




    question_1: false,
    question_2: false,
    question_3: false,
    question_4: false,
    question_5: false,
    question_6: false,

    popup: false,
    submit: false,
    mobile_menu: false,
    // true! и раскоментить в index.html
    chat: true
  };

  componentDidMount() {
    this.props.getStatus();
  }

  onSubmitWithReCAPTCHA = async (e) => {
    e.preventDefault();

    if(
      this.state.first_name.length === 0 ||
      this.state.last_name.length === 0 ||
      this.state.region < 1 ||
      this.state.name_organization.length === 0 ||
      this.state.email.length === 0 ||
      !this.state.rules_bool
      )
      return this.setState({...this.state, submit: true});

    const cyrillicValidationRegex = /^[а-яА-ЯёЁë]{1,}[\s-]{0,1}[а-яА-ЯёЁë]{1,}$/u;
    const RegexEmail = /^[a-zA-Z0-9]{1,}[-.]{0,}[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1}[-]{0,}[a-zA-Z0-9]{1,}\.[A-Za-z]{1,}$/;
    if(
      cyrillicValidationRegex.test(this.state.first_name) &&
      cyrillicValidationRegex.test(this.state.last_name) &&
      ((this.state.nickname.length > 0 && cyrillicValidationRegex.test(this.state.nickname)) || this.state.nickname.length === 0) &&
      !cyrillicValidationRegex.test(this.state.email) && RegexEmail.test(this.state.email)
      ) console.log("true");
    else return console.log("false");

    console.log("Начинаем проверку на бота");

    const token = await this.recaptchaRef.current.executeAsync();

    const result = this.props.authLogin(token, this.state.first_name, this.state.last_name, this.state.nickname, this.state.region, this.state.name_organization, this.state.email, this.state.rules_bool);
    
    if(result) 
      this.setState({...this.state, popup: true, submit: false});

    console.log(this.props.auth);
  }

  render() {
    return (
      <div>        
        <header className="header">
          <div className="container">
            <div className="header__inner">
              <a className="logo" href="/">
                <img src={logo} alt="logo" className="logo__img" />
              </a>
              <nav className={(this.state.mobile_menu ? "menu active" : "menu")}>
                <ul className="menu__list">
                  {
                    this.props.auth.status_auth !== null ?
                    <li className="menu__item">
                      <a className="menu__link link" href="#stream" onClick={() => this.setState({...this.state, mobile_menu: false })}>Трансляция</a>
                    </li>
                    :
                    <React.Fragment />
                  }
                  <li className="menu__item">
                    <a className="menu__link link" href="#schedule" onClick={() => this.setState({...this.state, mobile_menu: false })}>Расписание</a>
                  </li>
                  <li className="menu__item">
                    <a className="menu__link link" href="#questions" onClick={() => this.setState({...this.state, mobile_menu: false })}>Вопросы</a>
                  </li>
                  {
                    this.props.auth.status_auth === null ?
                    <li className="menu__item">
                      <a className="link-registration link" href="#registration" onClick={() => this.setState({...this.state, mobile_menu: false })}>Регистрация</a>
                    </li>
                    :
                    <React.Fragment />
                  }
                  
                </ul>
              </nav>
              <div className={(this.state.mobile_menu ? "hamburger active" : "hamburger")} onClick={() => {this.setState({...this.state, mobile_menu: !this.state.mobile_menu})}}>
                <span className="bar" />
                <span className="bar" />
                <span className="bar" />
              </div>
            </div>
          </div>
        </header>
        <section className="conference">
          <div className="container">
            <div className={this.props.auth.status_auth === null? "conference__inner" : "conference__inner_2"}>
              <div className="conference__info">
                <div className="conference__items">
                  <div className="conference__item">
                    онлайн c 5-30 августа
                  </div>
                  <div className="conference__item">
                    85 субъектов-участников
                  </div>
                </div>
                <div className="conference__maintext">
                  Приглашаем педагогических работников дошкольных образовательных и общеобразовательных организаций принять участие в интерактивном семинаре в формате видеоконференции
                </div>
                <div className="conference__text">
                  Мероприятие для педагогических работников дошкольных и общеобразовательных организаций
                </div>
                {
                    this.props.auth.status_auth === null ?
                    <a className="link-registration link conference__link" href="#registration">Регистрация</a>
                :
                  <React.Fragment />
                }
              </div>
              <div className="conference__img">
                <img src={conference_img} alt="" />
              </div>
            </div>
          </div>
        </section>
        {this.props.auth.status_auth === null || this.state.popup ? 
          <section className="registration" id="registration">
          {this.state.popup ? <div className="registration__overlay--on" /> : <div className="registration__overlay" />}
          <div className="container">
            <div className="registration__inner">
              <form id="registration__form" className="registration__form" onSubmit={() => { this.recaptchaRef.current.execute() }} >
                <div className="registration__form-title title">
                  Регистрация
                </div>
                <div className="registration__item">
                  <div className="registration__item-input">
                    <label id="name-label" htmlFor="name">Имя</label>
                    <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    className="form-control"
                    placeholder="Иван" 
                    pattern="^[а-яА-ЯёЁë]{1,}[\s-]{0,1}[а-яА-ЯёЁë]{1,}$"
                    onChange={(e) => this.setState({ first_name: e.target.value })}
                    value={this.state.first_name}
                    required={this.state.submit}
                    />
                  </div>
                  <div className="registration__item-text">
                    Поле обязательно для заполнения.
                    Используйте буквы русского алфавита.
                  </div>
                </div>
                <div className="registration__item">
                  <div className="registration__item-input">
                    <label id="surname-label" htmlFor="surname">Фамилия</label>
                    <input 
                    type="text" 
                    name="surname" 
                    id="surname" 
                    className="form-control" 
                    placeholder="Иванов" 
                    pattern="^[а-яА-ЯёЁë]{1,}[\s-]{0,1}[а-яА-ЯёЁë]{1,}$" 
                    onChange={(e) => this.setState({ last_name: e.target.value })}
                    value={this.state.last_name}
                    required={this.state.submit}
                    />
                  </div>
                  <div className="registration__item-text">
                    Поле обязательно для заполнения.
                    Используйте буквы русского алфавита.
                  </div>
                </div>
                <div className="registration__item">
                  <div className="registration__item-input">
                    <label id="patronymic-label" htmlFor="patronymic">Отчество</label>
                    <input 
                    type="text" 
                    name="patronymic" 
                    id="patronymic" 
                    className="form-control" 
                    placeholder="Иванович" 
                    pattern="^[а-яА-ЯёЁë]{1,}[\s-]{0,1}[а-яА-ЯёЁë]{1,}$"
                    onChange={(e) => this.setState({ nickname: e.target.value })}
                    value={this.state.nickname}
                    />
                  </div>
                  <div className="registration__item-text">
                    Используйте буквы русского алфавита.
                  </div>
                </div>
                <div className="registration__item">
                  <div className="registration__item-input selectation">
                    <label id="region-label" htmlFor="region">Субъект РФ</label>
                    <select name="region" id="region" className="form-control" 
                    onChange={(event) => {
                      this.setState({region: event.target.value});
                    }} 
                    defaultValue={'0'}
                    required={this.state.submit}>
                      <option disabled value="0">Выберите субъект</option>
                      <option value="1">Алтайский край</option>
                      <option value="2">Амурская область</option>
                      <option value="3">Архангельская область</option>
                      <option value="4">Астраханская область</option>
                      <option value="5">Белгородская область</option>
                      <option value="6">Брянская область</option>
                      <option value="7">Владимирская область</option>
                      <option value="8">Волгоградская область</option>
                      <option value="9">Вологодская область</option>
                      <option value="10">Воронежская область</option>
                      <option value="11">Еврейская автономная область</option>
                      <option value="12">Забайкальский край</option>
                      <option value="13">Ивановская область</option>
                      <option value="14">Иркутская область</option>
                      <option value="15">Кабардино-Балкарская Республика</option>
                      <option value="16">Калининградская область</option>
                      <option value="17">Калужская область</option>
                      <option value="18">Камчатский край</option>
                      <option value="19">Карачаево-Черкесская Республика</option>
                      <option value="20">Кемеровская область</option>
                      <option value="21">Кировская область</option>
                      <option value="22">Костромская область</option>
                      <option value="23">Краснодарский край</option>
                      <option value="24">Красноярский край</option>
                      <option value="25">Крым</option>
                      <option value="26">Курганская область</option>
                      <option value="27">Курская область</option>
                      <option value="28">Ленинградская область</option>
                      <option value="29">Липецкая область</option>
                      <option value="30">Магаданская область</option>
                      <option value="31">Москва</option>
                      <option value="32">Московская область</option>
                      <option value="33">Мурманская область</option>
                      <option value="34">Ненецкий автономный округ</option>
                      <option value="35">Нижегородская область</option>
                      <option value="36">Новгородская область</option>
                      <option value="37">Новосибирская область</option>
                      <option value="38">Омская область</option>
                      <option value="39">Оренбургская область</option>
                      <option value="40">Орловская область</option>
                      <option value="41">Пензенская область</option>
                      <option value="42">Пермский край</option>
                      <option value="43">Приморский край</option>
                      <option value="44">Псковская область</option>
                      <option value="45">Республика Адыгея</option>
                      <option value="46">Республика Алтай</option>
                      <option value="47">Республика Башкортостан</option>
                      <option value="48">Республика Бурятия</option>
                      <option value="49">Республика Дагестан</option>
                      <option value="50">Республика Ингушетия</option>
                      <option value="51">Республика Калмыкия</option>
                      <option value="52">Республика Карелия</option>
                      <option value="53">Республика Коми</option>
                      <option value="54">Республика Марий Эл</option>
                      <option value="55">Республика Мордовия</option>
                      <option value="56">Республика Саха (Якутия)</option>
                      <option value="57">Республика Северная Осетия — Алания</option>
                      <option value="58">Республика Татарстан</option>
                      <option value="59">Республика Тыва</option>
                      <option value="60">Республика Хакасия</option>
                      <option value="61">Ростовская область</option>
                      <option value="62">Рязанская область</option>
                      <option value="63">Самарская область</option>
                      <option value="64">Санкт-Петербург</option>
                      <option value="65">Саратовская область</option>
                      <option value="66">Сахалинская область</option>
                      <option value="67">Свердловская область</option>
                      <option value="68">Севастополь</option>
                      <option value="69">Смоленская область</option>
                      <option value="70">Ставропольский край</option>
                      <option value="71">Тамбовская область</option>
                      <option value="72">Тверская область</option>
                      <option value="73">Томская область</option>
                      <option value="74">Тульская область</option>
                      <option value="75">Тюменская область</option>
                      <option value="76">Удмуртская Республика</option>
                      <option value="77">Ульяновская область</option>
                      <option value="78">Хабаровский край</option>
                      <option value="79">Ханты-Мансийский автономный округ — Югра</option>
                      <option value="80">Челябинская область</option>
                      <option value="81">Чеченская Республика</option>
                      <option value="82">Чувашская Республика</option>
                      <option value="83">Чукотский автономный округ</option>
                      <option value="84">Ямало-Ненецкий автономный округ</option>
                      <option value="85">Ярославская область</option>
                    </select>
                  </div>
                  <div className="registration__item-text">
                    Поле обязательно для заполнения.
                    Выберите ваш субъект из списка.
                  </div>
                </div>
                <div className="registration__item">
                  <div className="registration__item-input">
                    <label id="organization-label" htmlFor="surname">Наименование образовательной организации</label>
                    <input 
                    type="text" 
                    name="organization" 
                    id="organization" 
                    className="form-control" 
                    placeholder="МБДОУ Детский сад № 55" 
                    required={this.state.submit}
                    onChange={(e) => this.setState({ name_organization: e.target.value })}
                    value={this.state.name_organization}
                    />
                  </div>
                  <div className="registration__item-text">
                    Поле обязательно для заполнения.
                    Напишите официальное наименование образовательной организации.
                  </div>
                </div>
                <div className="registration__item">
                  <div className="registration__item-input">
                    <label id="email-label" htmlFor="surname">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="form-control" 
                    pattern="^[a-zA-Z0-9]{1,}[-.]{0,}[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1}[-]{0,}[a-zA-Z0-9]{1,}\.[A-Za-z]{1,}$"
                    placeholder="name@example.ru"
                    required={this.state.submit}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    value={this.state.email}
                    />
                  </div>
                  <div className="registration__item-text">
                    Поле обязательно для заполнения.<br />
                    Не рекомендуется указывать чужой или корпоративный адрес электронной почты.
                  </div>
                </div>
                <div className="registration__item registration__item-politics">
                  <div className="registration__item-input" />
                  <input 
                  type="checkbox" 
                  id="politics" 
                  defaultValue 
                  autoComplete="off" 
                  onChange={(e) => this.setState({ rules_bool: !this.state.rules_bool })}
                  checked={this.state.rules_bool}
                  />
                  <div className="registration__item-text">
                    Даю согласие на обработку 
                    персональных данных
                  </div>
                </div>
                <ReCAPTCHA 
                ref={this.recaptchaRef}
                size="invisible"
                sitekey={"6LewNNUgAAAAACrrcs9vret08FiJnbvTJOHSsX-u"}
                onChange={(value)=>{console.log(value)}}
                />
                <div className="registration__item">
                  {this.state.rules_bool ? <button className="submit button" onClick={this.onSubmitWithReCAPTCHA}>Зарегистрироваться</button> : <button className="submit button" disabled>Зарегистрироваться</button>}
                </div>
                <div className="registration__item-warning">
                  Нажимая на кнопку «Зарегистрироваться», вы принимаете условия <a href={policy} className="confidential__link">Политики конфиденциальности</a><p />
                </div>
                <div id="popup" className={(this.state.popup) ? "popup popup__shown" : "popup"}>
                  <p className="popup__text">Спасибо, вы зарегистрированы!</p>
                  <button type="button" className="button popup__button" onClick={() => window.location.reload(false)}>Вернуться на сайт</button>
                </div>
              </form>
            </div>
          </div>
          <div className="beforetranslation__text" style={{display:"none"}}>
              <div id="chatsframe" className="chatsframe"></div>
          </div>
          </section>
        :
          <section className="beforetranslation" id="stream">
            <div className="container">
                <div>
                    <div className="beforetranslation__title title">
                        Трансляция
                    </div>
                    <div className="beforetranslation__items">
                      {this.state.translation_frame !== null ?
                      <div className="beforetranslation__iframe">
                        <div dangerouslySetInnerHTML={{ __html: this.state.translation_frame}} />
                      </div>
                      :
                      <div className="beforetranslation__img">
                        <img src={video_available} alt="" />
                      </div>
                      } 

                      {this.state.translation_frame !== null && this.state.chat ?
                        <div className="beforetranslation__text">
                          <div id="chatsframe" className="chatsframe"></div>
                        </div>
                      : (this.state.translation_frame !== null && this.state.chat === false) ?
                        <React.Fragment>
                          <div className="beforetranslation__text">
                              <p>Чат неактивен</p>
                          </div>
                        </React.Fragment>
                      : 
                        <React.Fragment>
                          <div className="beforetranslation__chat">
                          <img src={beforetranslationchat} alt="" />
                          </div>
                          <div className="beforetranslation__chat--text">
                              <p>Чат неактивен</p>
                          </div>
                        </React.Fragment>
                      }
                    </div>
                </div>
            </div>
          </section> 
        }
      <section className="schedule" id="schedule">
          <div className="container">
              <div className="schedule__inner">
                  <div className="schedule__title title">
                      Расписание трансляций
                  </div>
                  <div className="schedule__items">
                      <div className="schedule__item">
                          <div className="schedule__date">
                              5 августа 2022
                          </div>
                          <div className="schedule__day">
                              пятница
                          </div>
                          <div className="schedule__time">
                              14:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              8 августа 2022
                          </div>
                          <div className="schedule__day">
                              понедельник
                          </div>
                          <div className="schedule__time">
                              11:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              10 августа 2022
                          </div>
                          <div className="schedule__day">
                              среда
                          </div>
                          <div className="schedule__time">
                              8:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              12 августа 2022
                          </div>
                          <div className="schedule__day">
                              пятница
                          </div>
                          <div className="schedule__time">
                              10:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              16 августа 2022
                          </div>
                          <div className="schedule__day">
                              вторник
                          </div>
                          <div className="schedule__time">
                              10:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              18 августа 2022
                          </div>
                          <div className="schedule__day">
                              четверг
                          </div>
                          <div className="schedule__time">
                              11:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              22 августа 2022
                          </div>
                          <div className="schedule__day">
                              понедельник
                          </div>
                          <div className="schedule__time">
                              14:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              24 августа 2022
                          </div>
                          <div className="schedule__day">
                              среда
                          </div>
                          <div className="schedule__time">
                              12:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              26 августа 2022
                          </div>
                          <div className="schedule__day">
                              пятница
                          </div>
                          <div className="schedule__time">
                              08:00
                          </div>
                      </div>
                      <div className="schedule__item">
                          <div className="schedule__date">
                              30 августа 2022
                          </div>
                          <div className="schedule__day">
                              вторник
                          </div>
                          <div className="schedule__time">
                              12:00
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <section class="streamed">
        <div class="container">
          <div class="streamed__inner">
                  <div class="streamed__title title">
                      Эти трансляции уже прошли, но вы можете посмотреть их в записи 
                  </div>
                  <div className="streamed__items">
                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 5 августа 2022
                          </div>
                          <div className="streamed__numbers">
                            3868 просмотров
                          </div>
                        </div>
                    </div>
                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame2}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 8 августа 2022
                          </div>
                          <div className="streamed__numbers">
                            5628 просмотров
                          </div>
                        </div>
                        
                    </div>
                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame3}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 10 августа 2022
                          </div>
                          <div className="streamed__numbers">
                            5271 просмотров
                          </div>
                        </div>
                    </div>
                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame4}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 12 августа 2022
                          </div>
                          <div className="streamed__numbers">
                            5926 просмотров
                          </div>
                        </div>
                    </div>
                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame5}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 16 августа 2022
                          </div>
                          <div className="streamed__numbers">
                            6290 просмотров
                          </div>
                        </div>
                    </div>
                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame6}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 18 августа 2022
                          </div>
                          <div className="streamed__numbers">
                            5253 просмотров
                          </div>
                        </div>
                    </div>

                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame7}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 22 августа 2022
                          </div>
                          <div className="streamed__numbers">
                            5201 просмотров
                          </div>
                        </div>
                    </div>

                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame8}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 24 августа 2022
                          </div>
                          <div className="streamed__numbers">
                              5178 просмотров
                          </div>
                        </div>
                    </div>

                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame9}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 26 августа 2022
                          </div>
                          <div className="streamed__numbers">
                              2820 просмотров
                          </div>
                        </div>
                    </div>

                    <div class="streamed__item">
                        <div class="streamed__iframe">
                          <div className="streamed__iframe">
                          {this.state.translation_frame !== null ?
                        <div className="beforetranslation__iframe">
                          { <div dangerouslySetInnerHTML={{ __html: this.state.streamed_frame10}} /> }
                        </div>
                        :
                        <div className="beforetranslation__img">
                          <img src={video_available} alt="" />
                        </div>
                        } 
                          </div>
                        </div>
                        <div className="streamed__info">
                          <div className="streamed__text">
                              Трансляция от 30 августа 2022
                          </div>
                          <div className="streamed__numbers">
                              4765 просмотров
                          </div>
                        </div>
                    </div>


                  </div>
              </div>
          </div>
        </section>
        <section className="questions" id="questions">
          <div className="container">
            <div className="questions__inner">
              <div className="questions__title title">
                Есть вопросы? Мы поможем
              </div>
              <div className="questions__item" onClick={()=>{this.setState({...this.state, question_1: !this.state.question_1})}}>
                <div className="questions__faq">Для чего необходимо регистрироваться?</div>
                {this.state.question_1 ? 
                <p className="questions__text questions__visible">После регистрации вам придёт ссылка на страницу с трансляциями. Сертификаты о прохождении семинара и презентация будут отправлены только после просмотра трансляции.</p>
                :
                <p className="questions__text" />
                }
              </div>
              <div className="questions__item" onClick={()=>{this.setState({...this.state, question_2: !this.state.question_2})}}>
                <div className="questions__faq">Как проводятся мероприятия?</div>
                {this.state.question_2 ? 
                <p className="questions__text questions__visible">Мероприятия проводятся в формате видеоконференции (онлайн).</p>
                :
                <p className="questions__text" />
                }
              </div>
              <div className="questions__item" onClick={()=>{this.setState({...this.state, question_3: !this.state.question_3})}}>
                <div className="questions__faq">Когда проходят трансляции видеоконференций (семинаров)?</div>
                {this.state.question_3 ? 
                <p className="questions__text questions__visible">Трансляции проводятся по расписанию, вы можете выбрать любое из предложенного в расписании времени для просмотра семинара.</p>
                :
                <p className="questions__text" />
                }
                <p className="questions__text"></p>
              </div>
              <div className="questions__item" onClick={()=>{this.setState({...this.state, question_4: !this.state.question_4})}}>
                <div className="questions__faq">Для кого это мероприятие?</div>
                {this.state.question_4 ? 
                <p className="questions__text questions__visible">Данное мероприятие предусмотрено для педагогических работников дошкольных образовательных организаций и общеобразовательных организаций.</p>
                :
                <p className="questions__text" />
                }
              </div>
              <div className="questions__item" onClick={()=>{this.setState({...this.state, question_5: !this.state.question_5})}}>
                <div className="questions__faq">Для каких регионов проводится мероприятие?</div>
                {this.state.question_5 ? 
                <p className="questions__text questions__visible">Зарегистрироваться на мероприятие и посмотреть трансляцию могут педагогические работники любого из 85 субъектов-участников РФ.</p>
                :
                <p className="questions__text" />
                }
              </div>
              <div className="questions__item" onClick={()=>{this.setState({...this.state, question_6: !this.state.question_6})}}>
                <div className="questions__faq">Как посмотреть трансляцию?</div>
                {this.state.question_6 ? 
                <p className="questions__text questions__visible">После регистрации вам на почту придёт ссылка на расписание и страницу, на которой будут проводиться трансляции в соответствии с указанным расписанием. Для просмотра необходимо открыть ссылку в удобный для вас день и время.</p>
                :
                <p className="questions__text" />
                }
              </div>
            </div>
          </div>
        </section>
        <section className="support">
          <div className="container">
            <div className="support__inner">
              <div className="support__items">
                <div className="support__item">
                  <img src={support_logo1} alt="" />
                </div>
                <div className="support__item">
                  <img src={support_logo2} alt="" />
                </div>
                <div className="support__item">
                  <img src={support_logo3} alt="" />
                </div>
                <div className="support__item">
                  <img src={support_logo4} alt="" />
                </div>
                <div className="support__item">
                  <img src={support_logo5} alt="" />
                </div>  
              </div>
            </div>
          </div>  
        </section>
        <footer className="footer">
          <div className="container">
            <div className="footer__inner">
              <a href={policy} className="footer__link confidential__link">Политика конфиденциальности<p /></a>
            </div>
          </div>
          </footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: (token, first_name, last_name, nickname, region, organization, email, rules_bool) => dispatch(authLogin(token, first_name, last_name, nickname, region, organization, email, rules_bool)),
    getStatus: () => dispatch(getStatus())
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));