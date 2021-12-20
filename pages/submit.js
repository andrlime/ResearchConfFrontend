import Head from 'next/head';
import styles from '../styles/Q.module.css';
import React from 'react';
import {isMobile} from 'react-device-detect';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({menu: false, phone: isMobile,
      formColors: {type: 0, name: 0, title: 0, abstract: 0, discipline: 0, email: 0, verify: 0, code: 0},
      formData: {type: "", name: "", title: "", abstract: "", discipline: "", email: "", verify: "", code: ""},
      message: "",
      wordcount: 0,
      boxType: "Abstract"
    });
    //Title, Presenter, School Abstract (250 words), Discipline (Science,
    //Social Studies, Math, Language Arts, Fine Arts, Digital Arts, Physical Education),
    //Email, code 
    this.menuHandler = this.menuHandler.bind(this);

    this.nameHandler = this.nameHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.abstractHandler = this.abstractHandler.bind(this);
    this.disciplineHandler = this.disciplineHandler.bind(this);
    this.emailHandler = this.emailHandler.bind(this);
    this.verifyHandler = this.verifyHandler.bind(this);
    this.codeHandler = this.codeHandler.bind(this);
    this.email = this.email.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.typeHandler = this.typeHandler.bind(this);
  }

  typeHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "" || e.target.value == "n") {
      colors.type = 2;
    } else {
      colors.type = 1;
    }
    data.type = e.target.value;

    let box = data.type == "workshop" ? "Description" : "Abstract"

    this.setState({formColors: colors, formData: data, boxType: box});
  }

  submitHandler(e) {
    if(this.state.formColors.name == 1 && this.state.formColors.contact == 1 && this.state.formColors.position == 1 && this.state.formColors.email == 1 && this.state.formColors.verify == 1) {
      //all green
      //PUSH to database. write code.
    } else {
      let str = "The form has errors. Please correct them and submit again.";
      this.setState({message: str})
    }
  }

  nameHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.name = 2;
    } else {
      colors.name = 1;
    }
    data.name = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  titleHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.title = 2;
    } else {
      colors.title = 1;
    }
    data.title = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  abstractHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.abstract = 2;
    } else {
      colors.abstract = 1;

      if(e.target.value.split(' ').length > 250) {
        colors.abstract = 2;
      }
    }

    data.abstract = e.target.value;

    this.setState({formColors: colors, formData: data, wordcount: e.target.value.split(' ').length});
  }

  disciplineHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "" || e.target.value == "n") {
      colors.discipline = 2;
    } else {
      colors.discipline = 1;
    }
    data.discipline = e.target.value;
    this.setState({formColors: colors, formData: data});
  }

  emailHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    data.email = e.target.value;

    let rx = /(\w+[@]\w+([.]\w+)+)/g; //tests if it's an email
    if(e.target.value.match(rx) == e.target.value) {
      colors.email = 1;
    } else {
      colors.email = 2;
    }

    this.setState({formColors: colors, formData: data});

    this.email(e);
  }

  verifyHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    data.verify = e.target.value;

    let rx = /(\w+[@]\w+([.]\w+)+)/g; //tests if it's an email
    if(e.target.value == this.state.formData.email && e.target.value != "" && this.state.formData.email.match(rx) == e.target.value) {
      colors.verify = 1;
    } else {
      colors.verify = 2;
    }

    this.setState({formColors: colors, formData: data});

    this.email(e);
  }

  email(e) {
    let colors = this.state.formColors;
    if(this.state.formData.email != this.state.formData.verify) {
      colors.verify = 2;
    }
    this.setState({formColors: colors});
  }

  codeHandler(e) {
    let colors = this.state.formColors;
    let data = this.state.formData;
    if(e.target.value == "") {
      colors.code = 2;
    } else {
      colors.code = 1;
    }

    data.code = e.target.value;

    if(data.code.length != 4) {
      colors.code = 2;
    }

    this.setState({formColors: colors, formData: data});
  }

  menuHandler(e) {
    let cState = !this.state.menu;
    this.setState({menu: cState});
  }

  render() {
    let nav = [
      {name: "School Registration", link: "/register", active: 0},
      {name: "Project Submissions", link: "/submit", active: 1},
      {name: "About Us", link: "/about", active: 0},
      {name: "Contact Us", link: "/contact", active: 0}
    ];

    let dates = [
      {date: new Date('2022-04-01T00:00:00'), desc: "Abstracts Due", longdesc: ""},
      {date: new Date('2022-05-01T00:00:00'), desc: "Research Conference", longdesc: ""}
    ];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    //todo: make the timeline more interactive

    let menuWidth = this.state.phone && this.state.menu ? "100vw" : (this.state.menu ? "25vw" : "");
    let words = ["Research", "Innovation", "Discovery"];

    let colors = ["#82318E", "#119911", "#FF2211"];

    return (
      <div className={styles.earth}>
      <div className={styles.sidebar}>

        <div style={{width: menuWidth}} onClick={this.menuHandler} className={this.state.menu ? styles.menuactive : styles.menu}>

          <span></span>
          <span></span>
          <span></span>

        </div>

        <div className={styles.navlist} style={{display: this.state.menu ? "inline-block" : "none"}}>

          {nav.map((item, i) => (
            <div className={item.active==0 ? styles.underline : styles.overline}><a href={item.link}>{item.name}</a></div>
          ))}

        </div>

      </div>
      
      <div className={styles.main}>
        <div className={styles.nav}>
          <a href="/"><img id={styles.logo} src="/this-logo.png"/></a>
        </div>

        <div className={styles.mainContent}>

          <div className={styles.form}>
              <p id={styles.formhead}>Project Submission</p>
              <p style={{color: "#FF2211"}}>{this.state.message}</p>

              <span>Type of Submission: <span id={styles.star}>*</span> <br/><select onChange={this.typeHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.type]}`}} required value={this.state.formData.type}>
                
                <option value="n">Please Select</option>
                <option value="poster">Poster Submission</option>
                <option value="panel">Panel Submission</option>
                <option value="workshop">Workshop Application</option>

              </select><br/></span>
              <span>Your Name: <span id={styles.star}>*</span> <br/><input onChange={this.nameHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.name]}`}} required value={this.state.formData.name}></input><br/></span>
              <span>Your Project Title: <span id={styles.star}>*</span> <br/><input onChange={this.titleHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.title]}`}} required value={this.state.formData.title}></input><br/></span>
              <span>{this.state.boxType}: <span id={styles.star}>*</span> <br/><textarea onChange={this.abstractHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.abstract]}`}} required value={this.state.formData.abstract}></textarea>
              <span id={styles.wcword} style={{color: this.state.wordcount>250 ? colors[2] : colors[0]}}>{this.state.wordcount}/250</span>
              
              <br/></span>
              <span>Discipline: <span id={styles.star}>*</span> <br/><select onChange={this.disciplineHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.discipline]}`}} required value={this.state.formData.discipline}>
                
                <option value="n">Please Select</option>
                <option value="sci">Science</option>
                <option value="soc">Social Studies</option>
                <option value="math">Math</option>
                <option value="ela">Language Arts</option>
                <option value="art">Fine Arts</option>
                <option value="digart">Digital Arts</option>
                <option value="pe">Physical Education</option>
                
              </select><br/></span>
              <span>Email: <span id={styles.star}>*</span> <br/><input onChange={this.emailHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.email]}`}} required value={this.state.formData.email}></input><br/></span>
              <span>Verify Email: <span id={styles.star}>*</span> <br/><input onChange={this.verifyHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.verify]}`}} required value={this.state.formData.verify}></input><br/></span>
              <span>School Code (case sensitive!): <span id={styles.star}>*</span> <br/><input onChange={this.codeHandler} style={{width: "250px", border: `0.5px solid ${colors[this.state.formColors.code]}`}} required value={this.state.formData.code}></input><br/></span>

              <p style={{width: "50%"}}>Please submit your information here. You will receive an e-mail confirming submission. If we need additional information, we will contact you.</p>

              <button onClick={this.submitHandler}>Submit</button>
            </div>

        </div>

        <div className={styles.footer}>

          <div className={styles.imgbox}><img src="logo-spartan.svg"/><img src="this-logo.png"/>
          </div>

          <div className={styles.text}><span>Privacy Policy</span>
          <span>Terms and Conditions</span>
          <span>Powered by React</span>
          <span>Designed by <span>Andrew Li</span></span></div>

          

        </div>
      </div></div>
    );
  }
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Tsinghua International School Research Conference 2022</title>
      </Head>
      <App/>
    </>
  );
}