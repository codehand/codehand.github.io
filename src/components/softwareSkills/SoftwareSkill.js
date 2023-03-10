import React from "react";
import "./SoftwareSkill.scss";
// import {skillsSection} from "../../portfolio";

export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          <li
                key={0}
                className="software-skill-inline"
                name="golang"
              >
              <img
                alt="gopher" width={48} height={48}
                src={require("../../assets/images/gopher.svg").default}
              ></img>
              <p>golang</p>
          </li>
          <li
                key={1}
                className="software-skill-inline"
                name="grpc"
              >
              <img
                alt="grpc" width={48} height={48}
                src={require("../../assets/images/grpc.svg").default}
              ></img>
              <p>grpc</p>
          </li>
          <li
                key={2}
                className="software-skill-inline"
                name="kubernetes"
              >
              <img
                alt="kubernetes" width={48} height={48}
                src={require("../../assets/images/k8s.png")}
              ></img>
              <p>kubernetes</p>
          </li>
          <li
                key={3}
                className="software-skill-inline"
                name="mongo"
              >
              <img
                alt="mongo" width={48} height={48}
                src={require("../../assets/images/mongo.svg").default}
              ></img>
              <p>mongo</p>
          </li>
          <li
                key={4}
                className="software-skill-inline"
                name="postgresql"
              >
              <img
                alt="postgresql" width={48} height={48}
                src={require("../../assets/images/postgres.svg").default}
              ></img>
              <p>postgresql</p>
          </li>
          <li
                key={5}
                className="software-skill-inline"
                name="gcp"
              >
              <img
                alt="gcp" width={48} height={48}
                src={require("../../assets/images/gcp.png")}
              ></img>
              <p>google cloud</p>
          </li>
          <li
                key={6}
                className="software-skill-inline"
                name="aws"
              >
              <img
                alt="aws" width={48} height={48}
                src={require("../../assets/images/aws.png")}
              ></img>
              <p>aws</p>
          </li>
        </ul>    
      </div>
    </div>
  );
}
