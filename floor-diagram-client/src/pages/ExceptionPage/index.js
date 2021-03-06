import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";
import "./style.scss";
import { useNavigate } from "react-router";

function ExceptionPage(props) {
	useEffect(() => {
		document.title = "404 error";
	}, []);

	const navigate = useNavigate();
	return (
		<div className="exception-page">
			<div className="main">
				<Result
					status="404"
					title="404"
					subTitle="Sorry, the page you visited does not exist."
					extra={
						<Button type="primary" onClick={() => navigate("/buildings")}>
							Back Home
						</Button>
					}
				/>
			</div>
		</div>
	);
}
ExceptionPage.propTypes = {};

export default ExceptionPage;
