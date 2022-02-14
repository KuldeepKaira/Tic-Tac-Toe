import React from "react";
import "./box.css";
import { ImCross } from "react-icons/im";
import { RiRecordCircleFill } from "react-icons/ri";

const Box = (props) => {
  // const [outputsign, setOutputSign] = useState("");
  // const boxClickHandler = () => {
  //   console.log(props.num);
  //   setOutputSign(props.sign);
  //   props.onSign();
  // };
  return (
    <div className="boxTemplate" onClick={() => props.onSign(props.num)}>
      {props.cells[props.num] === "cross" && (
        <ImCross className="cross boxCross" />
      )}
      {props.cells[props.num] === "circle" && (
        <RiRecordCircleFill className="circle boxCircle" />
      )}
    </div>
  );
};

export default Box;
