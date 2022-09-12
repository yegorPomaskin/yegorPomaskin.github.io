import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import './Register.css';
import '../../Normalize.css';
import policy from '../../files/policy.pdf';
import { authLogin, getStatus } from "./../../store/actions/auth";

class Register extends Component {
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

    popup: false,
    submit: false,
  };

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
  }

  render() {
    return (
      <div> 
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
                  <a href="/"><button type="button" className="button popup__button">Вернуться на сайт</button></a>
                </div>
              </form>
            </div>
          </div>
            <div className="beforetranslation__text" style={{display:"none"}}>
                <div id="chatsframe" className="chatsframe"></div>
            </div>
          </section>
        :
            <Redirect to="/" />
        }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));