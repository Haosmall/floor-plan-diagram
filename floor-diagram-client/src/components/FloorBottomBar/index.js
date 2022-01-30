import { Button } from "antd";
import { Footer } from "antd/lib/layout/layout";
import PropTypes from "prop-types";
import React from "react";
import "./style.scss";

const FloorBottomBar = (props) => {
	const { floors, onAdd } = props;

	return (
		<Footer
			style={{
				backgroundColor: "#f1f2f6",
				display: "flex",
				justifyContent: "flex-start",
				alignContent: "center",
			}}
		>
			<Button onClick={onAdd} draggable={true}>
				Add
			</Button>
			{floors.map((floor) => (
				<Button>{floor.name}</Button>
			))}
		</Footer>
	);
};

FloorBottomBar.propTypes = {
	floors: PropTypes.array,
};

FloorBottomBar.defaultProps = {
	floors: [],
};
export default FloorBottomBar;
