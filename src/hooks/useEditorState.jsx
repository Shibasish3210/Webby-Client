import { useState } from "react";
import { EditorLanguages } from "../helpers/editorHelper";

const useEditorState = () => {
	const [isHTMLExpanded, setHTMLExpanded] = useState(false);
	const [isCssExpanded, setCssExpanded] = useState(false);
	const [isJsExpanded, setJsExpanded] = useState(false);

	const openModal = (type) => {
		if (type === EditorLanguages.HTML) {
			setHTMLExpanded(true);
		} else if (type === EditorLanguages.CSS) {
			setCssExpanded(true);
		} else if (type === EditorLanguages.JAVASCRIPT) {
			setJsExpanded(true);
		}
	};

	const closeModal = (type) => {
		if (type === EditorLanguages.HTML) {
			setHTMLExpanded(false);
		} else if (type === EditorLanguages.CSS) {
			setCssExpanded(false);
		} else if (type === EditorLanguages.JAVASCRIPT) {
			setJsExpanded(false);
		}
	};

	return {
		isHTMLExpanded,
		isCssExpanded,
		isJsExpanded,
		openModal,
		closeModal,
	};
};

export default useEditorState;
