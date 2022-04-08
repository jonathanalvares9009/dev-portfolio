import React, { Component } from "react";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      resumeData: {},
      sharedData: {},
    };
  }

  async componentDidMount() {
    this.loadSharedData();
    this.loadResumeFromPath();
  }

  loadResumeFromPath() {
    fetch("res_primaryLanguage.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ resumeData: data });
      });
  }

  async loadSharedData() {
    fetch("portfolio_shared_data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      });
  }

  render() {
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        <About
          sharedProfile={this.state.sharedData.basic_info}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;
