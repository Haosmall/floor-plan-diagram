import { useEffect, useLayoutEffect, useState } from "react";

function useWindowSize(reduceWidth, reduceHeight) {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([
				window.innerWidth - reduceWidth,
				window.innerHeight - reduceHeight,
			]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return size;
}
function useDisable(listShapesDelete, listShapesUpdate, listNewShapes) {
	const [isDisable, setDisable] = useState(false);
	useEffect(() => {
		if (
			listShapesDelete.length <= 0 &&
			listShapesUpdate <= 0 &&
			listNewShapes
		) {
			setDisable(true);
		} else {
			setDisable(false);
		}
	}, [listShapesDelete, listShapesUpdate, listNewShapes]);

	return isDisable;
}

export { useWindowSize, useDisable };
