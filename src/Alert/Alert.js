import React from "react";
import {useSnackbar} from "notistack";
import "./Alert.scss";

let BaseIcon = function BaseIcon(props) {
	let color = props.color,
		_ref$pushRight = props.pushRight,
		pushRight = _ref$pushRight === undefined ? true : _ref$pushRight,
		children = props.children;
	return React.createElement(
		"svg",
		{
			xmlns: "http://www.w3.org/2000/svg",
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: color,
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			style: {marginRight: pushRight ? "20px" : "0", minWidth: 24},
		},
		children,
	);
};

let InfoIcon = function InfoIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#2E9AFE"},
		React.createElement("circle", {cx: "12", cy: "12", r: "10"}),
		React.createElement("line", {x1: "12", y1: "16", x2: "12", y2: "12"}),
		React.createElement("line", {x1: "12", y1: "8", x2: "12", y2: "8"}),
	);
};

let SuccessIcon = function SuccessIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#31B404"},
		React.createElement("path", {d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"}),
		React.createElement("polyline", {points: "22 4 12 14.01 9 11.01"}),
	);
};

let ErrorIcon = function ErrorIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#FF0040"},
		React.createElement("circle", {cx: "12", cy: "12", r: "10"}),
		React.createElement("line", {x1: "12", y1: "8", x2: "12", y2: "12"}),
		React.createElement("line", {x1: "12", y1: "16", x2: "12", y2: "16"}),
	);
};

let CloseIcon = function CloseIcon() {
	return React.createElement(
		BaseIcon,
		{color: "#000000", pushRight: false},
		React.createElement("line", {x1: "18", y1: "6", x2: "6", y2: "18"}),
		React.createElement("line", {x1: "6", y1: "6", x2: "18", y2: "18"}),
	);
};

export default React.forwardRef((props, ref) => {
	const {closeSnackbar} = useSnackbar();

	const {type, message, id, ...rest} = props;

	return (
		<div className="alert__box" {...rest} ref={ref}>
			{type === "info" && <InfoIcon />}
			{type === "error" && <ErrorIcon />}
			{type === "success" && <SuccessIcon />}
			<span className="alert__span">{message || ""}</span>
			<button onClick={() => closeSnackbar(id)} className="alert__button">
				<CloseIcon />
			</button>
		</div>
	);
});
