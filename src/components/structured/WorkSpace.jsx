import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../shared/Editor";
import { addCurrProject } from "../../reduxToolkit/slices/project/projectSlice";
import useEditorState from "../../hooks/useEditorState";
import { EditorLanguages } from "../../helpers/editorHelper";
import ModalEditor from "./ModalEditor";
import { toast } from "react-toastify";

const WorkSpace = ({ projectId, htmlText, cssText, jsText }) => {
	const [html, setHtml] = useState("");
	const [css, setCss] = useState("");
	const [js, setJs] = useState("");
	const [srcDoc, setsrcDoc] = useState("");

	const {
		isHTMLExpanded,
		isCssExpanded,
		isJsExpanded,
		openModal,
		closeModal,
	} = useEditorState();
	const projectData = useSelector(
		(state) => state.projectReducer.currProject,
	);

	const ref = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		const handleIframeError = (event) => {
			if (event.data.type === "JS_ERROR") {
				console.error("JavaScript Error in iframe:", event.data.error);
				toast.error(`JavaScript Error: ${event.data.message}`);
			}
		};

		window.addEventListener("message", handleIframeError);

		return () => {
			window.removeEventListener("message", handleIframeError);
		};
	}, []);

	useEffect(() => {
		htmlText && setHtml(htmlText);
		cssText && setCss(cssText);
		jsText && setJs(jsText);
	}, [htmlText, cssText, jsText]);

	useEffect(() => {
		const createBlobUrl = (jsCode) => {
			const blob = new Blob([jsCode], { type: "application/javascript" });
			return URL.createObjectURL(blob);
		};

		let compile;
		compile = setTimeout(() => {
			const jsBlobUrl = createBlobUrl(
				`try {${js}} catch (error) {window.parent.postMessage({ type: 'JS_ERROR', message: error.message, error }, '*')}`,
			);
			setsrcDoc(`
		<html>
			<body>
			${html}
			<style>${css}</style>
			<script src="${jsBlobUrl}"></script>
			</body>
			</html>
			`);
		}, 350);
		dispatch(addCurrProject({ ...projectData, projectId, html, css, js }));

		return () => clearTimeout(compile);
	}, [html, css, js, dispatch, projectId]);

	return (
		<div className="outer">
			<div className="code">
				<Editor
					language={EditorLanguages.HTML}
					onchange={setHtml}
					value={html}
					openModal={openModal}
					closeModal={closeModal}
					isExpanded={isHTMLExpanded}
				/>
				<Editor
					language={EditorLanguages.CSS}
					onchange={setCss}
					value={css}
					openModal={openModal}
					closeModal={closeModal}
					isExpanded={isCssExpanded}
				/>
				<Editor
					language={EditorLanguages.JAVASCRIPT}
					onchange={setJs}
					value={js}
					openModal={openModal}
					closeModal={closeModal}
					isExpanded={isJsExpanded}
				/>
				{isHTMLExpanded && (
					<ModalEditor
						value={html}
						language={EditorLanguages.HTML}
						onchange={setHtml}
						openModal={openModal}
						closeModal={closeModal}
						isExpanded={isHTMLExpanded}
					/>
				)}
				{isCssExpanded && (
					<ModalEditor
						value={css}
						language={EditorLanguages.CSS}
						onchange={setCss}
						openModal={openModal}
						closeModal={closeModal}
						isExpanded={isCssExpanded}
					/>
				)}
				{isJsExpanded && (
					<ModalEditor
						value={js}
						language={EditorLanguages.JAVASCRIPT}
						onchange={setJs}
						openModal={openModal}
						closeModal={closeModal}
						isExpanded={isJsExpanded}
					/>
				)}
			</div>
			<div className="output">
				<iframe
					title="browserScreen"
					sandbox="allow-scripts allow-same-origin"
					srcDoc={srcDoc}
					ref={ref}
					height="97%"
					width="100%"
					loading="lazy"
					className="bg-slate-200"
				></iframe>
			</div>
		</div>
	);
};

export default WorkSpace;
